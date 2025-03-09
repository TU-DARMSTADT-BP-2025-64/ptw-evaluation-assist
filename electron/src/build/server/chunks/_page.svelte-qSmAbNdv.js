import { ad as head, x as pop, v as push } from './exports-nrxFiPmG.js';
import { H as HeaderService, B as Button } from './Content-C6Tb3HUF.js';
import { C as CommonLabel } from './CommonLabel-KC9Kte7x.js';
import { C as CommonIcon } from './Svg-B0FOppr7.js';
import { g as goto } from './client-Dx9mIOam.js';
import { P as ProductTable } from './ProductTable-k1Qz2GRz.js';
import { S as Snackbar, A as Actions } from './Actions2-g5nnxboW.js';
import { I as IconButton } from './IconButton-DRCYvsoJ.js';
import './events-CxLtQAvh.js';
import './Textfield-CwKIeuzn.js';
import './Option-pkJC_U-2.js';

function _page($$payload, $$props) {
  push();
  HeaderService.Instance.setTitle("Konfiguration");
  let { $$slots, $$events, ...props } = $$props;
  let products = props.data.products;
  let fileInput = null;
  function editProduct(product) {
    goto(`/configuration/${product.id}`);
  }
  function deleteProduct(product) {
    fetch(`api/product/${product.id}`, { method: "DELETE" });
    products = products.filter((p) => p.id !== product.id);
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Konfiguration</title>`;
    $$payload2.out += `<meta name="description" content="PTW evaluation assist">`;
  });
  $$payload.out += `<section class="page svelte-jsu6p4"><div class="back-button svelte-jsu6p4">`;
  Button($$payload, {
    onclick: () => goto(),
    children: ($$payload2) => {
      CommonIcon($$payload2, {
        class: "material-icons",
        children: ($$payload3) => {
          $$payload3.out += `<!---->arrow_back`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <span>Zurück</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <div class="product-table svelte-jsu6p4">`;
  ProductTable($$payload, {
    products,
    onProductClicked: (product) => editProduct(product),
    showDelete: true,
    onProductDelete: (product) => deleteProduct(product)
  });
  $$payload.out += `<!----></div> <div class="product-action-buttons svelte-jsu6p4">`;
  Button($$payload, {
    id: "add-product-button",
    variant: "raised",
    color: "primary",
    onclick: () => goto(),
    children: ($$payload2) => {
      CommonIcon($$payload2, {
        class: "material-icons",
        children: ($$payload3) => {
          $$payload3.out += `<!---->add`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <span>Produkt hinzufügen</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Button($$payload, {
    id: "import-product-button",
    variant: "raised",
    color: "secondary",
    onclick: () => fileInput?.click(),
    children: ($$payload2) => {
      CommonIcon($$payload2, {
        class: "material-icons",
        children: ($$payload3) => {
          $$payload3.out += `<!---->file_upload`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <span>Produkt importieren</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Button($$payload, {
    id: "categories-button",
    variant: "raised",
    color: "secondary",
    onclick: () => goto(),
    children: ($$payload2) => {
      CommonIcon($$payload2, {
        class: "material-icons",
        children: ($$payload3) => {
          $$payload3.out += `<!---->list`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <span>Kategorien editieren</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <input style="display: none" type="file" accept=".xlsm"></div></section> `;
  Snackbar($$payload, {
    class: "snackbar-success",
    children: ($$payload2) => {
      CommonLabel($$payload2, {
        class: "snackbar-label",
        children: ($$payload3) => {
          $$payload3.out += `<!---->Erfolg`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Actions($$payload2, {
        children: ($$payload3) => {
          IconButton($$payload3, {
            class: "material-icons",
            title: "Dismiss",
            children: ($$payload4) => {
              $$payload4.out += `<!---->close`;
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Snackbar($$payload, {
    class: "snackbar-error",
    children: ($$payload2) => {
      CommonLabel($$payload2, {
        class: "snackbar-label",
        children: ($$payload3) => {
          $$payload3.out += `<!---->Fehler`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Actions($$payload2, {
        children: ($$payload3) => {
          IconButton($$payload3, {
            class: "material-icons",
            title: "Dismiss",
            children: ($$payload4) => {
              $$payload4.out += `<!---->close`;
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-qSmAbNdv.js.map
