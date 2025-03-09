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
  const products = Repository.Instance.getProducts().sort((a, b) => a.createdAt - b.createdAt);
  console.log("GetProducts", products);
  return { products };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-qSmAbNdv.js')).default;
const server_id = "src/routes/configuration/+page.server.ts";
const imports = ["_app/immutable/nodes/6.ByToBKNN.js","_app/immutable/chunks/DCngfxLn.js","_app/immutable/chunks/CVfhQmyV.js","_app/immutable/chunks/DnoWaJoF.js","_app/immutable/chunks/mPLQjtID.js","_app/immutable/chunks/DUkwnNdo.js","_app/immutable/chunks/C_ugDeei.js","_app/immutable/chunks/CgwyEeoE.js","_app/immutable/chunks/LjMNT6vF.js","_app/immutable/chunks/a2mPvBUy.js","_app/immutable/chunks/DM5WVeDA.js","_app/immutable/chunks/CD-IGXGf.js","_app/immutable/chunks/Df8iNtN6.js","_app/immutable/chunks/CQAoikBL.js","_app/immutable/chunks/DT3gzcfM.js","_app/immutable/chunks/C6aID195.js","_app/immutable/chunks/UKgtUhsv.js"];
const stylesheets = ["_app/immutable/assets/6.DmBQnHwJ.css","_app/immutable/assets/ProductTable.CXPmA_U4.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-2A4m618A.js.map
