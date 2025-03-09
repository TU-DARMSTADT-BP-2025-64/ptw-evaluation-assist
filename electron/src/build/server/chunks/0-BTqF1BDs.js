const load = async ({ locals }) => {
  return {
    user: locals.user || null,
    isLoggedIn: locals.isLoggedIn || false
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-cGnNFqhC.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.DzUA0YPW.js","_app/immutable/chunks/DCngfxLn.js","_app/immutable/chunks/CVfhQmyV.js","_app/immutable/chunks/C_ugDeei.js","_app/immutable/chunks/mPLQjtID.js","_app/immutable/chunks/DUkwnNdo.js","_app/immutable/chunks/DnoWaJoF.js","_app/immutable/chunks/CD-IGXGf.js","_app/immutable/chunks/CgwyEeoE.js","_app/immutable/chunks/a2mPvBUy.js","_app/immutable/chunks/Df8iNtN6.js","_app/immutable/chunks/CT6tQU6f.js","_app/immutable/chunks/C2ui7u_O.js","_app/immutable/chunks/UKgtUhsv.js"];
const stylesheets = ["_app/immutable/assets/0.Du0TUwt8.css"];
const fonts = ["_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.B04YIrm4.woff2","_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.0xXfcOOq.woff","_app/immutable/assets/fira-mono-cyrillic-400-normal.36-45Uyg.woff2","_app/immutable/assets/fira-mono-cyrillic-400-normal.Dq7SlH2J.woff","_app/immutable/assets/fira-mono-greek-ext-400-normal.CsqI23CO.woff2","_app/immutable/assets/fira-mono-greek-ext-400-normal.BEhC8Nsh.woff","_app/immutable/assets/fira-mono-greek-400-normal.C3zng6O6.woff2","_app/immutable/assets/fira-mono-greek-400-normal.DUeQbRz0.woff","_app/immutable/assets/fira-mono-latin-ext-400-normal.D6XfiR-_.woff2","_app/immutable/assets/fira-mono-latin-ext-400-normal.lWlD_NAB.woff","_app/immutable/assets/fira-mono-latin-400-normal.DKjLVgQi.woff2","_app/immutable/assets/fira-mono-latin-400-normal.g4W12wf9.woff"];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-BTqF1BDs.js.map
