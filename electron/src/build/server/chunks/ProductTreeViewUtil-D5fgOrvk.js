import { v4 } from 'uuid';
import { P as ProductTreeViewModel, a as ProductViewModel } from './product.model-CtjXPvr8.js';
import { b as WearThresholdTreeViewModel, c as WearThresholdViewModel } from './wear-threshold.model-BEv4SSMu.js';

class AssemblyComponentViewModel {
  id = v4();
  productId;
  name = "";
  assemblyGroupId;
  machineElementCategory = "";
  machineElement = "";
  constructor(options = {}) {
    Object.assign(this, options);
  }
}
class AssemblyComponentTreeViewModel {
  id = v4();
  type = "assembly-component";
  parent;
  wearCriteria = [];
  name = "";
  machineElementCategory = "";
  machineElement = "";
  constructor(options = {}) {
    Object.assign(this, options);
  }
}
class AssemblyGroupViewModel {
  id = v4();
  name = "";
  productId;
  parentId;
  constructor(options = {}) {
    Object.assign(this, options);
  }
}
class AssemblyGroupTreeViewModel {
  id = v4();
  type = "assembly-group";
  name = "";
  parent;
  children = [];
  constructor(options = {}) {
    Object.assign(this, options);
  }
}
class WearCriterionViewModel {
  id = v4();
  componentId;
  productId;
  label = "";
  constructor(options = {}) {
    Object.assign(this, options);
  }
}
class WearCriterionTreeViewModel {
  id = v4();
  type = "wear-criterion";
  label = "";
  component;
  wearThresholds = [];
  constructor(options = {}) {
    Object.assign(this, options);
  }
}

class ThresholdStrategyViewModel {
  id = v4();
  productId;
  priority = 0;
  name = "";
  constructor(options = {}) {
    Object.assign(this, options);
  }
}
class ThresholdStrategyTreeViewModel {
  id = v4();
  product;
  priority = 0;
  name = "";
  constructor(options = {}) {
    Object.assign(this, options);
  }
}
function createProductTreeView(elements) {
  const treeView = new ProductTreeViewModel();
  treeView.id = elements.product.id;
  treeView.name = elements.product.name;
  treeView.createdAt = elements.product.createdAt;
  treeView.fixStrategies = elements.strategies.map(
    (strategy) => new ThresholdStrategyTreeViewModel({
      id: strategy.id,
      name: strategy.name,
      priority: strategy.priority,
      product: treeView
    })
  );
  const assemblyGroups = elements.groups.filter((group) => !group.parentId);
  for (const assemblyGroup of assemblyGroups) {
    const assemblyGroupTreeView = buildAssemblyGroupTreeView(
      elements,
      treeView,
      assemblyGroup
    );
    treeView.assemblyGroups.push(assemblyGroupTreeView);
  }
  return treeView;
}
function getElementsFromProductTreeView(treeView) {
  const elements = {
    product: new ProductViewModel({ id: treeView.id, name: treeView.name, createdAt: treeView.createdAt }),
    groups: [],
    components: [],
    wearCriteria: [],
    wearThresholds: [],
    strategies: getStrategiesFromProductTreeView(treeView)
  };
  for (const assemblyGroup of treeView.assemblyGroups) {
    getElementsFromAssemblyGroupTreeView(elements, assemblyGroup);
  }
  return elements;
}
function buildAssemblyGroupTreeView(elements, parent, assemblyGroup) {
  const treeView = new AssemblyGroupTreeViewModel();
  treeView.id = assemblyGroup.id;
  treeView.name = assemblyGroup.name;
  treeView.parent = parent;
  const assemblyGroups = elements.groups.filter((group) => group.parentId === assemblyGroup.id);
  const assemblyComponents = elements.components.filter(
    (component) => component.assemblyGroupId === assemblyGroup.id
  );
  for (const assemblyGroup2 of assemblyGroups) {
    const assemblyGroupTreeView = buildAssemblyGroupTreeView(elements, treeView, assemblyGroup2);
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
function buildAssemblyComponentTreeView(elements, parent, assemblyComponent) {
  const treeView = new AssemblyComponentTreeViewModel();
  treeView.id = assemblyComponent.id;
  treeView.name = assemblyComponent.name;
  treeView.machineElementCategory = assemblyComponent.machineElementCategory;
  treeView.machineElement = assemblyComponent.machineElement;
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
function buildWearCriterionTreeView(elements, parent, wearCriterion) {
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
function buildWearThresholdTreeView(elements, parent, wearThreshold) {
  const treeView = new WearThresholdTreeViewModel();
  treeView.id = wearThreshold.id;
  treeView.label = wearThreshold.label;
  treeView.type = wearThreshold.type;
  treeView.fixStrategy = wearThreshold.fixStrategy;
  treeView.measures = wearThreshold.measures;
  treeView.criterion = parent;
  treeView.image = wearThreshold.image;
  return treeView;
}
function getElementsFromAssemblyGroupTreeView(elements, treeView) {
  const group = new AssemblyGroupViewModel({
    id: treeView.id,
    name: treeView.name,
    productId: elements.product.id,
    parentId: treeView.parent instanceof AssemblyGroupTreeViewModel ? treeView.parent?.id : undefined
  });
  elements.groups.push(group);
  for (const child of treeView.children) {
    if (child.type === "assembly-group") {
      getElementsFromAssemblyGroupTreeView(elements, child);
    } else {
      getElementsFromAssemblyComponentTreeView(elements, child);
    }
  }
}
function getElementsFromAssemblyComponentTreeView(elements, treeView) {
  const component = new AssemblyComponentViewModel({
    id: treeView.id,
    name: treeView.name,
    assemblyGroupId: treeView.parent.id,
    productId: elements.product.id,
    machineElementCategory: treeView.machineElementCategory,
    machineElement: treeView.machineElement
  });
  elements.components.push(component);
  for (const child of treeView.wearCriteria) {
    getElementsFromWearCriterionTreeView(elements, child);
  }
}
function getElementsFromWearCriterionTreeView(elements, treeView) {
  const wearCriterion = new WearCriterionViewModel({
    id: treeView.id,
    productId: elements.product.id,
    componentId: treeView.component.id,
    label: treeView.label
  });
  console.log("Store WearCriterion", wearCriterion);
  elements.wearCriteria.push(wearCriterion);
  for (const child of treeView.wearThresholds) {
    getElementsFromWearThresholdTreeView(elements, child);
  }
}
function getElementsFromWearThresholdTreeView(elements, treeView) {
  const wearThreshold = new WearThresholdViewModel({
    id: treeView.id,
    productId: elements.product.id,
    criterionId: treeView.criterion.id,
    label: treeView.label,
    type: treeView.type,
    fixStrategy: treeView.fixStrategy,
    measures: treeView.measures,
    image: treeView.image
  });
  elements.wearThresholds.push(wearThreshold);
}
function getStrategiesFromProductTreeView(productTreeView) {
  return productTreeView.fixStrategies.map(
    (strategy) => new ThresholdStrategyViewModel({
      id: strategy.id,
      name: strategy.name,
      priority: strategy.priority,
      productId: productTreeView.id
    })
  );
}

export { AssemblyGroupTreeViewModel as A, WearCriterionTreeViewModel as W, AssemblyComponentTreeViewModel as a, createProductTreeView as c, getElementsFromProductTreeView as g };
//# sourceMappingURL=ProductTreeViewUtil-D5fgOrvk.js.map
