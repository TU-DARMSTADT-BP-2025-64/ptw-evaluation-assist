import { DatabaseClient } from '../database-client';
import Database from 'better-sqlite3';


export class DatabaseClientMock extends DatabaseClient {

    constructor() {
        super(':memory:');
    }

    public override createDatabase(): Database.Database {
        return this.getDatabase();
    }

    public override getDatabase(): Database.Database {
        if (!this.database || !this.database.open) {
            this.database = new Database(':memory:', { verbose: console.log });
        }

        return this.database;
    }
}