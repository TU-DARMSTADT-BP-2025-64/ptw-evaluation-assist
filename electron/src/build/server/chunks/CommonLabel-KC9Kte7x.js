import { v as push, ac as getContext, ag as spread_props, ab as bind_props, x as pop } from './exports-nrxFiPmG.js';
import { c as classMap, S as SmuiElement } from './Content-C6Tb3HUF.js';

function CommonLabel($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    component: MyComponent = SmuiElement,
    tag = "span",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  const context = getContext("SMUI:label:context");
  const tabindex = getContext("SMUI:label:tabindex");
  function getElement() {
    return element.getElement();
  }
  $$payload.out += `<!---->`;
  MyComponent($$payload, spread_props([
    {
      tag,
      use,
      class: classMap({
        [className]: true,
        "mdc-button__label": context === "button",
        "mdc-fab__label": context === "fab",
        "mdc-tab__text-label": context === "tab",
        "mdc-image-list__label": context === "image-list",
        "mdc-snackbar__label": context === "snackbar",
        "mdc-banner__text": context === "banner",
        "mdc-segmented-button__label": context === "segmented-button",
        "mdc-data-table__pagination-rows-per-page-label": context === "data-table:pagination",
        "mdc-data-table__header-cell-label": context === "data-table:sortable-header-cell"
      })
    },
    context === "snackbar" ? { "aria-atomic": "false" } : {},
    { tabindex },
    restProps,
    {
      children: ($$payload2) => {
        children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  $$payload.out += `<!---->`;
  bind_props($$props, { getElement });
  pop();
}

export { CommonLabel as C };
//# sourceMappingURL=CommonLabel-KC9Kte7x.js.map
