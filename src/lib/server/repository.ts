import { ProductDatabaseModel, ProductViewModel } from '$lib/models/product.model';
import envPaths from 'env-paths';
import Database from 'better-sqlite3';
import fs from 'fs';
export class Repository {
    private static readonly DATABASE_NAME = 'database.db';
	public static readonly Instance = new Repository();

	private database: Database.Database | undefined;

	constructor() {
        if (!this._databaseExists()) {
            this.init();
        }
    }

	public init() {
        console.log('Initializing database');
        const paths = envPaths('ptw-evaluation-assist');
        fs.mkdirSync(paths.data, { recursive: true });
        const database = this._getDatabase();
        database.prepare('CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)').run();
    }

	public getProducts(): ProductViewModel[] {
		const database = this._getDatabase();
		const products = database.prepare('SELECT * FROM products').all() as ProductDatabaseModel[];

		return products as ProductViewModel[];
	}

	public addProduct(product: ProductViewModel): ProductViewModel {
		const database = this._getDatabase();
		const statement = database.prepare('INSERT INTO products (name) VALUES (?)');
		const databaseModel = new ProductDatabaseModel();
		databaseModel.name = product.name;

		statement.run(databaseModel.name);
		return product;
	}

	private _getDatabase(): Database.Database {
		if (!this.database || !this.database.open) {
            const dbPath = this._getDatabasePath();
            console.log('Opening database at', dbPath);
			this.database = new Database(dbPath, { verbose: console.log });
		}

		return this.database;
	}

	private _getDatabasePath(): string {
		const paths = envPaths('ptw-evaluation-assist');
		return paths.data + '/' + Repository.DATABASE_NAME;
	}

    private _databaseExists(): boolean {
        return fs.existsSync(this._getDatabasePath());
    }
}
