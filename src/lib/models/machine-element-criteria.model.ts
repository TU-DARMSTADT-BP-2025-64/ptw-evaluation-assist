import { DatabaseModel } from './database.model';
import { v4 as uuidv4 } from 'uuid';

export class MachineElementCriteriaDatabaseModel extends DatabaseModel {
    public name: string = '';
    public machineElementId: string = '';
}

export class MachineElementCriteriaViewModel {
    public id: string = uuidv4();
    public name: string = '';
    public machineElementId: string = '';

    constructor(options: Partial<MachineElementCriteriaViewModel> = {}) {
        Object.assign(this, options);
    }

    static fromDatabaseModel(databaseModel: MachineElementCriteriaDatabaseModel) {
        if (!databaseModel) {
            return null;
        }

        return {
            id: databaseModel.id,
            name: databaseModel.name,
            machineElementId: databaseModel.machineElementId
        };
    }

    static toDatabaseModel(viewModel: MachineElementCriteriaViewModel): MachineElementCriteriaDatabaseModel {
        return {
            id: viewModel.id,
            name: viewModel.name,
            machineElementId: viewModel.machineElementId
        };
    }
}