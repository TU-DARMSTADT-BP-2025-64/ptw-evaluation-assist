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

const load = async () => {
  const products = Repository.Instance.getProducts();
  return { products };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-LFTntx78.js')).default;
const server_id = "src/routes/assistant/product-selection/+page.server.ts";
const imports = ["_app/immutable/nodes/5.HCmui9mu.js","_app/immutable/chunks/DCngfxLn.js","_app/immutable/chunks/CVfhQmyV.js","_app/immutable/chunks/C2CtP4Bd.js","_app/immutable/chunks/ynBCf6fS.js","_app/immutable/chunks/DUkwnNdo.js","_app/immutable/chunks/CT6tQU6f.js","_app/immutable/chunks/a2mPvBUy.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-DfvVBv39.js.map
