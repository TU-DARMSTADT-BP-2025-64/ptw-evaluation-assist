import { c as createProductTreeView } from './ProductTreeViewUtil-D5fgOrvk.js';
import { r as redirect } from './index2-DyoisQP2.js';
import { v4 } from 'uuid';
import { P as ProductTreeViewModel } from './product.model-CtjXPvr8.js';
import { c as createCategoriesTreeView } from './CategoriesTreeViewUtil.svelte-CzM3UK9J.js';
import './wear-threshold.model-BEv4SSMu.js';
import './machine-element.model-Bo59uC8d.js';

const ssr = false;
const prerender = false;
const load = async ({ params }) => {
  console.log("Load", params, params.id);
  const productId = params.id;
  if (productId === "add") {
    throw redirect(303, "/configuration/" + v4());
  }
  const productTreeViewResponse = await fetch("/api/product/" + productId + "?asTreeView=true", {
    method: "GET"
  });
  const categoriesResponse = await fetch("/api/categories", {
    method: "GET"
  });
  const categoryElements = await categoriesResponse.json();
  const categoriesTreeView = createCategoriesTreeView(categoryElements);
  console.log("Response", productTreeViewResponse);
  if (productTreeViewResponse.status === 404) {
    const productTreeViewModel = new ProductTreeViewModel({
      id: productId
    });
    productTreeViewModel.fixStrategies.push({
      id: v4(),
      name: "Reuse",
      priority: 0,
      product: productTreeViewModel
    });
    productTreeViewModel.fixStrategies.push({
      id: v4(),
      name: "Remanufacture",
      priority: 1,
      product: productTreeViewModel
    });
    productTreeViewModel.fixStrategies.push({
      id: v4(),
      name: "Recycle",
      priority: 2,
      product: productTreeViewModel
    });
    return {
      id: productId,
      productTreeView: productTreeViewModel,
      categoriesTreeView
    };
  }
  if (!productTreeViewResponse.ok) {
    return {
      status: productTreeViewResponse.status,
      error: new Error(productTreeViewResponse.statusText)
    };
  }
  const productTreeViewElements = await productTreeViewResponse.json();
  console.log("ProductTreeViewElements", productTreeViewElements);
  const treeView = createProductTreeView(productTreeViewElements);
  return {
    id: productId,
    productTreeView: treeView,
    categoriesTreeView
  };
};

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  prerender: prerender,
  ssr: ssr
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C65U8ghY.js')).default;
const universal_id = "src/routes/configuration/[id]/+page.ts";
const imports = ["_app/immutable/nodes/8.C_XNNcMP.js","_app/immutable/chunks/DT3gzcfM.js","_app/immutable/chunks/C6aID195.js","_app/immutable/chunks/a2mPvBUy.js","_app/immutable/chunks/CVfhQmyV.js","_app/immutable/chunks/TvSXW-OJ.js","_app/immutable/chunks/mPLQjtID.js","_app/immutable/chunks/DUkwnNdo.js","_app/immutable/chunks/DCngfxLn.js","_app/immutable/chunks/CD-IGXGf.js","_app/immutable/chunks/C_ugDeei.js","_app/immutable/chunks/DnoWaJoF.js","_app/immutable/chunks/Df8iNtN6.js","_app/immutable/chunks/C2ui7u_O.js","_app/immutable/chunks/LjMNT6vF.js","_app/immutable/chunks/CQAoikBL.js","_app/immutable/chunks/CgwyEeoE.js","_app/immutable/chunks/UKgtUhsv.js","_app/immutable/chunks/C2CtP4Bd.js"];
const stylesheets = ["_app/immutable/assets/8.CJmwGANY.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=8-D8x-bilH.js.map
