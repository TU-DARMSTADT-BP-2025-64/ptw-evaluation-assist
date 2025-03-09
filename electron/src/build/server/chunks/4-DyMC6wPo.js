import { c as createProductTreeView } from './ProductTreeViewUtil-D5fgOrvk.js';
import 'uuid';
import './product.model-CtjXPvr8.js';
import './wear-threshold.model-BEv4SSMu.js';

const ssr = false;
const prerender = false;
const load = async ({ params }) => {
  console.log("Load", params, params.id);
  const productId = params.id;
  const response = await fetch("/api/product/" + productId + "?asTreeView=true", {
    method: "GET"
  });
  console.log("Response", response);
  if (!response.ok) {
    return {
      status: response.status,
      error: new Error(response.statusText)
    };
  }
  const productTreeViewElements = await response.json();
  console.log("ProductTreeViewElements", productTreeViewElements);
  const treeView = createProductTreeView(productTreeViewElements);
  return {
    id: productId,
    productTreeView: treeView
  };
};

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  prerender: prerender,
  ssr: ssr
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DjFJiUJD.js')).default;
const universal_id = "src/routes/assistant/evaluate/[id]/+page.ts";
const imports = ["_app/immutable/nodes/4.D2U82Xd3.js","_app/immutable/chunks/CccQXOJz.js","_app/immutable/chunks/DT3gzcfM.js","_app/immutable/chunks/C6aID195.js","_app/immutable/chunks/DCngfxLn.js","_app/immutable/chunks/CVfhQmyV.js","_app/immutable/chunks/mPLQjtID.js","_app/immutable/chunks/DUkwnNdo.js","_app/immutable/chunks/DnoWaJoF.js","_app/immutable/chunks/CD-IGXGf.js","_app/immutable/chunks/C_ugDeei.js","_app/immutable/chunks/a2mPvBUy.js","_app/immutable/chunks/LjMNT6vF.js","_app/immutable/chunks/C1FmrZbK.js"];
const stylesheets = ["_app/immutable/assets/4.BYlpN9j-.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=4-DyMC6wPo.js.map
