export class ProductTreeViewModel {
	id: number | null = 0;
	name: string = '';
	assemblyGroups: AssemblyGroupTreeViewModel[] = [];
	constructor() {
		this.assemblyGroups = [];
	}
}

export class AssemblyGroupTreeViewModel {
	id: number | null = 0;
	name: string = '';
	parent: AssemblyGroupTreeViewModel | undefined;
	children: (AssemblyGroupTreeViewModel | AssemblyComponentTreeViewModel)[] = [];
	assemblyGroups: AssemblyGroupTreeViewModel[] = [];
	addChild(child: AssemblyGroupTreeViewModel | AssemblyComponentTreeViewModel) {
		this.children.push(child);
	}
}

export class AssemblyComponentTreeViewModel {
	id: number | null = 0;
	name: string = '';
	parent: AssemblyGroupTreeViewModel | undefined;
}

const product_name = new ProductTreeViewModel();
const baugruppen = new AssemblyGroupTreeViewModel();