import { DatabaseModel } from './database.model';
import { v4 as uuidv4 } from 'uuid';

export class MachineElementCategoryDatabaseModel extends DatabaseModel {
    public name: string = '';
}

export class MachineElementCategoryViewModel {
    public id: string = uuidv4();
    public name: string = '';

    constructor(options: Partial<MachineElementCategoryViewModel> = {}) {
        Object.assign(this, options);
    }

    static fromDatabaseModel(databaseModel: MachineElementCategoryDatabaseModel) {
        if (!databaseModel) {
            return null;
        }

        return {
            id: databaseModel.id,
            name: databaseModel.name
        };
    }

    static toDatabaseModel(viewModel: MachineElementCategoryViewModel): MachineElementCategoryDatabaseModel {
        return {
            id: viewModel.id,
            name: viewModel.name
        };
    }
}



