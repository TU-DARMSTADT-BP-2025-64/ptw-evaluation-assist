import Database from 'better-sqlite3';
import envPaths from 'env-paths';
import fs from 'fs';

export class DatabaseClient {

    protected database: Database.Database | undefined;
	constructor(private databaseName: string) {

    }

    public createDatabase(): Database.Database {
        this._createDatabaseDirectory();
        return this.getDatabase();
    }

    public getDatabase(): Database.Database {
		if (!this.database || !this.database.open) {
			const dbPath = this._getDatabasePath();
			console.log('Opening database at', dbPath);
			this.database = new Database(dbPath, { verbose: console.log });
		}

		return this.database;
	}

	public databaseExists(): boolean {
		return fs.existsSync(this._getDatabasePath());
	}

	protected _createDatabaseDirectory() {
		const paths = envPaths('ptw-evaluation-assist');
		fs.mkdirSync(paths.data, { recursive: true });
	}

	protected _getDatabasePath(): string {
		const paths = envPaths('ptw-evaluation-assist');
		return paths.data + '/' + this.databaseName;
	}
}
