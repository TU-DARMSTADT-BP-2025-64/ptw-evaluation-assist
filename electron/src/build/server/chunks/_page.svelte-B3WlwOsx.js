import { ad as head, x as pop, v as push } from './exports-nrxFiPmG.js';
import { H as HeaderService, B as Button } from './Content-C6Tb3HUF.js';
import { P as ProductTable } from './ProductTable-k1Qz2GRz.js';
import { C as CommonIcon } from './Svg-B0FOppr7.js';
import { g as goto } from './client-Dx9mIOam.js';
import './events-CxLtQAvh.js';
import './CommonLabel-KC9Kte7x.js';
import './Textfield-CwKIeuzn.js';
import './Option-pkJC_U-2.js';
import './IconButton-DRCYvsoJ.js';

function _page($$payload, $$props) {
  push();
  HeaderService.Instance.setTitle("Assistent");
  let { $$slots, $$events, ...props } = $$props;
  function startEvaluation(product) {
    goto(`/assistant/evaluate/${product.id}`);
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Assistent</title>`;
    $$payload2.out += `<meta name="description" content="PTW evaluation assist">`;
  });
  $$payload.out += `<section class="page svelte-1bypkjh"><div class="back-button svelte-1bypkjh">`;
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
  $$payload.out += `<!----></div> <div class="product-table svelte-1bypkjh">`;
  ProductTable($$payload, {
    products: props.data.products,
    onProductClicked: (product) => startEvaluation(product)
  });
  $$payload.out += `<!----></div></section>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B3WlwOsx.js.map
