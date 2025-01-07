import type { AssemblyGroupTreeViewModel } from './assembly-group.model';
import { DatabaseModel } from './database.model';
import { v4 as uuidv4 } from 'uuid';

export class ProductDatabaseModel extends DatabaseModel {
    name: string = '';
}

export class ProductViewModel {
    id: string = uuidv4();
    name: string = '';

    constructor(options: Partial<ProductViewModel> = {}) {
        Object.assign(this, options);
    }
}

export class ProductTreeViewModel {
    id: string = uuidv4();
    name: string = '';
    assemblyGroups: AssemblyGroupTreeViewModel[] = [];

    constructor(options: Partial<ProductTreeViewModel> = {}) {
        Object.assign(this, options);
    }
}