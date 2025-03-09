import { c as createCategoriesTreeView } from './CategoriesTreeViewUtil.svelte-CzM3UK9J.js';
import './machine-element.model-Bo59uC8d.js';
import 'uuid';

const ssr = false;
const prerender = false;
const load = async () => {
  const categoryElementsResponse = await fetch("/api/categories", {
    method: "GET"
  });
  const categoryElements = await categoryElementsResponse.json();
  console.log("CategoryElements", categoryElements);
  const treeView = createCategoriesTreeView(categoryElements);
  console.log("TreeView", treeView);
  return {
    categoriesTreeView: treeView
  };
};

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  prerender: prerender,
  ssr: ssr
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BCDOsgb6.js')).default;
const universal_id = "src/routes/configuration/categories/+page.ts";
const imports = ["_app/immutable/nodes/7.DXHP7Skd.js","_app/immutable/chunks/TvSXW-OJ.js","_app/immutable/chunks/CVfhQmyV.js","_app/immutable/chunks/mPLQjtID.js","_app/immutable/chunks/DUkwnNdo.js","_app/immutable/chunks/C6aID195.js","_app/immutable/chunks/DCngfxLn.js","_app/immutable/chunks/DnoWaJoF.js","_app/immutable/chunks/CD-IGXGf.js","_app/immutable/chunks/C_ugDeei.js","_app/immutable/chunks/LjMNT6vF.js","_app/immutable/chunks/C2ui7u_O.js","_app/immutable/chunks/Df8iNtN6.js","_app/immutable/chunks/a2mPvBUy.js"];
const stylesheets = ["_app/immutable/assets/7.BuE0_1F0.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=7-DwB5V-dZ.js.map
