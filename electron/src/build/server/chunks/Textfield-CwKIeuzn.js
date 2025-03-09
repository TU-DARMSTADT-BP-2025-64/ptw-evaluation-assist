import { v as push, ac as getContext, w as setContext, a2 as copy_payload, a3 as assign_payload, ab as bind_props, x as pop, a9 as spread_attributes, aa as clsx, ag as spread_props, a5 as escape_html, a4 as attr, Z as writable } from './exports-nrxFiPmG.js';
import { o as onDestroy, c as classMap, e as exclude, p as prefixFilter, d as dispatch, a as ClassAdder } from './Content-C6Tb3HUF.js';

function ContextFragment($$payload, $$props) {
  push();
  let { key, value, children } = $$props;
  const storeValue = writable(value);
  setContext(key, storeValue);
  onDestroy(() => {
    storeValue.set(undefined);
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function FloatingLabel($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    style = "",
    for: forId,
    floatAbove = false,
    required = false,
    wrapped = false,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let internalClasses = {};
  let internalStyles = {};
  let inputProps = getContext("SMUI:generic:input:props") ?? {};
  getContext("SMUI:floating-label:mount");
  getContext("SMUI:floating-label:unmount");
  function shake(shouldShake) {
  }
  function float(shouldFloat) {
    floatAbove = shouldFloat;
  }
  function setRequired(isRequired) {
    required = isRequired;
  }
  function getWidth() {
    {
      throw new Error("Instance is undefined.");
    }
  }
  function getElement() {
    return element;
  }
  if (wrapped) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span${spread_attributes({
      class: clsx(classMap({
        [className]: true,
        "mdc-floating-label": true,
        "mdc-floating-label--float-above": floatAbove,
        "mdc-floating-label--required": required,
        ...internalClasses
      })),
      style: Object.entries(internalStyles).map(([name, value]) => `${name}: ${value};`).concat([style]).join(" "),
      ...restProps
    })}>`;
    children?.($$payload);
    $$payload.out += `<!----></span>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<label${spread_attributes({
      class: clsx(classMap({
        [className]: true,
        "mdc-floating-label": true,
        "mdc-floating-label--float-above": floatAbove,
        "mdc-floating-label--required": required,
        ...internalClasses
      })),
      style: Object.entries(internalStyles).map(([name, value]) => `${name}: ${value};`).concat([style]).join(" "),
      for: forId || (inputProps ? inputProps.id : undefined),
      ...restProps
    })}>`;
    children?.($$payload);
    $$payload.out += `<!----></label>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    floatAbove,
    required,
    shake,
    float,
    setRequired,
    getWidth,
    getElement
  });
  pop();
}
function LineRipple($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    style = "",
    active = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let internalClasses = {};
  let internalStyles = {};
  function activate() {
  }
  function deactivate() {
  }
  function setRippleCenter(xCoordinate) {
  }
  function getElement() {
    return element;
  }
  $$payload.out += `<div${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-line-ripple": true,
      "mdc-line-ripple--active": active,
      ...internalClasses
    })),
    style: Object.entries(internalStyles).map(([name, value]) => `${name}: ${value};`).concat([style]).join(" "),
    ...restProps
  })}></div>`;
  bind_props($$props, {
    activate,
    deactivate,
    setRippleCenter,
    getElement
  });
  pop();
}
function NotchedOutline($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    notched = false,
    noLabel = false,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let internalClasses = {};
  let notchStyles = {};
  setContext("SMUI:floating-label:mount", (accessor) => {
  });
  setContext("SMUI:floating-label:unmount", () => {
  });
  function notch(notchWidth) {
  }
  function closeNotch() {
  }
  function getElement() {
    return element;
  }
  $$payload.out += `<div${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-notched-outline": true,
      "mdc-notched-outline--notched": notched,
      "mdc-notched-outline--no-label": noLabel,
      ...internalClasses
    })),
    ...restProps
  })}><div class="mdc-notched-outline__leading"></div> `;
  if (!noLabel) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mdc-notched-outline__notch"${attr("style", Object.entries(notchStyles).map(([name, value]) => `${name}: ${value};`).join(" "))}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="mdc-notched-outline__trailing"></div></div>`;
  bind_props($$props, { notch, closeNotch, getElement });
  pop();
}
function HelperLine($$payload, $$props) {
  push();
  let { children, $$slots, $$events, ...restProps } = $$props;
  let element;
  function getElement() {
    return element.getElement();
  }
  ClassAdder($$payload, spread_props([
    {
      _smuiClass: "mdc-text-field-helper-line",
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
function Prefix($$payload, $$props) {
  push();
  let { children, $$slots, $$events, ...restProps } = $$props;
  let element;
  function getElement() {
    return element.getElement();
  }
  ClassAdder($$payload, spread_props([
    {
      _smuiClass: "mdc-text-field__affix mdc-text-field__affix--prefix",
      tag: "span"
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
function Suffix($$payload, $$props) {
  push();
  let { children, $$slots, $$events, ...restProps } = $$props;
  let element;
  function getElement() {
    return element.getElement();
  }
  ClassAdder($$payload, spread_props([
    {
      _smuiClass: "mdc-text-field__affix mdc-text-field__affix--suffix",
      tag: "span"
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
function Input($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    type = "text",
    // Always having a placeholder fixes Safari's baseline alignment.
    // See: https://github.com/philipwalton/flexbugs/issues/270
    placeholder = " ",
    value = undefined,
    files = null,
    dirty = false,
    invalid = false,
    updateInvalid = true,
    initialInvalid = false,
    emptyValueNull = value === null,
    emptyValueUndefined = value === undefined,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let internalAttrs = {};
  let valueProp = {};
  function getAttr(name) {
    return name in internalAttrs ? internalAttrs[name] ?? null : getElement().getAttribute(name);
  }
  function addAttr(name, value2) {
    if (internalAttrs[name] !== value2) {
      internalAttrs[name] = value2;
    }
  }
  function removeAttr(name) {
    if (!(name in internalAttrs) || internalAttrs[name] != null) {
      internalAttrs[name] = undefined;
    }
  }
  function focus() {
    getElement().focus();
  }
  function blur() {
    getElement().blur();
  }
  function getElement() {
    return element;
  }
  $$payload.out += `<input${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-text-field__input": true
    })),
    type,
    placeholder,
    ...valueProp,
    ...internalAttrs,
    ...restProps
  })}>`;
  bind_props($$props, {
    value,
    files,
    dirty,
    invalid,
    getAttr,
    addAttr,
    removeAttr,
    focus,
    blur,
    getElement
  });
  pop();
}
function Textarea($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    style = "",
    value = "",
    dirty = false,
    invalid = false,
    updateInvalid = true,
    initialInvalid = false,
    resizable = true,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let internalAttrs = {};
  function getAttr(name) {
    return name in internalAttrs ? internalAttrs[name] ?? null : getElement().getAttribute(name);
  }
  function addAttr(name, value2) {
    if (internalAttrs[name] !== value2) {
      internalAttrs[name] = value2;
    }
  }
  function removeAttr(name) {
    if (!(name in internalAttrs) || internalAttrs[name] != null) {
      internalAttrs[name] = undefined;
    }
  }
  function focus() {
    getElement().focus();
  }
  function blur() {
    getElement().blur();
  }
  function getElement() {
    return element;
  }
  $$payload.out += `<textarea${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-text-field__input": true
    })),
    style: `${resizable ? "" : "resize: none; "}${style}`,
    ...internalAttrs,
    ...restProps
  })}>`;
  const $$body = escape_html(value);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea>`;
  bind_props($$props, {
    value,
    dirty,
    invalid,
    getAttr,
    addAttr,
    removeAttr,
    focus,
    blur,
    getElement
  });
  pop();
}
function Textfield($$payload, $$props) {
  push();
  let uninitializedValue = () => {
  };
  function isUninitializedValue(value2) {
    return value2 === uninitializedValue;
  }
  let {
    use = [],
    class: className = "",
    style = "",
    ripple = true,
    disabled = false,
    required = false,
    textarea = false,
    variant = textarea ? "outlined" : "standard",
    noLabel = false,
    label,
    type = "text",
    value = undefined,
    files = uninitializedValue,
    invalid = uninitializedValue,
    updateInvalid = isUninitializedValue(invalid),
    initialInvalid: propInitialInvalid = false,
    dirty = false,
    prefix,
    suffix,
    validateOnValueChange = updateInvalid,
    useNativeValidation = updateInvalid,
    withLeadingIcon = uninitializedValue,
    withTrailingIcon = uninitializedValue,
    input,
    floatingLabel,
    lineRipple,
    notchedOutline,
    children,
    leadingIcon,
    trailingIcon,
    internalCounter,
    line,
    helper,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const valued = value !== undefined || value === undefined && restProps.input$emptyValueUndefined || !isUninitializedValue(files);
  if (isUninitializedValue(files)) {
    files = null;
  }
  if (isUninitializedValue(invalid)) {
    invalid = false;
  }
  let element;
  let internalClasses = {};
  let internalStyles = {};
  let helperId = undefined;
  let focused = false;
  let initialInvalid = propInitialInvalid;
  let addLayoutListener = getContext("SMUI:addLayoutListener");
  let removeLayoutListener;
  new Promise((resolve) => resolve);
  input && input.getElement();
  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }
  setContext("SMUI:textfield:leading-icon:mount", (accessor) => {
  });
  setContext("SMUI:textfield:leading-icon:unmount", () => {
  });
  setContext("SMUI:textfield:trailing-icon:mount", (accessor) => {
  });
  setContext("SMUI:textfield:trailing-icon:unmount", () => {
  });
  setContext("SMUI:textfield:helper-text:id", (id) => {
    helperId = id;
  });
  setContext("SMUI:textfield:helper-text:mount", (accessor) => {
  });
  setContext("SMUI:textfield:helper-text:unmount", () => {
    helperId = undefined;
  });
  setContext("SMUI:textfield:character-counter:mount", (accessor) => {
  });
  setContext("SMUI:textfield:character-counter:unmount", () => {
  });
  onDestroy(() => {
    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });
  function focus() {
    input?.focus();
  }
  function blur() {
    input?.blur();
  }
  function layout() {
  }
  function getElement() {
    return element;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (valued) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<label${spread_attributes({
        class: clsx(classMap({
          [className]: true,
          "mdc-text-field": true,
          "mdc-text-field--disabled": disabled,
          "mdc-text-field--textarea": textarea,
          "mdc-text-field--filled": variant === "filled",
          "mdc-text-field--outlined": variant === "outlined",
          "smui-text-field--standard": variant === "standard" && !textarea,
          "mdc-text-field--no-label": noLabel || label == null,
          "mdc-text-field--label-floating": focused || value != null && value !== "",
          "mdc-text-field--with-leading-icon": isUninitializedValue(withLeadingIcon) ? leadingIcon : withLeadingIcon,
          "mdc-text-field--with-trailing-icon": isUninitializedValue(withTrailingIcon) ? trailingIcon : withTrailingIcon,
          "mdc-text-field--with-internal-counter": textarea && internalCounter,
          "mdc-text-field--invalid": invalid,
          ...internalClasses
        })),
        style: Object.entries(internalStyles).map(([name, value2]) => `${name}: ${value2};`).concat([style]).join(" "),
        for: (
          /* suppress a11y warning, since this is wrapped */
          undefined
        ),
        ...exclude(restProps, [
          "input$",
          "label$",
          "ripple$",
          "outline$",
          "helperLine$"
        ])
      })}>`;
      if (!textarea && variant !== "outlined") {
        $$payload2.out += "<!--[-->";
        if (variant === "filled") {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<span class="mdc-text-field__ripple"></span>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (!noLabel && label != null) {
          $$payload2.out += "<!--[-->";
          FloatingLabel($$payload2, spread_props([
            {
              floatAbove: focused || value != null && value !== "" && (typeof value !== "number" || !isNaN(value)),
              required,
              wrapped: true
            },
            prefixFilter(restProps, "label$"),
            {
              children: ($$payload3) => {
                if (label == null) {
                  $$payload3.out += "<!--[-->";
                } else {
                  $$payload3.out += "<!--[!-->";
                  if (typeof label === "string") {
                    $$payload3.out += "<!--[-->";
                    $$payload3.out += `${escape_html(label)}`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                    label($$payload3);
                    $$payload3.out += `<!---->`;
                  }
                  $$payload3.out += `<!--]-->`;
                }
                $$payload3.out += `<!--]-->`;
              },
              $$slots: { default: true }
            }
          ]));
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (textarea || variant === "outlined") {
        $$payload2.out += "<!--[-->";
        NotchedOutline($$payload2, spread_props([
          { noLabel: noLabel || label == null },
          prefixFilter(restProps, "outline$"),
          {
            children: ($$payload3) => {
              if (!noLabel && label != null) {
                $$payload3.out += "<!--[-->";
                FloatingLabel($$payload3, spread_props([
                  {
                    floatAbove: focused || value != null && value !== "" && (typeof value !== "number" || !isNaN(value)),
                    required,
                    wrapped: true
                  },
                  prefixFilter(restProps, "label$"),
                  {
                    children: ($$payload4) => {
                      if (label == null) {
                        $$payload4.out += "<!--[-->";
                      } else {
                        $$payload4.out += "<!--[!-->";
                        if (typeof label === "string") {
                          $$payload4.out += "<!--[-->";
                          $$payload4.out += `${escape_html(label)}`;
                        } else {
                          $$payload4.out += "<!--[!-->";
                          label($$payload4);
                          $$payload4.out += `<!---->`;
                        }
                        $$payload4.out += `<!--]-->`;
                      }
                      $$payload4.out += `<!--]-->`;
                    },
                    $$slots: { default: true }
                  }
                ]));
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          }
        ]));
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      ContextFragment($$payload2, {
        key: "SMUI:textfield:icon:leading",
        value: true,
        children: ($$payload3) => {
          leadingIcon?.($$payload3);
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      children?.($$payload2);
      $$payload2.out += `<!----> `;
      if (textarea && typeof value === "string") {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span${attr("class", clsx(classMap({
          "mdc-text-field__resizer": !("input$resizable" in restProps) || restProps.input$resizable
        })))}>`;
        Textarea($$payload2, spread_props([
          {
            disabled,
            required,
            updateInvalid,
            initialInvalid,
            "aria-controls": helperId,
            "aria-describedby": helperId
          },
          prefixFilter(restProps, "input$"),
          {
            onblur: (e) => {
              focused = false;
              initialInvalid = true;
              dispatch(getElement(), "blur", e);
              restProps.input$onblur?.(e);
            },
            onfocus: (e) => {
              focused = true;
              dispatch(getElement(), "focus", e);
              restProps.input$onfocus?.(e);
            },
            get value() {
              return value;
            },
            set value($$value) {
              value = $$value;
              $$settled = false;
            },
            get dirty() {
              return dirty;
            },
            set dirty($$value) {
              dirty = $$value;
              $$settled = false;
            },
            get invalid() {
              return invalid;
            },
            set invalid($$value) {
              invalid = $$value;
              $$settled = false;
            }
          }
        ]));
        $$payload2.out += `<!----> `;
        internalCounter?.($$payload2);
        $$payload2.out += `<!----></span>`;
      } else {
        $$payload2.out += "<!--[!-->";
        if (prefix != null) {
          $$payload2.out += "<!--[-->";
          if (typeof prefix === "string") {
            $$payload2.out += "<!--[-->";
            Prefix($$payload2, {
              children: ($$payload3) => {
                $$payload3.out += `<!---->${escape_html(prefix)}`;
              },
              $$slots: { default: true }
            });
          } else {
            $$payload2.out += "<!--[!-->";
            prefix?.($$payload2);
            $$payload2.out += `<!---->`;
          }
          $$payload2.out += `<!--]-->`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        Input($$payload2, spread_props([
          {
            type,
            disabled,
            required,
            updateInvalid,
            initialInvalid,
            "aria-controls": helperId,
            "aria-describedby": helperId
          },
          noLabel && label != null && typeof label === "string" ? { placeholder: label } : {},
          prefixFilter(restProps, "input$"),
          {
            onblur: (e) => {
              focused = false;
              initialInvalid = true;
              dispatch(getElement(), "blur", e);
              restProps.input$onblur?.(e);
            },
            onfocus: (e) => {
              focused = true;
              dispatch(getElement(), "focus", e);
              restProps.input$onfocus?.(e);
            },
            get value() {
              return value;
            },
            set value($$value) {
              value = $$value;
              $$settled = false;
            },
            get files() {
              return files;
            },
            set files($$value) {
              files = $$value;
              $$settled = false;
            },
            get dirty() {
              return dirty;
            },
            set dirty($$value) {
              dirty = $$value;
              $$settled = false;
            },
            get invalid() {
              return invalid;
            },
            set invalid($$value) {
              invalid = $$value;
              $$settled = false;
            }
          }
        ]));
        $$payload2.out += `<!----> `;
        if (suffix != null) {
          $$payload2.out += "<!--[-->";
          if (typeof suffix === "string") {
            $$payload2.out += "<!--[-->";
            Suffix($$payload2, {
              children: ($$payload3) => {
                $$payload3.out += `<!---->${escape_html(suffix)}`;
              },
              $$slots: { default: true }
            });
          } else {
            $$payload2.out += "<!--[!-->";
            suffix?.($$payload2);
            $$payload2.out += `<!---->`;
          }
          $$payload2.out += `<!--]-->`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]--> `;
      ContextFragment($$payload2, {
        key: "SMUI:textfield:icon:leading",
        value: false,
        children: ($$payload3) => {
          trailingIcon?.($$payload3);
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      if (!textarea && variant !== "outlined" && ripple) {
        $$payload2.out += "<!--[-->";
        LineRipple($$payload2, spread_props([prefixFilter(restProps, "ripple$")]));
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></label>`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<div${spread_attributes({
        class: clsx(classMap({
          [className]: true,
          "mdc-text-field": true,
          "mdc-text-field--disabled": disabled,
          "mdc-text-field--textarea": textarea,
          "mdc-text-field--filled": variant === "filled",
          "mdc-text-field--outlined": variant === "outlined",
          "smui-text-field--standard": variant === "standard" && !textarea,
          "mdc-text-field--no-label": noLabel || label == null,
          "mdc-text-field--with-leading-icon": leadingIcon,
          "mdc-text-field--with-trailing-icon": trailingIcon,
          "mdc-text-field--invalid": invalid,
          ...internalClasses
        })),
        style: Object.entries(internalStyles).map(([name, value2]) => `${name}: ${value2};`).concat([style]).join(" "),
        ...exclude(restProps, [
          "input$",
          "label$",
          "ripple$",
          "outline$",
          "helperLine$"
        ])
      })}>`;
      if (typeof label !== "string") {
        $$payload2.out += "<!--[-->";
        label?.($$payload2);
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      ContextFragment($$payload2, {
        key: "SMUI:textfield:icon:leading",
        value: true,
        children: ($$payload3) => {
          leadingIcon?.($$payload3);
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      children?.($$payload2);
      $$payload2.out += `<!----> `;
      ContextFragment($$payload2, {
        key: "SMUI:textfield:icon:leading",
        value: false,
        children: ($$payload3) => {
          trailingIcon?.($$payload3);
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      line?.($$payload2);
      $$payload2.out += `<!----></div>`;
    }
    $$payload2.out += `<!--]--> `;
    if (helper) {
      $$payload2.out += "<!--[-->";
      HelperLine($$payload2, spread_props([
        prefixFilter(restProps, "helperLine$"),
        {
          children: ($$payload3) => {
            helper?.($$payload3);
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        }
      ]));
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    value,
    files,
    invalid,
    dirty,
    focus,
    blur,
    layout,
    getElement
  });
  pop();
}

export { ContextFragment as C, FloatingLabel as F, LineRipple as L, NotchedOutline as N, Textfield as T };
//# sourceMappingURL=Textfield-CwKIeuzn.js.map
