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

export enum PredefinedComponentCategory {
    'Elektronisches_Bauteile' = 'Elektronisches_Bauteile',
    'Lagerungselemente' = 'Lagerungselemente',
    'Übertragungselemente' = 'Übertragungselemente',
    'Dichtungselemente' = 'Dichtungselemente',
    'Verbindungselemente' = 'Verbindungselemente',
    'Bau_und_Gehäuseteile' = 'Bau_und_Gehäuseteile',
}