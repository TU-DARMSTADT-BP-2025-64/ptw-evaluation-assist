import { ProductDatabaseModel, ProductViewModel } from '$lib/models/product.model';
import envPaths from 'env-paths';
import Database from 'better-sqlite3';
import fs from 'fs';
import generator from 'generate-password';
import { createHash } from 'crypto';
import { Logger } from './logger';
export class Repository {
	private static readonly DATABASE_NAME = 'database.db';

	private static readonly USER_SALT = 'ptw-evaluation-assist';
	public static readonly Instance = new Repository();

	private database: Database.Database | undefined;

	constructor() {
		if (!this._databaseExists()) {
			this.init();
		}
	}

	public init() {
		console.log('Initializing database');
		this._createDatabaseDirectory();
		this._initTables();
		this._initAdminUser();
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

	public userExists(username: string, password: string): boolean {
		const database = this._getDatabase();
		const statement = database.prepare('SELECT * FROM users WHERE username = ? AND password = ?');

		const passwordHash = createHash('sha256').update(password + Repository.USER_SALT).digest('base64');
		const user = statement.get(username, passwordHash);
		return !!user;
	}

	private _getDatabase(): Database.Database {
		if (!this.database || !this.database.open) {
			const dbPath = this._getDatabasePath();
			console.log('Opening database at', dbPath);
			this.database = new Database(dbPath, { verbose: console.log });
		}

		return this.database;
	}

	private _initTables() {
		const db = this._getDatabase();
		db.prepare(
			'CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)'
		).run();
		db.prepare(
			'CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL)'
		).run();
	}

	private _initAdminUser() {
		const db = this._getDatabase();

		const password = generator.generate({
			length: 10,
			numbers: true,
			excludeSimilarCharacters: true
		});
		const passwordHash = createHash('sha256').update(password + Repository.USER_SALT).digest('base64');
		const statement = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');

		Logger.Instance.info('Creating admin user with password: ' + password + '. Please change this password immediately.');

		statement.run('admin', passwordHash);
	}

	private _getDatabasePath(): string {
		const paths = envPaths('ptw-evaluation-assist');
		return paths.data + '/' + Repository.DATABASE_NAME;
	}

	private _databaseExists(): boolean {
		return fs.existsSync(this._getDatabasePath());
	}

	private _createDatabaseDirectory() {
		const paths = envPaths('ptw-evaluation-assist');
		fs.mkdirSync(paths.data, { recursive: true });
	}
}
