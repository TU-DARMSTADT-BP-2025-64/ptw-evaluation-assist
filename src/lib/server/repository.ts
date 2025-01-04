import { ProductDatabaseModel, ProductViewModel } from '$lib/models/product.model';
import generator from 'generate-password';
import { createHash } from 'crypto';
import { Logger } from './logger';
import type { DatabaseClient } from './database-client';
import { ServerConstants } from './server-constants';
import type { AssemblyGroupViewModel } from '$lib/models/assembly-group.model';
import type { WearCriterionViewModel } from '$lib/models/wear-criterion.model';
import type { WearThresholdViewModel } from '$lib/models/wear-threshold.model';
import type { AssemblyComponentViewModel } from '$lib/models/assembly-component.model';
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
		const db = this.databaseClient.createDatabase();
		db.pragma('foreign_keys = ON');
		
		this._initTables();
		this._initAdminUser();
	}

	public getProducts(): ProductViewModel[] {
		const database = this.databaseClient.getDatabase();
		const products = database.prepare('SELECT * FROM products').all() as ProductDatabaseModel[];

		return products as ProductViewModel[];
	}

	public getProduct(id: string): ProductViewModel {
		console.log('getProduct', id);
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('SELECT * FROM products WHERE id = ?');
		const product = statement.get(id) as ProductDatabaseModel;
		return product as ProductViewModel;
	}

	public addProduct(product: ProductViewModel): ProductViewModel {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('INSERT INTO products (id, name) VALUES (?, ?)');
		statement.run(product.id, product.name);
		return product;
	}

	public updateProduct(product: ProductViewModel): ProductViewModel {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('UPDATE products SET name = ? WHERE id = ?');
		const databaseModel = new ProductDatabaseModel();
		databaseModel.name = product.name;

		statement.run(databaseModel.name, product.id);
		return product;
	}

	public deleteProduct(id: string): boolean {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('DELETE FROM products WHERE id = ?');
		statement.run(id);
		return true;
	}

	public getAssemblyGroups(productId: string): AssemblyGroupViewModel[] {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('SELECT * FROM assembly_groups WHERE productId = ?');
		const assemblyGroups = statement.all(productId);
		return assemblyGroups as AssemblyGroupViewModel[];
	}

	public addAssemblyGroup(assemblyGroup: AssemblyGroupViewModel): AssemblyGroupViewModel {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare(
			'INSERT INTO assembly_groups (id, productId, parentId, name) VALUES (?, ?, ?, ?)'
		);
		statement.run(assemblyGroup.id, assemblyGroup.productId, assemblyGroup.parentId, assemblyGroup.name);
		return assemblyGroup;
	}

	public updateAssemblyGroup(assemblyGroup: AssemblyGroupViewModel): AssemblyGroupViewModel {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare(
			'UPDATE assembly_groups SET productId = ?, parentId = ?, name = ? WHERE id = ?'
		);
		statement.run(
			assemblyGroup.productId,
			assemblyGroup.parentId,
			assemblyGroup.name,
			assemblyGroup.id
		);
		return assemblyGroup;
	}

	public deleteAssemblyGroup(id: string): boolean {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('DELETE FROM assembly_groups WHERE id = ?');
		statement.run(id);
		return true;
	}

	public getAssemblyComponents(productId: string): AssemblyComponentViewModel[] {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('SELECT * FROM assembly_components WHERE productId = ?');
		const assemblyComponents = statement.all(productId);
		return assemblyComponents as AssemblyComponentViewModel[];
	}

	public addAssemblyComponent(
		assemblyComponent: AssemblyComponentViewModel
	): AssemblyComponentViewModel {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare(
			'INSERT INTO assembly_components (id, productId, assemblyGroupId, name, machineElementCategory, machineElement) VALUES (?, ?, ?, ?, ?, ?)'
		);
		statement.run(
			assemblyComponent.id,
			assemblyComponent.productId,
			assemblyComponent.assemblyGroupId,
			assemblyComponent.name,
			assemblyComponent.machineElementCategory,
			assemblyComponent.machineElement
		);
		return assemblyComponent;
	}

	public updateAssemblyComponent(
		assemblyComponent: AssemblyComponentViewModel
	): AssemblyComponentViewModel {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare(
			'UPDATE assembly_components SET productId = ?, assemblyGroupId = ?, name = ?, machineElementCategory = ?, machineElement = ? WHERE id = ?'
		);
		statement.run(
			assemblyComponent.productId,
			assemblyComponent.assemblyGroupId,
			assemblyComponent.name,
			assemblyComponent.machineElementCategory,
			assemblyComponent.machineElement,
			assemblyComponent.id
		);
		return assemblyComponent;
	}

	public deleteAssemblyComponent(id: string): boolean {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('DELETE FROM assembly_components WHERE id = ?');
		statement.run(id);
		return true;
	}

	public getWearCriteria(productId: string): WearCriterionViewModel[] {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('SELECT * FROM wear_criteria WHERE productId = ?');
		const wearCriteria = statement.all(productId);
		return wearCriteria as WearCriterionViewModel[];
	}

	public addWearCriterion(wearCriterion: WearCriterionViewModel): WearCriterionViewModel {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare(
			'INSERT INTO wear_criteria (id, productId, componentId, label) VALUES (?, ?, ?, ?)'
		);
		statement.run(wearCriterion.id, wearCriterion.productId, wearCriterion.componentId, wearCriterion.label);
		return wearCriterion;
	}

	public updateWearCriterion(wearCriterion: WearCriterionViewModel): WearCriterionViewModel {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare(
			'UPDATE wear_criteria SET productId = ?, componentId = ?, question = ? WHERE id = ?'
		);
		statement.run(
			wearCriterion.productId,
			wearCriterion.componentId,
			wearCriterion.label,
			wearCriterion.id
		);
		return wearCriterion;
	}

	public deleteWearCriterion(id: string): boolean {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('DELETE FROM wear_criteria WHERE id = ?');
		statement.run(id);
		return true;
	}

	public getWearThresholds(productId: string): WearThresholdViewModel[] {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('SELECT * FROM wear_thresholds WHERE productId = ?');
		const wearThresholds = statement.all(productId);
		return wearThresholds as WearThresholdViewModel[];
	}

	public addWearThreshold(wearThreshold: WearThresholdViewModel): WearThresholdViewModel {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare(
			'INSERT INTO wear_thresholds (id, productId, criterionId, label, type, fixStrategy, measures) VALUES (?, ?, ?, ?, ?, ?, ?)'
		);
		statement.run(
			wearThreshold.id,
			wearThreshold.productId,
			wearThreshold.criterionId,
			wearThreshold.label,
			wearThreshold.type,
			wearThreshold.fixStrategy,
			wearThreshold.measures
		);
		return wearThreshold
	}

	public updateWearThreshold(wearThreshold: WearThresholdViewModel): WearThresholdViewModel {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare(
			'UPDATE wear_thresholds SET productId = ?, criterionId = ?, label = ?, type = ?, fixStrategy = ?, measures = ? WHERE id = ?'
		);
		statement.run(
			wearThreshold.productId,
			wearThreshold.criterionId,
			wearThreshold.label,
			wearThreshold.type,
			wearThreshold.fixStrategy,
			wearThreshold.measures,
			wearThreshold.id
		);
		return wearThreshold;
	}

	public deleteWearThreshold(id: string): boolean {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('DELETE FROM wear_thresholds WHERE id = ?');
		statement.run(id);
		return true;
	}

	public userExists(username: string, password: string): boolean {
		const database = this.databaseClient.getDatabase();
		const statement = database.prepare('SELECT * FROM users WHERE username = ? AND password = ?');

		const passwordHash = createHash('sha256')
			.update(password + ServerConstants.USER_SALT)
			.digest('base64');
		const user = statement.get(username, passwordHash);
		return !!user;
	}

	private _initTables() {
		const db = this.databaseClient.getDatabase();
		// Products table
		db.prepare(
			`CREATE TABLE products (
						id TEXT PRIMARY KEY, 
						name TEXT NOT NULL
				)`
		).run();
		// Assembly group table
		db.prepare(
			`CREATE TABLE assembly_groups (
						id TEXT PRIMARY KEY, 
						productId TEXT NOT NULL, 
						parentId TEXT, 
						name TEXT NOT NULL, 
						FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE, 
						FOREIGN KEY(parentId) REFERENCES assembly_groups(id)
				)`
		).run();
		// Assembly component table
		db.prepare(
			`CREATE TABLE assembly_components (
						id TEXT PRIMARY KEY, 
						productId TEXT NOT NULL, 
						assemblyGroupId TEXT NOT NULL, 
						name TEXT NOT NULL, 
						machineElementCategory TEXT, 
						machineElement TEXT, 
						FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE, 
						FOREIGN KEY(assemblyGroupId) REFERENCES assembly_groups(id)
				)`
		).run();
		// Wear criterion table
		db.prepare(
			`CREATE TABLE wear_criteria (
						id TEXT PRIMARY KEY, 
						productId TEXT NOT NULL, 
						componentId TEXT NOT NULL, 
						label TEXT NOT NULL, 
						FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE, 
						FOREIGN KEY(componentId) REFERENCES assembly_components(id)
					)`
		).run();
		// Wear threshold table
		db.prepare(
			`CREATE TABLE wear_thresholds (
						id TEXT PRIMARY KEY, 
						productId TEXT NOT NULL,
						criterionId TEXT NOT NULL, 
						label TEXT NOT NULL, 
						type TEXT NOT NULL, 
						fixStrategy TEXT,
						measures TEXT,
						FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE, 
						FOREIGN KEY(criterionId) REFERENCES wear_criteria(id)
					)`
		).run();

		// Users table
		db.prepare(
			`CREATE TABLE users (
						id INTEGER PRIMARY KEY AUTOINCREMENT, 
						username TEXT NOT NULL, 
						password TEXT NOT NULL
				)`
		).run();
	}

	private _initAdminUser() {
		const db = this.databaseClient.getDatabase();

		const password = generator.generate({
			length: 10,
			numbers: true,
			excludeSimilarCharacters: true
		});
		const passwordHash = createHash('sha256')
			.update(password + ServerConstants.USER_SALT)
			.digest('base64');
		const statement = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');

		Logger.Instance.info(
			'Creating admin user with password: ' +
				password +
				'. Please change this password immediately.'
		);

		statement.run('admin', passwordHash);
	}
}
