import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	const token = cookies.get('session');

	if (!token) {
		return json({ success: false, message: 'No session found' }, { status: 401 });
	}

	// Entfernen des Cookies
	cookies.set('session', '', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 0, // Sofort löschen
	});

	return json({ success: true, message: 'Logged out successfully' });
}
