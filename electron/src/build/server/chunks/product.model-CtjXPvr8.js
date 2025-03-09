import { v4 } from 'uuid';

class ProductViewModel {
  id = v4();
  name = "";
  createdAt = Date.now();
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
      createdAt: databaseModel.createdAt
    };
  }
  static toDatabaseModel(viewModel) {
    return {
      id: viewModel.id,
      name: viewModel.name,
      createdAt: viewModel.createdAt
    };
  }
}
class ProductTreeViewModel {
  id = v4();
  name = "";
  assemblyGroups = [];
  fixStrategies = [];
  createdAt = Date.now();
  constructor(options = {}) {
    Object.assign(this, options);
  }
}

export { ProductTreeViewModel as P, ProductViewModel as a };
//# sourceMappingURL=product.model-CtjXPvr8.js.map
