import type { AssemblyComponentTreeViewModel } from './assembly-component.model';
import { DatabaseModel } from './database.model';
import type { ProductTreeViewModel } from './product.model';
import { v4 as uuidv4 } from 'uuid';

export class AssemblyGroupDatabaseModel extends DatabaseModel {
	name: string | undefined;
	productId: string | undefined;
	parentId: string | undefined;
}

export class AssemblyGroupViewModel {
	id: string = uuidv4();
	name: string = '';
	productId: string | undefined;
	parentId: string | undefined;

	constructor(options: Partial<AssemblyGroupViewModel> = {}) {
		Object.assign(this, options);
	}
}


export class AssemblyGroupTreeViewModel {
	id: string = uuidv4();
	type: string = 'assembly-group';
	name: string = '';
	parent : AssemblyGroupTreeViewModel | ProductTreeViewModel | undefined;
	children: (AssemblyGroupTreeViewModel | AssemblyComponentTreeViewModel)[] = [];

	constructor(options: Partial<AssemblyGroupTreeViewModel> = {}) {
		Object.assign(this, options);
	}
}