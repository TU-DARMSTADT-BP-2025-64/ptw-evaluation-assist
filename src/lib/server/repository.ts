import { ProductDatabaseModel, ProductViewModel } from '$lib/models/product.model';
import bcrypt from 'bcrypt';
import type { DatabaseClient } from './database-client';
import type { User } from '$lib/models/user.model';
import dotenv from 'dotenv';

dotenv.config(); // Lädt die Umgebungsvariablen aus der .env-Datei
// Stellen Sie sicher, dass DEV_ADMIN_PASSWORD in der .env-Datei gesetzt ist

export class Repository {
	public static Instance: Repository;

	constructor(private databaseClient: DatabaseClient) {
		console.log('Repository constructor', databaseClient);
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

	public async userExists(username: string, password: string): Promise<boolean> {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('SELECT * FROM users WHERE username = ?');
		const user = statement.get(username) as User| undefined;

		if (user) {
			return await bcrypt.compare(password, user.password);
		}

		return false;
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

	private async _initAdminUser() {
		const db = this.databaseClient.getDatabase();

		// Prüfe, ob der Benutzer 'admin' bereits existiert
		const statementCheck = db.prepare('SELECT * FROM users WHERE username = ?');
		const adminUser = statementCheck.get('admin');

		if (adminUser) {
			console.log('Admin-Benutzer existiert bereits.');
			return;
		}

		const password = process.env.DEV_ADMIN_PASSWORD;

		if (!password) {
			throw new Error('DEV_ADMIN_PASSWORD ist nicht gesetzt! Setze es in der .env-Datei.');
		}

		// Passwort mit bcrypt hashen
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);
		console.log('Initiales Admin-Passwort wurde erfolgreich erstellt.');

		// User,Passwort Kombination in Datenbank ablegen
		const statementInsert = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
		statementInsert.run('admin', passwordHash);
		console.log('Admin-Benutzer wurde erfolgreich erstellt.');
	}
}
