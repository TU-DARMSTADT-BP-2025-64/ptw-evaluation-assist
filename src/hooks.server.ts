import type { Handle } from '@sveltejs/kit';
import { init } from '$lib/server/init';
import jwt, { type JwtPayload } from 'jsonwebtoken';

init();

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session');

	// Standardwerte für Benutzer und Login-Status
	event.locals.user = null;
	event.locals.isLoggedIn = false;

	if (token) {
		try {
			// Token validieren
			const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

			if (typeof decoded === 'object' && decoded !== null) {
				event.locals.user = decoded; // Benutzer-Daten speichern
				event.locals.isLoggedIn = true; // Benutzer ist eingeloggt
			}
		} catch {
			// Wenn das Token ungültig ist, bleibt der Benutzer ausgeloggt
			event.locals.isLoggedIn = false;
		}
	}

	// Zugriffsschutz für `/configuration`
	if (event.url.pathname.startsWith('/configuration') && !event.locals.isLoggedIn) {
		return Response.redirect(`${event.url.origin}/`, 303);
	}

	return resolve(event);
};
