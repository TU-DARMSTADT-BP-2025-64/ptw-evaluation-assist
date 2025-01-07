import {
	AssemblyComponentTreeViewModel,
	AssemblyComponentViewModel
} from '$lib/models/assembly-component.model';
import {
	AssemblyGroupTreeViewModel,
	AssemblyGroupViewModel
} from '$lib/models/assembly-group.model';
import { ProductTreeViewModel, ProductViewModel } from '$lib/models/product.model';
import {
	WearCriterionTreeViewModel,
	WearCriterionViewModel
} from '$lib/models/wear-criterion.model';
import {
	WearThresholdTreeViewModel,
	WearThresholdViewModel
} from '$lib/models/wear-threshold.model';

export type ProductTreeViewElements = {
	product: ProductViewModel;
	groups: AssemblyGroupViewModel[];
	components: AssemblyComponentViewModel[];
	wearCriteria: WearCriterionViewModel[];
	wearThresholds: WearThresholdViewModel[];
};

export function createProductTreeView(elements: ProductTreeViewElements): ProductTreeViewModel {
	const treeView = new ProductTreeViewModel();
	treeView.id = elements.product.id;
	treeView.name = elements.product.name;

	const assemblyGroups = elements.groups.filter((group) => !group.parentId);

	for (const assemblyGroup of assemblyGroups) {
		const assemblyGroupTreeView = buildAssemblyGroupTreeView(
			elements,
			elements.product,
			assemblyGroup
		);
		treeView.assemblyGroups.push(assemblyGroupTreeView);
	}

	return treeView;
}

export function getElementsFromProductTreeView(
	treeView: ProductTreeViewModel
): ProductTreeViewElements {
	const elements: ProductTreeViewElements = {
		product: new ProductViewModel({ id: treeView.id, name: treeView.name }),
		groups: [],
		components: [],
		wearCriteria: [],
		wearThresholds: []
	};

	for (const assemblyGroup of treeView.assemblyGroups) {
		getElementsFromAssemblyGroupTreeView(elements, assemblyGroup);
	}

	return elements;
}

function buildAssemblyGroupTreeView(
	elements: ProductTreeViewElements,
	parent: ProductViewModel | AssemblyGroupTreeViewModel,
	assemblyGroup: AssemblyGroupViewModel
): AssemblyGroupTreeViewModel {
	const treeView = new AssemblyGroupTreeViewModel();
	treeView.id = assemblyGroup.id;
	treeView.name = assemblyGroup.name;

	const assemblyGroups = elements.groups.filter((group) => group.parentId === assemblyGroup.id);
	const assemblyComponents = elements.components.filter(
		(component) => component.assemblyGroupId === assemblyGroup.id
	);

	for (const assemblyGroup of assemblyGroups) {
		const assemblyGroupTreeView = buildAssemblyGroupTreeView(elements, treeView, assemblyGroup);
		treeView.children.push(assemblyGroupTreeView);
	}

	for (const assemblyComponent of assemblyComponents) {
		const assemblyComponentTreeView = buildAssemblyComponentTreeView(
			elements,
			treeView,
			assemblyComponent
		);
		treeView.children.push(assemblyComponentTreeView);
	}

	return treeView;
}

function buildAssemblyComponentTreeView(
	elements: ProductTreeViewElements,
	parent: AssemblyGroupTreeViewModel,
	assemblyComponent: AssemblyComponentViewModel
): AssemblyComponentTreeViewModel {
	const treeView = new AssemblyComponentTreeViewModel();
	treeView.id = assemblyComponent.id;
	treeView.name = assemblyComponent.name;
	treeView.parent = parent;

	const wearCriteria = elements.wearCriteria.filter(
		(wearCriterion) => wearCriterion.componentId === assemblyComponent.id
	);

	for (const wearCriterion of wearCriteria) {
		const wearCriterionTreeView = buildWearCriterionTreeView(elements, treeView, wearCriterion);
		treeView.wearCriteria.push(wearCriterionTreeView);
	}

	return treeView;
}

