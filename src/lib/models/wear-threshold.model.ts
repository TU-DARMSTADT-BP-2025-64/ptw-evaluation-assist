import { DatabaseModel } from './database.model';

export class WearThresholdDatabaseModel extends DatabaseModel {
    public label: string = '';
}

export enum WearThresholdType {
    OpticalError = 'OpticalError',
    FunctionalError = 'FunctionalError',

}