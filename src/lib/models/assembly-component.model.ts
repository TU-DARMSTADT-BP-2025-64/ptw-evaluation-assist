import type { AssemblyGroupTreeViewModel } from './assembly-group.model';
import { DatabaseModel } from './database.model';

export class AssemblyComponentDatabaseModel extends DatabaseModel {
    name: string = '';
    assemblyGroupId: string = '';
}

export class AssemblyComponentTreeViewModel {
    id: string = '';
    type: string = 'assembly-component';
    name: string = '';
    parent: AssemblyGroupTreeViewModel | undefined;

    constructor() {
        
    }
}