function buildWearCriterionTreeView(
	elements: ProductTreeViewElements,
	parent: AssemblyComponentTreeViewModel,
	wearCriterion: WearCriterionViewModel
): WearCriterionTreeViewModel {
	const treeView = new WearCriterionTreeViewModel();
	treeView.id = wearCriterion.id;
	treeView.label = wearCriterion.label;
	treeView.component = parent;

	const wearThresholds = elements.wearThresholds.filter(
		(threshold) => threshold.criterionId === wearCriterion.id
	);

	for (const wearThreshold of wearThresholds) {
		const wearThresholdTreeView = buildWearThresholdTreeView(elements, treeView, wearThreshold);
		treeView.wearThresholds.push(wearThresholdTreeView);
	}

	return treeView;
}

function buildWearThresholdTreeView(
	elements: ProductTreeViewElements,
	parent: WearCriterionTreeViewModel,
	wearThreshold: WearThresholdViewModel
): WearThresholdTreeViewModel {
	const treeView = new WearThresholdTreeViewModel();
	treeView.id = wearThreshold.id;
	treeView.label = wearThreshold.label;
	treeView.type = wearThreshold.type;
	treeView.fixStrategy = wearThreshold.fixStrategy;
	treeView.measures = wearThreshold.measures;
	treeView.criterion = parent;
	return treeView;
}

function getElementsFromAssemblyGroupTreeView(
	elements: ProductTreeViewElements,
	treeView: AssemblyGroupTreeViewModel
) {
	const group = new AssemblyGroupViewModel({
		id: treeView.id,
		name: treeView.name,
		productId: elements.product.id,
        parentId: treeView.parent instanceof AssemblyGroupTreeViewModel ? treeView.parent?.id : undefined
	});

	elements.groups.push(group);

	for (const child of treeView.children) {
		if (child.type === 'assembly-group') {
			getElementsFromAssemblyGroupTreeView(elements, child as AssemblyGroupTreeViewModel);
		} else {
			getElementsFromAssemblyComponentTreeView(elements, child as AssemblyComponentTreeViewModel);
		}
	}
}

function getElementsFromAssemblyComponentTreeView(
	elements: ProductTreeViewElements,
	treeView: AssemblyComponentTreeViewModel
) {
	const component = new AssemblyComponentViewModel({
		id: treeView.id,
		name: treeView.name,
		assemblyGroupId: treeView.parent!.id,
        productId: elements.product.id,
        machineElementCategory: treeView.machineElementCategory,
        machineElement: treeView.machineElement
	});

	elements.components.push(component);

	for (const child of treeView.wearCriteria) {
		getElementsFromWearCriterionTreeView(elements, child);
	}
}

function getElementsFromWearCriterionTreeView(
    elements: ProductTreeViewElements,
    treeView: WearCriterionTreeViewModel
) {
    const wearCriterion = new WearCriterionViewModel({
        id: treeView.id,
        productId: elements.product.id,
        componentId: treeView.component!.id,
        label: treeView.label
    });

	console.log('Store WearCriterion', wearCriterion);

    elements.wearCriteria.push(wearCriterion);

    for (const child of treeView.wearThresholds) {
        getElementsFromWearThresholdTreeView(elements, child);
    }
}

function getElementsFromWearThresholdTreeView(
    elements: ProductTreeViewElements,
    treeView: WearThresholdTreeViewModel
) {
    const wearThreshold = new WearThresholdViewModel({
        id: treeView.id,
        productId: elements.product.id,
        criterionId: treeView.criterion!.id,
        label: treeView.label,
        type: treeView.type,
        fixStrategy: treeView.fixStrategy,
        measures: treeView.measures
    });

    elements.wearThresholds.push(wearThreshold);
}
