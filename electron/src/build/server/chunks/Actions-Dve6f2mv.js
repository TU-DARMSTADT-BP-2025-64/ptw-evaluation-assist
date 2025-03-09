import { v as push, ag as spread_props, ab as bind_props, x as pop } from './exports-nrxFiPmG.js';
import { a as ClassAdder } from './Content-C6Tb3HUF.js';

function Actions($$payload, $$props) {
  push();
  let { children, $$slots, $$events, ...restProps } = $$props;
  let element;
  function getElement() {
    return element.getElement();
  }
  ClassAdder($$payload, spread_props([
    {
      _smuiClass: "mdc-dialog__actions",
      _smuiClassMap: {
        "smui-dialog__actions--reversed": "SMUI:dialog:actions:reversed"
      },
      _smuiContexts: { "SMUI:button:context": "dialog:action" },
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

export { Actions as A };
//# sourceMappingURL=Actions-Dve6f2mv.js.map
