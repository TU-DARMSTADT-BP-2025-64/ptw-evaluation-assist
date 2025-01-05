import { DatabaseModel } from './database.model';
import type { WearCriterionTreeViewModel } from './wear-criterion.model';
import { v4 as uuidv4 } from 'uuid';

export class WearThresholdDatabaseModel extends DatabaseModel {
    public productId: string | undefined;
    public criterionId: string | undefined;
	public label: string = '';
	public type: WearThresholdType = WearThresholdType.OpticalError;
	public fixStrategy: string = '';
    public measures: string = '';
}

export class WearThresholdViewModel {
    public id: string = uuidv4();
    public productId: string | undefined;
    public criterionId: string | undefined;
    public label: string = '';
    public type: WearThresholdType = WearThresholdType.OpticalError;
    public fixStrategy: string = '';
    public measures: string = '';

    constructor(options: Partial<WearThresholdViewModel> = {}) {
        Object.assign(this, options);
    }
}


export class WearThresholdTreeViewModel {
    public id: string = uuidv4();
    public label: string = '';
    public criterion: WearCriterionTreeViewModel | undefined;
    public type: WearThresholdType = WearThresholdType.OpticalError;
    public fixStrategy: string = '';
    public measures: string = '';

    constructor(options: Partial<WearThresholdTreeViewModel> = {}) {
        Object.assign(this, options);
    }
}

export enum WearThresholdType {
	OpticalError = 'OpticalError',
	FunctionalError = 'FunctionalError',
	SafetyError = 'SafetyError'
}

export const WearThresholdTypeTranslation = {
    OpticalError: 'Optischer Fehler',
    FunctionalError: 'Funktionaler Fehler',
    SafetyError: 'Sicherheitskritischer Fehler'
};


export enum WearThresholdFixStrategy {
	Reuse = 'Reuse',
	Repair = 'Repair',
	Recycle = 'Recycle'
}


    
