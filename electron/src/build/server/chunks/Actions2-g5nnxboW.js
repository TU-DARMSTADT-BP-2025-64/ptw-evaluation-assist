import { w as setContext, a9 as spread_attributes, aa as clsx, ab as bind_props, x as pop, v as push, ag as spread_props } from './exports-nrxFiPmG.js';
import { c as classMap, e as exclude, p as prefixFilter, a as ClassAdder } from './Content-C6Tb3HUF.js';

let waiting = Promise.resolve();
function Snackbar($$payload, $$props) {
  push();
  let uninitializedValue = () => {
  };
  let {
    use = [],
    class: className = "",
    variant,
    leading = false,
    timeoutMs = 5e3,
    closeOnEscape = true,
    labelText = uninitializedValue,
    actionButtonText = uninitializedValue,
    surface$use = [],
    surface$class = "",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let instance = undefined;
  let internalClasses = {};
  let closePromise = new Promise((resolve) => resolve);
  setContext("SMUI:label:context", "snackbar");
  function open() {
    waiting = waiting.then(() => {
      return closePromise;
    });
  }
  function forceOpen() {
    return instance?.open();
  }
  function close(reason) {
    return instance?.close(reason);
  }
  function isOpen() {
    {
      throw new Error("Instance is undefined.");
    }
  }
  function getLabelElement() {
    return getElement().querySelector(".mdc-snackbar__label") ?? document.createElement("div");
  }
  function getActionButtonElement() {
    return getElement().querySelector(".mdc-snackbar__action") ?? document.createElement("button");
  }
  function getElement() {
    return element;
  }
  $$payload.out += `<aside${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-snackbar": true,
      "mdc-snackbar--stacked": variant === "stacked",
      "mdc-snackbar--leading": leading,
      ...internalClasses
    })),
    ...exclude(restProps, ["surface$"])
  })}><div${spread_attributes({
    class: clsx(classMap({
      [surface$class]: true,
      "mdc-snackbar__surface": true
    })),
    role: "status",
    "aria-relevant": "additions",
    ...prefixFilter(restProps, "surface$")
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></div></aside>`;
  bind_props($$props, {
    open,
    forceOpen,
    close,
    isOpen,
    getLabelElement,
    getActionButtonElement,
    getElement
  });
  pop();
}
function Actions($$payload, $$props) {
  push();
  let { children, $$slots, $$events, ...restProps } = $$props;
  let element;
  function getElement() {
    return element.getElement();
  }
  ClassAdder($$payload, spread_props([
    {
      _smuiClass: "mdc-snackbar__actions",
      _smuiProps: { "aria-atomic": "true" },
      _smuiContexts: {
        "SMUI:button:context": "snackbar:actions",
        "SMUI:icon-button:context": "snackbar:actions",
        "SMUI:label:context": undefined
      },
      tag: "div"
    },
    restProps,
    {
      children: ($$payload2) => {
        children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, { getElement });
  pop();
}

export { Actions as A, Snackbar as S };
//# sourceMappingURL=Actions2-g5nnxboW.js.map
