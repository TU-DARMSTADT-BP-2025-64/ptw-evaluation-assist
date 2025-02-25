import { DatabaseModel } from './database.model';
import { v4 as uuidv4 } from 'uuid';

export class MachineElementDatabaseModel extends DatabaseModel {
	public name: string = '';
	public machineElementCategoryId: string = '';
}

export class MachineElementViewModel {
	public id: string = uuidv4();
	public name: string = '';
	public machineElementCategoryId: string = '';

	constructor(options: Partial<MachineElementViewModel> = {}) {
		Object.assign(this, options);
	}

	static fromDatabaseModel(databaseModel: MachineElementDatabaseModel) {
		if (!databaseModel) {
			return null;
		}

		return {
			id: databaseModel.id,
			name: databaseModel.name,
			machineElementCategoryId: databaseModel.machineElementCategoryId
		};
	}

	static toDatabaseModel(viewModel: MachineElementViewModel): MachineElementDatabaseModel {
		return {
			id: viewModel.id,
			name: viewModel.name,
			machineElementCategoryId: viewModel.machineElementCategoryId
		};
	}
}