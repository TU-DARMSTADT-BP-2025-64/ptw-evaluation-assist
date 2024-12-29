import type { Handle } from '@sveltejs/kit';
import { init } from '$lib/server/init';
import jwt, { type JwtPayload } from 'jsonwebtoken';

init();

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/configuration')) {
		const token = event.cookies.get('session');

		if (!token) {
			return Response.redirect(`${event.url.origin}/`, 303);
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload | string;

			if (typeof decoded === 'object' && decoded !== null) {
				event.locals.user = decoded;
			} else {
				// Ungültiges Token, zurückleiten
				return Response.redirect(`${event.url.origin}/`, 303);
			}
		} catch (err) {
			// Token konnte nicht validiert werden
			return Response.redirect(`${event.url.origin}/`, 303);
		}

	}

	return resolve(event);
};
