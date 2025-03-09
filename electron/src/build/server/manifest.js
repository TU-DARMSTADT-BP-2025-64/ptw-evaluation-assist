const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["PTW_BP_favicon.png","robots.txt","theme/dark/_smui-theme.scss","theme/smui-dark.css","theme/smui.css","theme/_smui-theme.scss","theme/_snackbar-style.scss"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".css":"text/css"},
	_: {
		client: {"start":"_app/immutable/entry/start.BO1qRC6J.js","app":"_app/immutable/entry/app.CXv-5pjF.js","imports":["_app/immutable/entry/start.BO1qRC6J.js","_app/immutable/chunks/a2mPvBUy.js","_app/immutable/chunks/CVfhQmyV.js","_app/immutable/entry/app.CXv-5pjF.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CVfhQmyV.js","_app/immutable/chunks/DnoWaJoF.js","_app/immutable/chunks/DCngfxLn.js","_app/immutable/chunks/mPLQjtID.js","_app/immutable/chunks/DUkwnNdo.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-BTqF1BDs.js')),
			__memo(() => import('./chunks/1-hu6jlMxr.js')),
			__memo(() => import('./chunks/2-DBdIWMDy.js')),
			__memo(() => import('./chunks/3---H43e1q.js')),
			__memo(() => import('./chunks/4-DyMC6wPo.js')),
			__memo(() => import('./chunks/5-DfvVBv39.js')),
			__memo(() => import('./chunks/6-2A4m618A.js')),
			__memo(() => import('./chunks/7-DwB5V-dZ.js')),
			__memo(() => import('./chunks/8-D8x-bilH.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/categories",
				pattern: /^\/api\/categories\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-B210fJKl.js'))
			},
			{
				id: "/api/change-password",
				pattern: /^\/api\/change-password\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CJ1ZDB9x.js'))
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DrrDW5PP.js'))
			},
			{
				id: "/api/logout",
				pattern: /^\/api\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DN4yG3df.js'))
			},
			{
				id: "/api/product",
				pattern: /^\/api\/product\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BLZEC6mL.js'))
			},
			{
				id: "/api/product/[id]",
				pattern: /^\/api\/product\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DYGSn6Yz.js'))
			},
			{
				id: "/assistant",
				pattern: /^\/assistant\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/assistant/evaluate/[id]",
				pattern: /^\/assistant\/evaluate\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/assistant/product-selection",
				pattern: /^\/assistant\/product-selection\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/configuration",
				pattern: /^\/configuration\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/configuration/categories",
				pattern: /^\/configuration\/categories\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/configuration/[id]",
				pattern: /^\/configuration\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
