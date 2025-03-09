import { a6 as store_get, a5 as escape_html, a7 as unsubscribe_stores, x as pop, v as push } from './exports-nrxFiPmG.js';
import { p as page } from './stores-xMvLKFGn.js';
import './client-Dx9mIOam.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  const id = store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("id");
  const name = store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("name");
  $$payload.out += `<h1>Befundung von ID ${escape_html(id)}, ${escape_html(name)}</h1>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-LFTntx78.js.map
