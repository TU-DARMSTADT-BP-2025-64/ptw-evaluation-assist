import { a as ProductViewModel } from './product.model-CtjXPvr8.js';
import bcrypt from 'bcrypt';
import 'better-sqlite3';
import './index-DK8hzxr2.js';
import dotenv from 'dotenv';

dotenv.config();
class Repository {
  constructor(databaseClient, afterInitActions = []) {
    this.databaseClient = databaseClient;
    console.log("Repository constructor", databaseClient);
    if (!this.databaseClient.databaseExists()) {
      this.init();
      afterInitActions.forEach((action) => action(this));
    }
  }
  static Instance;
  init() {
    console.log("Initializing database");
    const db = this.databaseClient.createDatabase();
    db.pragma("foreign_keys = ON");
    this._initTables();
    this._initAdminUser();
  }
  getProducts() {
    const database = this.databaseClient.getDatabase();
    const products = database.prepare("SELECT * FROM products").all();
    return products.map((product) => ProductViewModel.fromDatabaseModel(product)).filter((product) => product !== null);
  }
  getProduct(id) {
    console.log("getProduct", id);
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("SELECT * FROM products WHERE id = ?");
    const product = statement.get(id);
    return ProductViewModel.fromDatabaseModel(product);
  }
  addProduct(product) {
    const database = this.databaseClient.getDatabase();
    const databaseModel = ProductViewModel.toDatabaseModel(product);
    const statement = database.prepare(
      "INSERT INTO products (id, name, createdAt) VALUES (?, ?, ?)"
    );
    statement.run(databaseModel.id, databaseModel.name, databaseModel.createdAt);
    return product;
  }
  updateProduct(product) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("UPDATE products SET name = ?, createdAt = ? WHERE id = ?");
    const databaseModel = ProductViewModel.toDatabaseModel(product);
    statement.run(databaseModel.name, databaseModel.createdAt, databaseModel.id);
    return product;
  }
  deleteProduct(id) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("DELETE FROM products WHERE id = ?");
    statement.run(id);
    return true;
  }
  getAssemblyGroups(productId) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("SELECT * FROM assembly_groups WHERE productId = ?");
    const assemblyGroups = statement.all(productId);
    return assemblyGroups;
  }
  addAssemblyGroup(assemblyGroup) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare(
      "INSERT INTO assembly_groups (id, productId, parentId, name) VALUES (?, ?, ?, ?)"
    );
    statement.run(
      assemblyGroup.id,
      assemblyGroup.productId,
      assemblyGroup.parentId,
      assemblyGroup.name
    );
    return assemblyGroup;
  }
  updateAssemblyGroup(assemblyGroup) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare(
      "UPDATE assembly_groups SET productId = ?, parentId = ?, name = ? WHERE id = ?"
    );
    statement.run(
      assemblyGroup.productId,
      assemblyGroup.parentId,
      assemblyGroup.name,
      assemblyGroup.id
    );
    return assemblyGroup;
  }
  deleteAssemblyGroup(id) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("DELETE FROM assembly_groups WHERE id = ?");
    statement.run(id);
    return true;
  }
  getAssemblyComponents(productId) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("SELECT * FROM assembly_components WHERE productId = ?");
    const assemblyComponents = statement.all(productId);
    return assemblyComponents;
  }
  addAssemblyComponent(assemblyComponent) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare(
      "INSERT INTO assembly_components (id, productId, assemblyGroupId, name, machineElementCategory, machineElement) VALUES (?, ?, ?, ?, ?, ?)"
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
  updateAssemblyComponent(assemblyComponent) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare(
      "UPDATE assembly_components SET productId = ?, assemblyGroupId = ?, name = ?, machineElementCategory = ?, machineElement = ? WHERE id = ?"
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
  deleteAssemblyComponent(id) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("DELETE FROM assembly_components WHERE id = ?");
    statement.run(id);
    return true;
  }
  getWearCriteria(productId) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("SELECT * FROM wear_criteria WHERE productId = ?");
    const wearCriteria = statement.all(productId);
    return wearCriteria;
  }
  addWearCriterion(wearCriterion) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare(
      "INSERT INTO wear_criteria (id, productId, componentId, label) VALUES (?, ?, ?, ?)"
    );
    statement.run(
      wearCriterion.id,
      wearCriterion.productId,
      wearCriterion.componentId,
      wearCriterion.label
    );
    return wearCriterion;
  }
  updateWearCriterion(wearCriterion) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare(
      "UPDATE wear_criteria SET productId = ?, componentId = ?, question = ? WHERE id = ?"
    );
    statement.run(
      wearCriterion.productId,
      wearCriterion.componentId,
      wearCriterion.label,
      wearCriterion.id
    );
    return wearCriterion;
  }
  deleteWearCriterion(id) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("DELETE FROM wear_criteria WHERE id = ?");
    statement.run(id);
    return true;
  }
  getWearThresholds(productId) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("SELECT * FROM wear_thresholds WHERE productId = ?");
    const wearThresholds = statement.all(productId);
    return wearThresholds;
  }
  addWearThreshold(wearThreshold) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare(
      "INSERT INTO wear_thresholds (id, productId, criterionId, label, type, fixStrategy, measures, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    statement.run(
      wearThreshold.id,
      wearThreshold.productId,
      wearThreshold.criterionId,
      wearThreshold.label,
      wearThreshold.type,
      wearThreshold.fixStrategy,
      wearThreshold.measures,
      wearThreshold.image
    );
    return wearThreshold;
  }
  updateWearThreshold(wearThreshold) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare(
      "UPDATE wear_thresholds SET productId = ?, criterionId = ?, label = ?, type = ?, fixStrategy = ?, measures = ?, image = ? WHERE id = ?"
    );
    statement.run(
      wearThreshold.productId,
      wearThreshold.criterionId,
      wearThreshold.label,
      wearThreshold.type,
      wearThreshold.fixStrategy,
      wearThreshold.measures,
      wearThreshold.image,
      wearThreshold.id
    );
    return wearThreshold;
  }
  deleteWearThreshold(id) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("DELETE FROM wear_thresholds WHERE id = ?");
    statement.run(id);
    return true;
  }
  getThresholdStrategies(productId) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("SELECT * FROM threshold_strategies WHERE productId = ?");
    const thresholdStrategies = statement.all(productId);
    return thresholdStrategies;
  }
  addThresholdStrategy(thresholdStrategy) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare(
      "INSERT INTO threshold_strategies (id, productId, name, priority) VALUES (?, ?, ?, ?)"
    );
    statement.run(
      thresholdStrategy.id,
      thresholdStrategy.productId,
      thresholdStrategy.name,
      thresholdStrategy.priority
    );
    return thresholdStrategy;
  }
  deleteThresholdStrategy(id) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("DELETE FROM threshold_strategies WHERE id = ?");
    statement.run(id);
    return true;
  }
  getMachineElementCategories() {
    const database = this.databaseClient.getDatabase();
    const machineElementCategories = database.prepare("SELECT * FROM machine_element_categories").all();
    return machineElementCategories;
  }
  addMachineElementCategory(machineElementCategory) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare(
      "INSERT INTO machine_element_categories (id, name) VALUES (?, ?)"
    );
    statement.run(machineElementCategory.id, machineElementCategory.name);
    return machineElementCategory;
  }
  deleteMachineElementCategories() {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("DELETE FROM machine_element_categories");
    statement.run();
    return true;
  }
  getMachineElements() {
    const database = this.databaseClient.getDatabase();
    const machineElements = database.prepare("SELECT * FROM machine_elements").all();
    return machineElements;
  }
  addMachineElement(machineElement) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare(
      "INSERT INTO machine_elements (id, name, machineElementCategoryId) VALUES (?, ?, ?)"
    );
    statement.run(machineElement.id, machineElement.name, machineElement.machineElementCategoryId);
    return machineElement;
  }
  deleteMachineElements() {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("DELETE FROM machine_elements");
    statement.run();
    return true;
  }
  getMachineElementCriteria() {
    const database = this.databaseClient.getDatabase();
    const machineElementCriteria = database.prepare("SELECT * FROM machine_element_criteria").all();
    return machineElementCriteria;
  }
  addMachineElementCriteria(machineElementCriteria) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare(
      "INSERT INTO machine_element_criteria (id, name, machineElementId) VALUES (?, ?, ?)"
    );
    statement.run(machineElementCriteria.id, machineElementCriteria.name, machineElementCriteria.machineElementId);
    return machineElementCriteria;
  }
  deleteMachineElementCriteria() {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("DELETE FROM machine_element_criteria");
    statement.run();
    return true;
  }
  async userExists(username, password) {
    const database = this.databaseClient.getDatabase();
    const statement = database.prepare("SELECT * FROM users WHERE username = ?");
    const user = statement.get(username);
    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.password);
      console.log("Passwort korrekt:", passwordMatches);
      return passwordMatches;
    }
    return false;
  }
  _initTables() {
    const db = this.databaseClient.getDatabase();
    db.prepare(
      `CREATE TABLE products (
						id TEXT PRIMARY KEY, 
						name TEXT NOT NULL,
						createdAt INTEGER NOT NULL
				)`
    ).run();
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
    db.prepare(
      `CREATE TABLE wear_thresholds (
						id TEXT PRIMARY KEY, 
						productId TEXT NOT NULL,
						criterionId TEXT NOT NULL, 
						label TEXT NOT NULL, 
						type TEXT NOT NULL, 
						fixStrategy TEXT,
						measures TEXT,
						image TEXT,
						FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE, 
						FOREIGN KEY(criterionId) REFERENCES wear_criteria(id)
					)`
    ).run();
    db.prepare(
      `CREATE TABLE threshold_strategies (
				id TEXT PRIMARY KEY,
				productId TEXT NOT NULL,
				name TEXT NOT NULL,
				priority INTEGER NOT NULL,
				FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
			)`
    ).run();
    db.prepare(
      `CREATE TABLE machine_element_categories (
				id TEXT PRIMARY KEY,
				name TEXT NOT NULL
				)`
    ).run();
    db.prepare(
      `CREATE TABLE machine_elements (
				id TEXT PRIMARY KEY,
				name TEXT NOT NULL,
				machineElementCategoryId TEXT NOT NULL,
				FOREIGN KEY(machineElementCategoryId) REFERENCES machine_element_categories(id)
				)`
    ).run();
    db.prepare(
      `CREATE TABLE machine_element_criteria (
				id TEXT PRIMARY KEY,
				name TEXT NOT NULL,
				machineElementId TEXT NOT NULL,
				FOREIGN KEY(machineElementId) REFERENCES machine_elements(id)
				)`
    ).run();
    db.prepare(
      `CREATE TABLE users (
						id INTEGER PRIMARY KEY AUTOINCREMENT, 
						username TEXT NOT NULL, 
						password TEXT NOT NULL
				)`
    ).run();
  }
  async _initAdminUser() {
    const db = this.databaseClient.getDatabase();
    const statementCheck = db.prepare("SELECT * FROM users WHERE username = ?");
    const adminUser = statementCheck.get("admin");
    if (adminUser) {
      console.log("Admin-Benutzer existiert bereits.");
      return;
    }
    const password = process.env.DEV_ADMIN_PASSWORD;
    console.log("Initialisiere Admin-Benutzer: " + password);
    if (!password) {
      throw new Error("DEV_ADMIN_PASSWORD ist nicht gesetzt! Setze es in der .env-Datei.");
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    console.log("Initiales Admin-Passwort wurde erfolgreich erstellt.");
    const statementInsert = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    statementInsert.run("admin", passwordHash);
    console.log("Admin-Benutzer wurde erfolgreich erstellt.");
  }
  async getAdmin() {
    const db = this.databaseClient.getDatabase();
    const statement = db.prepare("SELECT * FROM users WHERE username = ?");
    return statement.get("admin");
  }
  async updateAdminPassword(newPassword) {
    const db = this.databaseClient.getDatabase();
    const statement = db.prepare("UPDATE users SET password = ? WHERE username = ?");
    const result = statement.run(newPassword, "admin");
    if (result.changes === 1) {
      console.log("Passwort erfolgreich aktualisiert.");
    } else {
      console.log("Fehler beim Aktualisieren des Passworts.");
    }
    return result.changes === 1;
  }
}

export { Repository as R };
//# sourceMappingURL=repository-DsW9d6WW.js.map
