import { M as MachineElementCategoryViewModel, a as MachineElementViewModel, b as MachineElementCriteriaViewModel } from './machine-element.model-Bo59uC8d.js';
import { v4 } from 'uuid';

class MachineElementCategoryTreeViewModel {
  id = v4();
  name = "";
  elements = [];
  constructor(options = {}) {
    Object.assign(this, options);
  }
}
class MachineElementTreeViewModel {
  id = v4();
  name = "";
  criteria = [];
  constructor(options = {}) {
    Object.assign(this, options);
  }
}
function createCategoriesTreeView(elements) {
  const treeViewCategories = [];
  const categoryIdMap = /* @__PURE__ */ new Map();
  elements.machineElementCategories.forEach((category) => {
    const treeViewCategory = new MachineElementCategoryTreeViewModel({ id: category.id, name: category.name });
    treeViewCategories.push(treeViewCategory);
    categoryIdMap.set(category.id, treeViewCategory);
  });
  elements.machineElements.forEach((element) => {
    const treeViewElement = new MachineElementTreeViewModel({
      id: element.id,
      name: element.name,
      criteria: elements.machineElementCriteria.filter((criterion) => criterion.machineElementId === element.id)
    });
    categoryIdMap.get(element.machineElementCategoryId).elements.push(treeViewElement);
  });
  return treeViewCategories;
}
function getElementsFromCategoriesTreeView(treeView) {
  const machineElementCategories = [];
  const machineElements = [];
  const machineElementCriteria = [];
  treeView.forEach((category) => {
    const machineElementCategory = new MachineElementCategoryViewModel({ id: category.id, name: category.name });
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
  return {
    machineElementCategories,
    machineElements,
    machineElementCriteria
  };
}

export { MachineElementCategoryTreeViewModel as M, MachineElementTreeViewModel as a, createCategoriesTreeView as c, getElementsFromCategoriesTreeView as g };
//# sourceMappingURL=CategoriesTreeViewUtil.svelte-CzM3UK9J.js.map
