import { json } from '@sveltejs/kit';
import { Repository } from '$lib/server/repository';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import type { RequestEvent } from '@sveltejs/kit';

dotenv.config();

export async function POST({ request, cookies }: RequestEvent) {
	const { username, password } = await request.json();

	const userExists = await Repository.Instance.userExists(username, password);

	if (userExists) {
		const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' });

		cookies.set('session', token, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test',
			sameSite: 'strict',
			maxAge: 3600,
		});

		return json({ success: true });
	}

	return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
