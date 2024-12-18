import { json } from '@sveltejs/kit';
import { Repository } from '$lib/server/repository';

export async function POST({ request, cookies }) {
	const { username, password } = await request.json();

	const userExists = await Repository.Instance.userExists(username, password);

	if (userExists) {
		cookies.set('session', 'valid', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 3600 // 1 Stunde
		});
		return json({ success: true });
	}

	return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
