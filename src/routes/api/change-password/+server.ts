import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { DatabaseClient } from '$lib/server/database-client';
import { ServerConstants } from '$lib/server/server-constants';

export async function POST({ request }: { request: Request }) {
	try {
		// Eingabewerte des Requests holen
		const { currentPassword, newPassword } = await request.json();

		// Eingabeprüfung
		if (!currentPassword || !newPassword) {
			return json({ message: 'Alle Felder müssen ausgefüllt werden.' }, { status: 400 });
		}

		// Datenbankverbindung erstellen
		const db = new DatabaseClient(ServerConstants.DATABASE_NAME).getDatabase();

		// Admin-Benutzer aus der Datenbank holen
		const statement = db.prepare('SELECT * FROM users WHERE username = ?');
		const adminUser = statement.get('admin') as { password: string };

		if (!adminUser) {
			return json({ message: 'Admin-Benutzer nicht gefunden.' }, { status: 404 });
		}

		// Aktuelles Passwort validieren
		const passwordMatches = await bcrypt.compare(currentPassword, adminUser.password);

		if (!passwordMatches) {
			return json({ message: 'Das aktuelle Passwort ist falsch.' }, { status: 400 });
		}

		// Neues Passwort hashen und speichern
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		const updateStatement = db.prepare('UPDATE users SET password = ? WHERE username = ?');
		const result = updateStatement.run(hashedPassword, 'admin');

		if (result.changes === 1) {
			return json({ message: 'Passwort erfolgreich geändert.' });
		} else {
			return json({ message: 'Fehler beim Aktualisieren des Passworts.' }, { status: 500 });
		}
	} catch (error) {
		console.error('Fehler beim Ändern des Passworts:', error);
		return json({ message: 'Interner Serverfehler.' }, { status: 500 });
	}
}
