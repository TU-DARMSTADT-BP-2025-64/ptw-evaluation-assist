import type { AssemblyComponentTreeViewModel } from './assembly-component.model';
import { DatabaseModel } from './database.model';
import type { ProductTreeViewModel } from './product.model';

export class AssemblyGroupDatabaseModel extends DatabaseModel {
	name: string | undefined;
	productId: string | undefined;
	parentId: string | undefined;
}


export class AssemblyGroupTreeViewModel {
	id: number | undefined;
	type: string = 'assembly-group';
	name: string = '';
	parent : AssemblyGroupTreeViewModel | ProductTreeViewModel | undefined;
	children: (AssemblyGroupTreeViewModel | AssemblyComponentTreeViewModel)[];

	constructor() {
		this.children = [];
	}
}