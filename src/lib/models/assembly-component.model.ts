import type { AssemblyGroupTreeViewModel } from './assembly-group.model';
import { DatabaseModel } from './database.model';
import type { WearCriterionTreeViewModel } from './wear-criterion.model';
import { v4 as uuidv4 } from 'uuid';

export class AssemblyComponentDatabaseModel extends DatabaseModel {
    productId: string | undefined;
    assemblyGroupId: string | undefined;
    name: string = '';
    machineElementCategory: string = '';
    machineElement: string = '';
}

export class AssemblyComponentViewModel {
    id: string = uuidv4();
    productId: string | undefined;
    name: string = '';
    assemblyGroupId: string | undefined;

    machineElementCategory: string = '';
    machineElement: string = '';

    constructor(options: Partial<AssemblyComponentViewModel> = {}) {
        Object.assign(this, options);
    }
}

export class AssemblyComponentTreeViewModel {
    id: string = uuidv4();
    type: string = 'assembly-component';
    parent: AssemblyGroupTreeViewModel | undefined;
    wearCriteria: WearCriterionTreeViewModel[] = [];
    name: string = '';
    machineElementCategory: string = '';
    machineElement: string = '';
    
    constructor(options: Partial<AssemblyComponentTreeViewModel> = {}) {
        Object.assign(this, options);
    }
}

export enum PredefinedComponentCategory {
    'Elektronisches_Bauteile' = 'Elektronisches_Bauteile',
    'Lagerungselemente' = 'Lagerungselemente',
    'Übertragungselemente' = 'Übertragungselemente',
    'Dichtungselemente' = 'Dichtungselemente',
    'Verbindungselemente' = 'Verbindungselemente',
    'Bau_und_Gehäuseteile' = 'Bau_und_Gehäuseteile',
    'Elemente_zum_Transport_von_Flüssigkeiten_und_Gasen' = 'Elemente_zum_Transport_von_Flüssigkeiten_und_Gasen',
}

export enum CategoryElement {
    'Niete' = 'Niete',
    'Schraube' = 'Schraube',
    'Federn'  = 'Federn',
    'Stifte_Bolzen'  = 'Stifte_Bolzen',
    'Schweißverbindungen'  = 'Schweißverbindungen',
    'Lötverbindungen'  = 'Lötverbindungen',
    'Klebverbindungen'  = 'Klebverbindungen',
    'Gleitlager'  = 'Gleitlager',
    'Wälzlager'  = 'Wälzlager',
    'Achsen/Wellen'  = 'Achsen/Wellen',
    'Zahnräder'  = 'Zahnräder',
    'Riemen- und Kettentriebe'  = 'Riemen- und Kettentriebe',
    'Statische Dichtungen'  = 'Statische Dichtungen',
    'Dynamische Dichtungen' = 'Dynamische Dichtungen',
    'Rohre'  = 'Rohre',
    'Ventile'  = 'Ventile',
    'Gehäuse'  = 'Gehäuse',
    'Rahmen'  = 'Rahmen',
    'Kerne'  = 'Kerne',
    'Platine' = 'Platine',
}


export enum Strategies{
    'Recycle' = 'Recycle',
    'Wiederverwenden' = 'Wiederverwenden',
    'Wiederaufbereitung' = 'Wiederaufbereitung',
}