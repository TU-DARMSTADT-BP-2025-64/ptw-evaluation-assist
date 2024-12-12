import { DatabaseModel } from './database.model';

export class AssemblyComponentDatabaseModel extends DatabaseModel {
    name: string = '';
    assemblyGroupId: string = '';
}

export class AssemblyComponentTreeViewModel {
    id: string = '';
    name: string = '';
    parent: AssemblyComponentTreeViewModel | undefined;

    constructor() {
        
    }
}