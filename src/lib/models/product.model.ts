import type { AssemblyGroupTreeViewModel } from './assembly-group.model';
import { DatabaseModel } from './database.model';
import { v4 as uuidv4 } from 'uuid';
import type { ThresholdStrategyTreeViewModel } from './threshold-strategy.model';

export class ProductDatabaseModel extends DatabaseModel {
    name: string = '';
    createdAt: number = Date.now();

    constructor(options: Partial<ProductDatabaseModel> = {}) {
        super();
        Object.assign(this, options);
    }
}

export class ProductViewModel {
    id: string = uuidv4();
    name: string = '';

    createdAt: number = Date.now();

    constructor(options: Partial<ProductViewModel> = {}) {
        Object.assign(this, options);
    }

    static fromDatabaseModel(databaseModel: ProductDatabaseModel) {
        if (!databaseModel) {
            return null;
        }

        return {
            id: databaseModel.id,
            name: databaseModel.name,
            createdAt: databaseModel.createdAt
        };
    }

    static toDatabaseModel(viewModel: ProductViewModel): ProductDatabaseModel {
        return {
            id: viewModel.id,
            name: viewModel.name,
            createdAt: viewModel.createdAt
        };
    }
}

export class ProductTreeViewModel {
    id: string = uuidv4();
    name: string = '';
    assemblyGroups: AssemblyGroupTreeViewModel[] = [];
    fixStrategies: ThresholdStrategyTreeViewModel[] = [];
    createdAt: number = Date.now();
    constructor(options: Partial<ProductTreeViewModel> = {}) {
        Object.assign(this, options);
    }
}