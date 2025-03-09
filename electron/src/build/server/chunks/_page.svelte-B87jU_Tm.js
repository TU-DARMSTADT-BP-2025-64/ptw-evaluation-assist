import { a2 as copy_payload, a3 as assign_payload, x as pop, ad as head, v as push, ab as bind_props } from './exports-nrxFiPmG.js';
import { H as HeaderService, D as Dialog, T as Title, C as Content, B as Button } from './Content-C6Tb3HUF.js';
import { T as Textfield } from './Textfield-CwKIeuzn.js';
import { i as invalidateAll, g as goto } from './client-Dx9mIOam.js';
import './events-CxLtQAvh.js';

function ConfigurationLoginDialog($$payload, $$props) {
  push();
  let password = "";
  let invalidPassword = false;
  let { open = undefined } = $$props;
  async function login() {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password })
    });
    if (response.ok) {
      open = false;
      await invalidateAll();
      goto();
    } else {
      invalidPassword = true;
    }
  }
  function cancel() {
    open = false;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Dialog($$payload2, {
      class: "login-dialog",
      get open() {
        return open;
      },
      set open($$value) {
        open = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Title($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<span data-testid="dialog-title">Login Konfiguration</span>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Content($$payload3, {
          children: ($$payload4) => {
            Textfield($$payload4, {
              required: true,
              invalid: invalidPassword,
              style: "width: 100%;",
              onkeydown: (e) => e.key === "Enter" && login(),
              type: "password",
              label: "Password",
              get value() {
                return password;
              },
              set value($$value) {
                password = $$value;
                $$settled = false;
              }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <div class="actions svelte-1ryihsq">`;
        Button($$payload3, {
          class: "cancel-button",
          onclick: () => cancel(),
          children: ($$payload4) => {
            $$payload4.out += `<!---->Abbrechen`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Button($$payload3, {
          onclick: () => login(),
          children: ($$payload4) => {
            $$payload4.out += `<!---->Login`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----></div>`;
      },
      $$slots: { default: true }
    });
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { open });
  pop();
}
function _page($$payload, $$props) {
  push();
  let configurationLoginDialogOpen = false;
  HeaderService.Instance.setTitle("Startseite");
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Homepage</title>`;
      $$payload3.out += `<meta name="description" content="PTW evaluation assist">`;
    });
    $$payload2.out += `<section style="max-width: 60%; width: 100%;" class="svelte-13tvhf6"><a href="/assistant"><div class="assistant-button card-btn mdc-elevation--z2 svelte-13tvhf6"><div class="icon svelte-13tvhf6"><i class="material-icons svelte-13tvhf6">manage_search</i></div> <div class="label svelte-13tvhf6">Neuen Befund starten</div></div></a> <div class="configuration-button card-btn mdc-elevation--z2 svelte-13tvhf6" role="button" tabindex="0"><div class="icon svelte-13tvhf6"><i class="material-icons svelte-13tvhf6">settings</i></div> <div class="label svelte-13tvhf6">Konfiguration</div></div> `;
    ConfigurationLoginDialog($$payload2, {
      get open() {
        return configurationLoginDialogOpen;
      },
      set open($$value) {
        configurationLoginDialogOpen = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></section>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B87jU_Tm.js.map
