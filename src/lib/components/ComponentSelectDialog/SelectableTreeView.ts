/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssemblyComponentTreeViewModel } from '$lib/models/assembly-component.model';
import { AssemblyGroupTreeViewModel } from '$lib/models/assembly-group.model';
import { ProductTreeViewModel } from '$lib/models/product.model';

export class EvaluatedProductTreeViewModel extends ProductTreeViewModel  {
    public override assemblyGroups: EvaluatedAssemblyGroupTreeViewModel[]  = [];

    constructor(options: Partial<EvaluatedProductTreeViewModel> = {}) {
        super(options);
    }
}

export class EvaluatedAssemblyGroupTreeViewModel extends AssemblyGroupTreeViewModel  {
    public override children: (EvaluatedAssemblyGroupTreeViewModel | EvaluatedAssemblyComponentTreeViewModel)[] = [];
    public evaluate: boolean = true;
    constructor(options: Partial<EvaluatedAssemblyGroupTreeViewModel> = {}) {
        super(options);
        this.evaluate = options.evaluate ?? true;
    }
};

export class EvaluatedAssemblyComponentTreeViewModel extends AssemblyComponentTreeViewModel {
	public evaluate: boolean = true;
    public finishedEvaluation: boolean = false;

    constructor(options: Partial<EvaluatedAssemblyComponentTreeViewModel> = {}) {
        super(options);
        this.evaluate = options.evaluate ?? true;
        this.finishedEvaluation = options.finishedEvaluation ?? false;
    }
};


export function createEvaluatedProductTreeView(productTreeView: ProductTreeViewModel): EvaluatedProductTreeViewModel {
    const selectableProductTreeView = productTreeView as EvaluatedProductTreeViewModel;
    
    productTreeView.assemblyGroups.forEach((assemblyGroup) => {
        convertToEvaluatedAssemblyGroupTreeView(assemblyGroup as EvaluatedAssemblyGroupTreeViewModel);
    });
        
    return selectableProductTreeView;
}

function convertToEvaluatedAssemblyGroupTreeView(assemblyGroupTreeViewElement: EvaluatedAssemblyGroupTreeViewModel): void {
    assemblyGroupTreeViewElement.evaluate = true;

    assemblyGroupTreeViewElement.children.forEach((child) => {
        if (child.type === 'assembly-group') {
            convertToEvaluatedAssemblyGroupTreeView(child as EvaluatedAssemblyGroupTreeViewModel);
        } else {
            const assemblyComponentTreeViewElement = child as EvaluatedAssemblyComponentTreeViewModel;
            assemblyComponentTreeViewElement.evaluate = true;
        }
    });
}

export function getEvaluatedComponents(productTreeView: EvaluatedProductTreeViewModel): EvaluatedAssemblyComponentTreeViewModel[] {
    const evaluatedComponents: EvaluatedAssemblyComponentTreeViewModel[] = [];
    productTreeView.assemblyGroups.forEach((assemblyGroup) => {
        getEvaluatedComponentsFromAssemblyGroup(assemblyGroup, evaluatedComponents);
    });
    return evaluatedComponents;
}

function getEvaluatedComponentsFromAssemblyGroup(assemblyGroup: EvaluatedAssemblyGroupTreeViewModel, evaluatedComponents: EvaluatedAssemblyComponentTreeViewModel[]): void {
    assemblyGroup.children.forEach((child) => {
        if (child.type === 'assembly-group') {
            getEvaluatedComponentsFromAssemblyGroup(child as EvaluatedAssemblyGroupTreeViewModel, evaluatedComponents);
        } else {
            const assemblyComponentTreeViewElement = child as EvaluatedAssemblyComponentTreeViewModel;
            if (assemblyComponentTreeViewElement.evaluate) {
                evaluatedComponents.push(assemblyComponentTreeViewElement);
            }
        }
    });
}