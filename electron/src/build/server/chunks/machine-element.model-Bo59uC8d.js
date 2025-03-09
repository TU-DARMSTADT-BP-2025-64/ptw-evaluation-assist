import { v4 } from 'uuid';

class MachineElementCriteriaViewModel {
  id = v4();
  name = "";
  machineElementId = "";
  constructor(options = {}) {
    Object.assign(this, options);
  }
  static fromDatabaseModel(databaseModel) {
    if (!databaseModel) {
      return null;
    }
    return {
      id: databaseModel.id,
      name: databaseModel.name,
      machineElementId: databaseModel.machineElementId
    };
  }
  static toDatabaseModel(viewModel) {
    return {
      id: viewModel.id,
      name: viewModel.name,
      machineElementId: viewModel.machineElementId
    };
  }
}
class MachineElementCategoryViewModel {
  id = v4();
  name = "";
  constructor(options = {}) {
    Object.assign(this, options);
  }
  static fromDatabaseModel(databaseModel) {
    if (!databaseModel) {
      return null;
    }
    return {
      id: databaseModel.id,
      name: databaseModel.name
    };
  }
  static toDatabaseModel(viewModel) {
    return {
      id: viewModel.id,
      name: viewModel.name
    };
  }
}
class MachineElementViewModel {
  id = v4();
  name = "";
  machineElementCategoryId = "";
  constructor(options = {}) {
    Object.assign(this, options);
  }
  static fromDatabaseModel(databaseModel) {
    if (!databaseModel) {
      return null;
    }
    return {
      id: databaseModel.id,
      name: databaseModel.name,
      machineElementCategoryId: databaseModel.machineElementCategoryId
    };
  }
  static toDatabaseModel(viewModel) {
    return {
      id: viewModel.id,
      name: viewModel.name,
      machineElementCategoryId: viewModel.machineElementCategoryId
    };
  }
}

export { MachineElementCategoryViewModel as M, MachineElementViewModel as a, MachineElementCriteriaViewModel as b };
//# sourceMappingURL=machine-element.model-Bo59uC8d.js.map
