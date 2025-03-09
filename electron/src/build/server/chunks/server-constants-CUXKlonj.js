import Database from 'better-sqlite3';
import { e as envPaths } from './index-DK8hzxr2.js';
import fs from 'fs';

class DatabaseClient {
  constructor(databaseName) {
    this.databaseName = databaseName;
  }
  database;
  createDatabase() {
    this._createDatabaseDirectory();
    return this.getDatabase();
  }
  getDatabase() {
    if (!this.database || !this.database.open) {
      const dbPath = this._getDatabasePath();
      console.log("Opening database at", dbPath);
      this.database = new Database(dbPath, { verbose: console.log });
    }
    return this.database;
  }
  databaseExists() {
    return fs.existsSync(this._getDatabasePath());
  }
  _createDatabaseDirectory() {
    const paths = envPaths("ptw-evaluation-assist");
    fs.mkdirSync(paths.data, { recursive: true });
  }
  _getDatabasePath() {
    const paths = envPaths("ptw-evaluation-assist");
    return paths.data + "/" + this.databaseName;
  }
}
class ServerConstants {
  static DATABASE_NAME = "ptw-evaluation-assist.db";
  static USER_SALT = "ptw-evaluation-assist";
}

export { DatabaseClient as D, ServerConstants as S };
//# sourceMappingURL=server-constants-CUXKlonj.js.map
