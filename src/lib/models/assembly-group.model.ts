import type { AssemblyComponentTreeViewModel } from './assembly-component.model';
import { DatabaseModel } from './database.model';

export class AssemblyGroupDatabaseModel extends DatabaseModel {
	name: string | undefined;
	productId: string | undefined;
	parentId: string | undefined;
}


export class AssemblyGroupTreeViewModel {
	id: string | undefined;
	name: string | undefined;
	parent : AssemblyGroupTreeViewModel | undefined;
	children: (AssemblyGroupTreeViewModel | AssemblyComponentTreeViewModel)[];

	constructor() {
		this.children = [];
	}
}