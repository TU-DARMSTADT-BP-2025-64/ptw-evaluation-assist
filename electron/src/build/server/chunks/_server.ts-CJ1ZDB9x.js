import { j as json } from './index2-DyoisQP2.js';
import bcrypt from 'bcrypt';
import { D as DatabaseClient, S as ServerConstants } from './server-constants-CUXKlonj.js';
import 'better-sqlite3';
import './index-DK8hzxr2.js';
import 'node:path';
import 'node:os';
import 'node:process';
import 'fs';

async function POST({ request }) {
  try {
    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword) {
      return json({ message: "Alle Felder müssen ausgefüllt werden." }, { status: 400 });
    }
    const db = new DatabaseClient(ServerConstants.DATABASE_NAME).getDatabase();
    const statement = db.prepare("SELECT * FROM users WHERE username = ?");
    const adminUser = statement.get("admin");
    if (!adminUser) {
      return json({ message: "Admin-Benutzer nicht gefunden." }, { status: 404 });
    }
    const passwordMatches = await bcrypt.compare(currentPassword, adminUser.password);
    if (!passwordMatches) {
      return json({ message: "Das aktuelle Passwort ist falsch." }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateStatement = db.prepare("UPDATE users SET password = ? WHERE username = ?");
    const result = updateStatement.run(hashedPassword, "admin");
    if (result.changes === 1) {
      return json({ message: "Passwort erfolgreich geändert." });
    } else {
      return json({ message: "Fehler beim Aktualisieren des Passworts." }, { status: 500 });
    }
  } catch (error) {
    console.error("Fehler beim Ändern des Passworts:", error);
    return json({ message: "Interner Serverfehler." }, { status: 500 });
  }
}

export { POST };
//# sourceMappingURL=_server.ts-CJ1ZDB9x.js.map
