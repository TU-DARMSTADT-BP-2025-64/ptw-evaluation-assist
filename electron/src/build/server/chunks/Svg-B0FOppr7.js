import { v as push, ac as getContext, ag as spread_props, ab as bind_props, x as pop, a9 as spread_attributes } from './exports-nrxFiPmG.js';
import { c as classMap, S as SmuiElement } from './Content-C6Tb3HUF.js';

function CommonIcon($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    on = false,
    component: MyComponent = SmuiElement,
    tag = "i",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  const svg = tag === "svg" || MyComponent === Svg;
  const context = getContext("SMUI:icon:context");
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
        "mdc-button__icon": context === "button",
        "mdc-fab__icon": context === "fab",
        "mdc-icon-button__icon": context === "icon-button",
        "mdc-icon-button__icon--on": context === "icon-button" && on,
        "mdc-tab__icon": context === "tab",
        "mdc-banner__icon": context === "banner",
        "mdc-segmented-button__icon": context === "segmented-button"
      }),
      "aria-hidden": "true"
    },
    svg ? { focusable: "false", tabindex: "-1" } : {},
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
function Svg($$payload, $$props) {
  push();
  if (console && console.warn) {
    console.warn('The @smui/common Svg component is deprecated. You can use `tag="svg"` now.');
  }
  let {
    use = [],
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  function getElement() {
    return element;
  }
  $$payload.out += `<svg${spread_attributes({ ...restProps }, undefined, undefined, 3)}>`;
  children?.($$payload);
  $$payload.out += `<!----></svg>`;
  bind_props($$props, { getElement });
  pop();
}

export { CommonIcon as C };
//# sourceMappingURL=Svg-B0FOppr7.js.map
