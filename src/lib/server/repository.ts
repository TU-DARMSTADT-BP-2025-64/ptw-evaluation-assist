import { ProductDatabaseModel, ProductViewModel } from '$lib/models/product.model';
import generator from 'generate-password';
import { createHash } from 'crypto';
import { Logger } from './logger';
import type { DatabaseClient } from './database-client';
import { ServerConstants } from './server-constants';
export class Repository {
	public static Instance: Repository;

	constructor(private databaseClient: DatabaseClient) {
		if (!this.databaseClient.databaseExists()) {
			this.init();
		}
	}

	public init() {
		console.log('Initializing database');
		this.databaseClient.createDatabase();
		this._initTables();
		this._initAdminUser();
	}

	public getProducts(): ProductViewModel[] {
		const database = this.databaseClient.getDatabase();
		const products = database.prepare('SELECT * FROM products').all() as ProductDatabaseModel[];

		return products as ProductViewModel[];
	}

	public addProduct(product: ProductViewModel): ProductViewModel {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('INSERT INTO products (name) VALUES (?)');
		const databaseModel = new ProductDatabaseModel();
		databaseModel.name = product.name;

		statement.run(databaseModel.name);
		return product;
	}

	public deleteProduct(id: string): boolean {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('DELETE FROM products WHERE id = ?');
		statement.run(id);
		return true;
	}

	public userExists(username: string, password: string): boolean {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('SELECT * FROM users WHERE username = ? AND password = ?');

		const passwordHash = createHash('sha256').update(password + ServerConstants.USER_SALT).digest('base64');
		const user = statement.get(username, passwordHash);
		return !!user;
	}

	private _initTables() {
		const db = this.databaseClient.getDatabase();
		// Products table
		db.prepare(
			'CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)'
		).run();
		// Assembly group table
		db.prepare(
			'CREATE TABLE assembly_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, parent_id INTEGER, name TEXT NOT NULL, FOREIGN KEY(product_id) REFERENCES products(id), FOREIGN KEY(parent_id) REFERENCES assembly_groups(id))'
		).run();
		// Assembly component table
		db.prepare(
			'CREATE TABLE assembly_components (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, assembly_group_id INTEGER NOT NULL, name TEXT NOT NULL, FOREIGN KEY(product_id) REFERENCES products(id), FOREIGN KEY(assembly_group_id) REFERENCES assembly_groups(id))'
		).run();
		// Wear criterion table
		db.prepare(
			'CREATE TABLE wear_criteria (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, assembly_component_id INTEGER NOT NULL, question TEXT NOT NULL, FOREIGN KEY(product_id) REFERENCES products(id), FOREIGN KEY(assembly_component_id) REFERENCES assembly_components(id))'
		).run();
		// Wear threshold table
		db.prepare(
			'CREATE TABLE wear_thresholds (id INTEGER PRIMARY KEY AUTOINCREMENT, wear_criterion_id INTEGER NOT NULL, label TEXT NOT NULL, type TEXT NOT NULL, FOREIGN KEY(wear_criterion_id) REFERENCES wear_criteria(id))'
		).run();
		
		// Users table
		db.prepare(
			'CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL)'
		).run();

	}

	private _initAdminUser() {
		const db = this.databaseClient.getDatabase();;

		const password = generator.generate({
			length: 10,
			numbers: true,
			excludeSimilarCharacters: true
		});
		const passwordHash = createHash('sha256').update(password + ServerConstants.USER_SALT).digest('base64');
		const statement = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');

		Logger.Instance.info('Creating admin user with password: ' + password + '. Please change this password immediately.');

		statement.run('admin', passwordHash);
	}
}
