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