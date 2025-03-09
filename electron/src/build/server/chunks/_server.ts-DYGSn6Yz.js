import { R as Repository } from './repository-DsW9d6WW.js';
import './product.model-CtjXPvr8.js';
import 'uuid';
import 'bcrypt';
import 'better-sqlite3';
import './index-DK8hzxr2.js';
import 'node:path';
import 'node:os';
import 'node:process';
import 'dotenv';

async function DELETE({ params }) {
  console.log("DeleteProduct", params);
  const repository = Repository.Instance;
  const result = repository.deleteProduct(params.id);
  return new Response(JSON.stringify(result));
}
async function GET({ params, url }) {
  console.log("GetProduct", params);
  const repository = Repository.Instance;
  const result = repository.getProduct(params.id);
  if (!result) {
    return new Response(null, { status: 404 });
  }
  const asTreeView = url.searchParams.get("asTreeView") === "true";
  if (asTreeView) {
    const treeViewElements = getAllTreeViewElements(repository, result);
    return new Response(JSON.stringify(treeViewElements));
  } else {
    return new Response(JSON.stringify(result));
  }
}
async function PUT({ params, request, url }) {
  const repository = Repository.Instance;
  const asTreeView = url.searchParams.get("asTreeView") === "true";
  if (asTreeView) {
    const existingProduct = repository.getProduct(params.id);
    if (existingProduct) {
      repository.deleteProduct(params.id);
    }
    const productElements = await request.json();
    if (!existingProduct) {
      productElements.product.createdAt = Date.now();
    }
    const newProduct = repository.addProduct(productElements.product);
    const resultElements = {
      product: newProduct,
      groups: [],
      components: [],
      wearCriteria: [],
      wearThresholds: [],
      strategies: []
    };
    for (const group of productElements.groups) {
      resultElements.groups.push(repository.addAssemblyGroup(group));
    }
    for (const component of productElements.components) {
      resultElements.components.push(repository.addAssemblyComponent(component));
    }
    for (const criterion of productElements.wearCriteria) {
      resultElements.wearCriteria.push(repository.addWearCriterion(criterion));
    }
    for (const threshold of productElements.wearThresholds) {
      resultElements.wearThresholds.push(repository.addWearThreshold(threshold));
    }
    for (const strategy of productElements.strategies) {
      resultElements.strategies.push(repository.addThresholdStrategy(strategy));
    }
    return new Response(JSON.stringify(resultElements));
  } else {
    const product = await request.json();
    const result = repository.addProduct(product);
    return new Response(JSON.stringify(result));
  }
}
function getAllTreeViewElements(repository, product) {
  const groups = repository.getAssemblyGroups(product.id);
  const components = repository.getAssemblyComponents(product.id);
  const wearCriteria = repository.getWearCriteria(product.id);
  const wearThresholds = repository.getWearThresholds(product.id);
  const strategies = repository.getThresholdStrategies(product.id);
  return {
    product,
    groups,
    components,
    wearCriteria,
    wearThresholds,
    strategies
  };
}

export { DELETE, GET, PUT };
//# sourceMappingURL=_server.ts-DYGSn6Yz.js.map
