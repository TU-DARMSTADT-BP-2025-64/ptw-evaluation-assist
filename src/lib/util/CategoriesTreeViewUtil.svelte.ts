import {
	MachineElementCategoryViewModel
} from '$lib/models/machine-element-category.model';
import { MachineElementCriteriaViewModel } from '$lib/models/machine-element-criteria.model';
import {
	MachineElementViewModel
} from '$lib/models/machine-element.model';
import { v4 as uuidv4 } from 'uuid';

export type CategoriesTreeView = MachineElementCategoryTreeViewModel[];

export class MachineElementCategoryTreeViewModel {
    public id: string = $state(uuidv4());
    public name: string = $state('');
    public elements: MachineElementTreeViewModel[] = $state([]);

    constructor(options: Partial<MachineElementCategoryTreeViewModel> = {}) {
        Object.assign(this, options);
    }
}


export class MachineElementTreeViewModel {
	public id: string = $state(uuidv4());
	public name: string = $state('');
	public criteria: MachineElementCriteriaViewModel[] = $state([]);

	constructor(options: Partial<MachineElementTreeViewModel> = {}) {
		Object.assign(this, options);
	}
}



export type CategoriesTreeViewElements = {
	machineElementCategories: MachineElementCategoryViewModel[];
	machineElements: MachineElementViewModel[];
	machineElementCriteria: MachineElementCriteriaViewModel[];
};

export function createCategoriesTreeView(elements: CategoriesTreeViewElements): CategoriesTreeView {
	const treeViewCategories: MachineElementCategoryTreeViewModel[] = [];

	const categoryIdMap = new Map<string, MachineElementCategoryTreeViewModel>();

	elements.machineElementCategories.forEach((category) => {
		const treeViewCategory = new MachineElementCategoryTreeViewModel({
			id: category.id,
			name: category.name
		});
		treeViewCategories.push(treeViewCategory);
		categoryIdMap.set(category.id, treeViewCategory);
	});

	elements.machineElements.forEach((element) => {
		const treeViewElement = new MachineElementTreeViewModel({
			id: element.id,
			name: element.name,
			criteria: elements.machineElementCriteria.filter(
				(criterion) => criterion.machineElementId === element.id
			)
		});
		categoryIdMap.get(element.machineElementCategoryId)!.elements.push(treeViewElement);
	});

	return treeViewCategories;
}

export function getElementsFromCategoriesTreeView(treeView: CategoriesTreeView): CategoriesTreeViewElements {
    const machineElementCategories: MachineElementCategoryViewModel[] = [];
    const machineElements: MachineElementViewModel[] = [];
    const machineElementCriteria: MachineElementCriteriaViewModel[] = [];

    treeView.forEach((category) => {
        const machineElementCategory = new MachineElementCategoryViewModel({
            id: category.id,
            name: category.name
        });
        machineElementCategories.push(machineElementCategory);

        category.elements.forEach((element) => {
            const machineElement = new MachineElementViewModel({
                id: element.id,
                name: element.name,
                machineElementCategoryId: category.id
            });
            machineElements.push(machineElement);

            element.criteria.forEach((criterion) => {
                const machineElementCriterion = new MachineElementCriteriaViewModel({
                    id: criterion.id,
                    name: criterion.name,
                    machineElementId: element.id
                });
                machineElementCriteria.push(machineElementCriterion);
            });
        });
    });

    return { machineElementCategories, machineElements, machineElementCriteria };
}
