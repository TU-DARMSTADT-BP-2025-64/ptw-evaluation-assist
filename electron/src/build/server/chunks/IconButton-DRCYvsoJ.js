import { v as push, ac as getContext, w as setContext, ag as spread_props, ab as bind_props, x as pop } from './exports-nrxFiPmG.js';
import { o as onDestroy, R as Ripple, c as classMap, d as dispatch, S as SmuiElement } from './Content-C6Tb3HUF.js';

function IconButton($$payload, $$props) {
  push();
  let uninitializedValue = () => {
  };
  function isUninitializedValue(value) {
    return value === uninitializedValue;
  }
  let {
    use = [],
    class: className = "",
    style = "",
    ripple = true,
    color,
    toggle = false,
    pressed = uninitializedValue,
    ariaLabelOn,
    ariaLabelOff,
    touch = false,
    displayFlex = true,
    size = "normal",
    href,
    action,
    component: MyComponent = SmuiElement,
    tag = href == null ? "button" : "a",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let internalClasses = {};
  let internalStyles = {};
  let internalAttrs = {};
  let context = getContext("SMUI:icon-button:context");
  let ariaDescribedby = getContext("SMUI:icon-button:aria-describedby");
  const actionProp = (() => {
    if (context === "data-table:pagination") {
      switch (action) {
        case "first-page":
          return { "data-first-page": "true" };
        case "prev-page":
          return { "data-prev-page": "true" };
        case "next-page":
          return { "data-next-page": "true" };
        case "last-page":
          return { "data-last-page": "true" };
        default:
          return { "data-action": "true" };
      }
    } else if (context === "dialog:header" || context === "dialog:sheet") {
      return { "data-mdc-dialog-action": action };
    } else {
      return { action };
    }
  })();
  !!restProps.disabled;
  setContext("SMUI:icon:context", "icon-button");
  onDestroy(() => {
  });
  function addClass(className2) {
    if (!internalClasses[className2]) {
      internalClasses[className2] = true;
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      internalClasses[className2] = false;
    }
  }
  function addStyle(name, value) {
    if (internalStyles[name] != value) {
      if (value === "" || value == null) {
        delete internalStyles[name];
      } else {
        internalStyles[name] = value;
      }
    }
  }
  function getElement() {
    return element.getElement();
  }
  $$payload.out += `<!---->`;
  MyComponent($$payload, spread_props([
    {
      tag,
      use: [
        [
          Ripple,
          {
            ripple,
            unbounded: true,
            color,
            disabled: !!restProps.disabled,
            addClass,
            removeClass,
            addStyle
          }
        ],
        ...use
      ],
      class: classMap({
        [className]: true,
        "mdc-icon-button": true,
        "mdc-icon-button--on": !isUninitializedValue(pressed) && pressed,
        "mdc-icon-button--touch": touch,
        "mdc-icon-button--display-flex": displayFlex,
        "smui-icon-button--size-button": size === "button",
        "smui-icon-button--size-mini": size === "mini",
        "mdc-icon-button--reduced-size": size === "mini" || size === "button",
        "mdc-card__action": context === "card:action",
        "mdc-card__action--icon": context === "card:action",
        "mdc-top-app-bar__navigation-icon": context === "top-app-bar:navigation",
        "mdc-top-app-bar__action-item": context === "top-app-bar:action",
        "mdc-snackbar__dismiss": context === "snackbar:actions",
        "mdc-data-table__pagination-button": context === "data-table:pagination",
        "mdc-data-table__sort-icon-button": context === "data-table:sortable-header-cell",
        "mdc-dialog__close": (context === "dialog:header" || context === "dialog:sheet") && action === "close",
        ...internalClasses
      }),
      style: Object.entries(internalStyles).map(([name, value]) => `${name}: ${value};`).concat([style]).join(" "),
      "aria-pressed": !isUninitializedValue(pressed) ? pressed ? "true" : "false" : null,
      "aria-label": pressed ? ariaLabelOn : ariaLabelOff,
      "data-aria-label-on": ariaLabelOn,
      "data-aria-label-off": ariaLabelOff,
      "aria-describedby": ariaDescribedby,
      href
    },
    actionProp,
    internalAttrs,
    restProps,
    {
      onclick: (e) => {
        if (context === "top-app-bar:navigation") {
          dispatch(getElement(), "SMUITopAppBarIconButtonNav");
        }
        restProps.onclick?.(e);
      },
      children: ($$payload2) => {
        $$payload2.out += `<div class="mdc-icon-button__ripple"></div> `;
        children?.($$payload2);
        $$payload2.out += `<!---->`;
        if (touch) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="mdc-icon-button__touch"></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    }
  ]));
  $$payload.out += `<!---->`;
  bind_props($$props, { pressed, getElement });
  pop();
}

export { IconButton as I };
//# sourceMappingURL=IconButton-DRCYvsoJ.js.map
