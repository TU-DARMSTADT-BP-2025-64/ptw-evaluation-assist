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

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B3WlwOsx.js')).default;
const server_id = "src/routes/assistant/+page.server.ts";
const imports = ["_app/immutable/nodes/3.DAbEO6HE.js","_app/immutable/chunks/DCngfxLn.js","_app/immutable/chunks/CVfhQmyV.js","_app/immutable/chunks/DnoWaJoF.js","_app/immutable/chunks/C_ugDeei.js","_app/immutable/chunks/mPLQjtID.js","_app/immutable/chunks/DUkwnNdo.js","_app/immutable/chunks/DM5WVeDA.js","_app/immutable/chunks/CD-IGXGf.js","_app/immutable/chunks/CgwyEeoE.js","_app/immutable/chunks/LjMNT6vF.js","_app/immutable/chunks/Df8iNtN6.js","_app/immutable/chunks/CQAoikBL.js","_app/immutable/chunks/a2mPvBUy.js"];
const stylesheets = ["_app/immutable/assets/3.CduUSm5t.css","_app/immutable/assets/ProductTable.CXPmA_U4.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3---H43e1q.js.map
