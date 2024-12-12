import type { AssemblyGroupTreeViewModel } from './assembly-group.model';
import { DatabaseModel } from './database.model';

export class ProductDatabaseModel extends DatabaseModel {
    name: string = '';
}

export class ProductViewModel {
    id: number | null = 0;
    name: string = '';

    constructor() {

    }
}

export class ProductTreeViewModel {
    id: number | null = 0;
    name: string = '';
    assemblyGroups: AssemblyGroupTreeViewModel[] = [];

    constructor() {

    }
}