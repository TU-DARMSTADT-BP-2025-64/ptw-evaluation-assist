import { v as push, ac as getContext, w as setContext, a2 as copy_payload, a3 as assign_payload, ab as bind_props, x as pop, Z as writable, a9 as spread_attributes, aa as clsx, ag as spread_props, a6 as store_get, a5 as escape_html, a7 as unsubscribe_stores } from './exports-nrxFiPmG.js';
import { o as onDestroy, c as classMap, e as exclude, p as prefixFilter, S as SmuiElement, R as Ripple, b as ponyfill, d as dispatch } from './Content-C6Tb3HUF.js';
import { F as FloatingLabel, N as NotchedOutline, L as LineRipple } from './Textfield-CwKIeuzn.js';

function MenuSurface($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    style = "",
    static: isStatic = false,
    anchor = true,
    fixed = false,
    open = isStatic,
    managed = false,
    fullWidth = false,
    quickOpen = false,
    anchorElement = undefined,
    anchorCorner,
    anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 },
    maxHeight = 0,
    horizontallyCenteredOnViewport = false,
    openBottomBias = 0,
    neverRestoreFocus = false,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let internalClasses = {};
  let internalStyles = {};
  setContext("SMUI:list:role", "menu");
  setContext("SMUI:list:item:role", "menuitem");
  getContext("SMUI:menu-surface:mount");
  getContext("SMUI:menu-surface:unmount");
  onDestroy(() => {
  });
  function isOpen() {
    return open;
  }
  function setOpen(value) {
    open = value;
  }
  function setAbsolutePosition(x, y) {
    {
      throw new Error("Instance is not defined.");
    }
  }
  function setIsHoisted(isHoisted) {
    {
      throw new Error("Instance is not defined.");
    }
  }
  function isFixed() {
    {
      throw new Error("Instance is not defined.");
    }
  }
  function flipCornerHorizontally() {
    {
      throw new Error("Instance is not defined.");
    }
  }
  function getElement() {
    return element;
  }
  $$payload.out += `<div${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-menu-surface": true,
      "mdc-menu-surface--fixed": fixed,
      "mdc-menu-surface--open": isStatic,
      "smui-menu-surface--static": isStatic,
      "mdc-menu-surface--fullwidth": fullWidth,
      ...internalClasses
    })),
    style: Object.entries(internalStyles).map(([name, value]) => `${name}: ${value};`).concat([style]).join(" "),
    role: "dialog",
    ...restProps
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, {
    open,
    anchorElement,
    isOpen,
    setOpen,
    setAbsolutePosition,
    setIsHoisted,
    isFixed,
    flipCornerHorizontally,
    getElement
  });
  pop();
}
function Menu($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    open = false,
    anchorElement = undefined,
    managed = false,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  setContext("SMUI:menu-surface:mount", (accessor) => {
  });
  const SMUIListMount = getContext("SMUI:list:mount");
  setContext("SMUI:list:mount", (accessor) => {
    SMUIListMount && SMUIListMount(accessor);
  });
  getContext("SMUI:menu:mount");
  getContext("SMUI:menu:unmount");
  function isOpen() {
    return open;
  }
  function setOpen(value) {
    open = value;
  }
  function setDefaultFocusState(focusState) {
    {
      throw new Error("Instance is undefined.");
    }
  }
  function getSelectedIndex() {
    {
      throw new Error("Instance is undefined.");
    }
  }
  function getMenuSurface() {
    return element;
  }
  function getElement() {
    return element.getElement();
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    MenuSurface($$payload2, spread_props([
      {
        use,
        class: classMap({ [className]: true, "mdc-menu": true }),
        managed
      },
      restProps,
      {
        onkeydown: (e) => {
          restProps.onkeydown?.(e);
        },
        onSMUIMenuSurfaceOpened: (e) => {
          restProps.onSMUIMenuSurfaceOpened?.(e);
        },
        onSMUIListAction: (e) => {
          restProps.onSMUIListAction?.(e);
        },
        get open() {
          return open;
        },
        set open($$value) {
          open = $$value;
          $$settled = false;
        },
        get anchorElement() {
          return anchorElement;
        },
        set anchorElement($$value) {
          anchorElement = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          children?.($$payload3);
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    open,
    anchorElement,
    isOpen,
    setOpen,
    setDefaultFocusState,
    getSelectedIndex,
    getMenuSurface,
    getElement
  });
  pop();
}
function List($$payload, $$props) {
  push();
  const { closest, matches } = ponyfill;
  let nav = getContext("SMUI:list:nav");
  let {
    use = [],
    class: className = "",
    nonInteractive = false,
    dense = false,
    textualList = false,
    avatarList = false,
    iconList = false,
    imageList = false,
    thumbnailList = false,
    videoList = false,
    twoLine = false,
    threeLine = false,
    vertical = true,
    wrapFocus = getContext("SMUI:list:wrapFocus") ?? false,
    singleSelection = false,
    disabledItemsFocusable = false,
    selectedIndex = -1,
    radioList = false,
    checkList = false,
    hasTypeahead = false,
    component: MyComponent = SmuiElement,
    tag = nav ? "nav" : "ul",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let items = [];
  let role = getContext("SMUI:list:role");
  const itemAccessorMap = /* @__PURE__ */ new WeakMap();
  let selectionDialog = getContext("SMUI:dialog:selection");
  let addLayoutListener = getContext("SMUI:addLayoutListener");
  let removeLayoutListener;
  setContext("SMUI:list:nonInteractive", nonInteractive);
  setContext("SMUI:separator:context", "list");
  if (!role) {
    if (singleSelection) {
      role = "listbox";
      setContext("SMUI:list:item:role", "option");
    } else if (radioList) {
      role = "radiogroup";
      setContext("SMUI:list:item:role", "radio");
    } else if (checkList) {
      role = "group";
      setContext("SMUI:list:item:role", "checkbox");
    } else {
      role = "list";
      setContext("SMUI:list:item:role", undefined);
    }
  }
  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }
  setContext("SMUI:list:item:mount", (accessor) => {
    items.push(accessor);
    itemAccessorMap.set(accessor.element, accessor);
    if (singleSelection && accessor.selected) {
      selectedIndex = getListItemIndex(accessor.element);
    }
  });
  setContext("SMUI:list:item:unmount", (accessor) => {
    const idx = (accessor && items.findIndex((a) => a === accessor)) ?? -1;
    if (idx !== -1) {
      items.splice(idx, 1);
      itemAccessorMap.delete(accessor.element);
    }
  });
  getContext("SMUI:list:mount");
  getContext("SMUI:list:unmount");
  onDestroy(() => {
    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });
  function handleAction(event) {
    if (radioList || checkList) {
      const index = getListItemIndex(event.target);
      if (index !== -1) {
        const item = getOrderedList()[index];
        if (item && (radioList && !item.checked || checkList)) {
          if (!matches(event.detail.target, 'input[type="checkbox"], input[type="radio"]')) {
            item.checked = !item.checked;
          }
          item.activateRipple();
          window.requestAnimationFrame(() => {
            item.deactivateRipple();
          });
        }
      }
    }
  }
  function getOrderedList() {
    {
      return [];
    }
  }
  function getListItemIndex(element2) {
    const nearestParent = closest(element2, ".mdc-deprecated-list-item, .mdc-deprecated-list");
    if (nearestParent && matches(nearestParent, ".mdc-deprecated-list-item")) {
      return getOrderedList().map((item) => item?.element).indexOf(nearestParent);
    }
    return -1;
  }
  function layout() {
    {
      throw new Error("Instance is undefined.");
    }
  }
  function setEnabled(itemIndex, isEnabled) {
    {
      throw new Error("Instance is undefined.");
    }
  }
  function getTypeaheadInProgress() {
    {
      throw new Error("Instance is undefined.");
    }
  }
  function getSelectedIndex() {
    {
      throw new Error("Instance is undefined.");
    }
  }
  function getFocusedItemIndex() {
    {
      throw new Error("Instance is undefined.");
    }
  }
  function focusItemAtIndex(index) {
    const accessor = getOrderedList()[index];
    accessor && "focus" in accessor.element && accessor.element.focus();
  }
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
        "mdc-deprecated-list": true,
        "mdc-deprecated-list--non-interactive": nonInteractive,
        "mdc-deprecated-list--dense": dense,
        "mdc-deprecated-list--textual-list": textualList,
        "mdc-deprecated-list--avatar-list": avatarList || selectionDialog,
        "mdc-deprecated-list--icon-list": iconList,
        "mdc-deprecated-list--image-list": imageList,
        "mdc-deprecated-list--thumbnail-list": thumbnailList,
        "mdc-deprecated-list--video-list": videoList,
        "mdc-deprecated-list--two-line": twoLine,
        "smui-list--three-line": threeLine && !twoLine
      }),
      role
    },
    restProps,
    {
      onkeydown: (e) => {
        restProps.onkeydown?.(e);
      },
      onfocusin: (e) => {
        restProps.onfocusin?.(e);
      },
      onfocusout: (e) => {
        restProps.onfocusout?.(e);
      },
      onclick: (e) => {
        restProps.onclick?.(e);
      },
      onSMUIAction: (e) => {
        handleAction(e);
        restProps.onSMUIAction?.(e);
      },
      children: ($$payload2) => {
        children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  $$payload.out += `<!---->`;
  bind_props($$props, {
    selectedIndex,
    layout,
    setEnabled,
    getTypeaheadInProgress,
    getSelectedIndex,
    getFocusedItemIndex,
    focusItemAtIndex,
    getElement
  });
  pop();
}
let counter$2 = 0;
function Item($$payload, $$props) {
  push();
  let uninitializedValue = () => {
  };
  function isUninitializedValue(value) {
    return value === uninitializedValue;
  }
  let nav = getContext("SMUI:list:item:nav");
  let {
    use = [],
    class: className = "",
    style = "",
    color,
    nonInteractive = getContext("SMUI:list:nonInteractive") ?? false,
    ripple = !nonInteractive,
    wrapper = false,
    activated = false,
    role = wrapper ? "presentation" : getContext("SMUI:list:item:role"),
    selected = false,
    disabled = false,
    skipRestoreFocus = false,
    tabindex: tabindexProp = uninitializedValue,
    inputId = "SMUI-form-field-list-" + counter$2++,
    href,
    component: MyComponent = SmuiElement,
    tag = nav ? href ? "a" : "span" : "li",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  setContext("SMUI:list:nonInteractive", undefined);
  setContext("SMUI:list:item:role", undefined);
  let element;
  let internalClasses = {};
  let internalStyles = {};
  let internalAttrs = {};
  let input = undefined;
  const tabindex = isUninitializedValue(tabindexProp) ? !nonInteractive && !disabled && (selected || input && input.checked) ? 0 : -1 : tabindexProp;
  setContext("SMUI:generic:input:props", { id: inputId });
  setContext("SMUI:separator:context", undefined);
  setContext("SMUI:generic:input:mount", (accessor) => {
    if ("_smui_checkbox_accessor" in accessor || "_smui_radio_accessor" in accessor) {
      input = accessor;
    }
  });
  setContext("SMUI:generic:input:unmount", () => {
    input = undefined;
  });
  getContext("SMUI:list:item:mount");
  getContext("SMUI:list:item:unmount");
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
  function handleKeydown(e) {
    const isEnter = e.key === "Enter";
    const isSpace = e.key === "Space";
    if (isEnter || isSpace) {
      action(e);
    }
  }
  function action(e) {
    if (!disabled) {
      dispatch(getElement(), "SMUIAction", e);
    }
  }
  function getPrimaryText() {
    const element2 = getElement();
    const primaryText = element2.querySelector(".mdc-deprecated-list-item__primary-text");
    if (primaryText) {
      return primaryText.textContent ?? "";
    }
    const text = element2.querySelector(".mdc-deprecated-list-item__text");
    if (text) {
      return text.textContent ?? "";
    }
    return element2.textContent ?? "";
  }
  function getElement() {
    return element.getElement();
  }
  $$payload.out += `<!---->`;
  MyComponent($$payload, spread_props([
    {
      tag,
      use: [
        ...nonInteractive ? [] : [
          [
            Ripple,
            {
              ripple: !input,
              unbounded: false,
              color: (activated || selected) && color == null ? "primary" : color,
              disabled,
              addClass,
              removeClass,
              addStyle
            }
          ]
        ],
        ...use
      ],
      class: classMap({
        [className]: true,
        "mdc-deprecated-list-item": !wrapper,
        "mdc-deprecated-list-item__wrapper": wrapper,
        "mdc-deprecated-list-item--activated": activated,
        "mdc-deprecated-list-item--selected": selected,
        "mdc-deprecated-list-item--disabled": disabled,
        "mdc-menu-item--selected": !nav && role === "menuitem" && selected,
        "smui-menu-item--non-interactive": nonInteractive,
        ...internalClasses
      }),
      style: Object.entries(internalStyles).map(([name, value]) => `${name}: ${value};`).concat([style]).join(" ")
    },
    nav && activated ? { "aria-current": "page" } : {},
    !nav || wrapper ? { role } : {},
    !nav && role === "option" ? { "aria-selected": selected ? "true" : "false" } : {},
    !nav && (role === "radio" || role === "checkbox") ? {
      "aria-checked": input && input.checked ? "true" : "false"
    } : {},
    !nav ? { "aria-disabled": disabled ? "true" : "false" } : {},
    {
      "data-menu-item-skip-restore-focus": skipRestoreFocus || undefined,
      tabindex,
      href
    },
    internalAttrs,
    restProps,
    {
      onclick: (e) => {
        action(e);
        restProps.onclick?.(e);
      },
      onkeydown: (e) => {
        handleKeydown(e);
        restProps.onkeydown?.(e);
      },
      children: ($$payload2) => {
        if (ripple) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<span class="mdc-deprecated-list-item__ripple"></span>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
        children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  $$payload.out += `<!---->`;
  bind_props($$props, {
    activated,
    selected,
    tabindex: tabindexProp,
    action,
    getPrimaryText,
    getElement
  });
  pop();
}
let counter$1 = 0;
function HelperText($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    id = "SMUI-select-helper-text-" + counter$1++,
    persistent = false,
    validationMsg = false,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let internalClasses = {};
  let internalAttrs = {};
  getContext("SMUI:select:helper-text:id");
  getContext("SMUI:select:helper-text:mount");
  getContext("SMUI:select:helper-text:unmount");
  function getElement() {
    return element;
  }
  $$payload.out += `<div${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-select-helper-text": true,
      "mdc-select-helper-text--validation-msg": validationMsg,
      "mdc-select-helper-text--validation-msg-persistent": persistent,
      ...internalClasses
    })),
    "aria-hidden": persistent ? undefined : "true",
    id,
    ...internalAttrs,
    ...restProps
  })}>`;
  {
    $$payload.out += "<!--[-->";
    children?.($$payload);
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { getElement });
  pop();
}
let counter = 0;
function Select($$payload, $$props) {
  push();
  var $$store_subs;
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
    variant = "standard",
    noLabel = false,
    label = undefined,
    value = undefined,
    key = (item) => item,
    dirty = false,
    invalid = uninitializedValue,
    updateInvalid = isUninitializedValue(invalid),
    required = false,
    inputId = "SMUI-select-" + counter++,
    hiddenInput = false,
    withLeadingIcon = uninitializedValue,
    anchor$use = [],
    anchor$class = "",
    selectedTextContainer$use = [],
    selectedTextContainer$class = "",
    selectedText$use = [],
    selectedText$class = "",
    dropdownIcon$use = [],
    dropdownIcon$class = "",
    menu$class = "",
    children,
    leadingIcon,
    helperText,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (isUninitializedValue(invalid)) {
    invalid = false;
  }
  let element;
  let internalClasses = {};
  let internalStyles = {};
  let selectAnchor;
  let selectAnchorAttrs = {};
  let selectedIndex = -1;
  const menuId = restProps["menu$id"] ?? inputId + "-menu";
  let helperId = undefined;
  let addLayoutListener = getContext("SMUI:addLayoutListener");
  let removeLayoutListener;
  let menuOpen = false;
  let menuClasses = {};
  let anchorElement = undefined;
  let anchorCorner = undefined;
  let wrapFocus = false;
  let context = getContext("SMUI:select:context");
  setContext("SMUI:list:role", "");
  setContext("SMUI:list:nav", false);
  const selectedTextStore = writable("");
  setContext("SMUI:select:selectedText", selectedTextStore);
  const valueStore = writable(value);
  setContext("SMUI:select:value", valueStore);
  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }
  setContext("SMUI:select:leading-icon:mount", (accessor) => {
  });
  setContext("SMUI:select:leading-icon:unmount", () => {
  });
  setContext("SMUI:list:mount", (accessor) => {
  });
  setContext("SMUI:select:helper-text:id", (id) => {
    helperId = id;
  });
  setContext("SMUI:select:helper-text:mount", (accessor) => {
  });
  setContext("SMUI:select:helper-text:unmount", () => {
    helperId = undefined;
  });
  onDestroy(() => {
    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });
  function getUseDefaultValidation() {
    {
      throw new Error("Instance is undefined.");
    }
  }
  function setUseDefaultValidation(useDefaultValidation) {
  }
  function focus() {
    selectAnchor.focus();
  }
  function layout() {
  }
  function getElement() {
    return element;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div${spread_attributes({
      class: clsx(classMap({
        [className]: true,
        "mdc-select": true,
        "mdc-select--required": required,
        "mdc-select--disabled": disabled,
        "mdc-select--filled": variant === "filled",
        "mdc-select--outlined": variant === "outlined",
        "smui-select--standard": variant === "standard",
        "mdc-select--with-leading-icon": isUninitializedValue(withLeadingIcon) ? leadingIcon : withLeadingIcon,
        "mdc-select--no-label": noLabel || label == null,
        "mdc-select--invalid": invalid,
        "mdc-select--activated": menuOpen,
        "mdc-data-table__pagination-rows-per-page-select": context === "data-table:pagination",
        ...internalClasses
      })),
      style: Object.entries(internalStyles).map(([name, value2]) => `${name}: ${value2};`).concat([style]).join(" "),
      ...exclude(restProps, [
        "input$",
        "anchor$",
        "label$",
        "outline$",
        "selectedTextContainer$",
        "selectedText$",
        "dropdownIcon$",
        "ripple$",
        "menu$",
        "list$",
        "helperText$"
      ])
    })}>`;
    if (hiddenInput) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<input${spread_attributes({
        type: "hidden",
        required,
        disabled,
        value,
        ...prefixFilter(restProps, "input$")
      })}>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div${spread_attributes({
      class: clsx(classMap({
        [anchor$class]: true,
        "mdc-select__anchor": true
      })),
      "aria-required": required ? "true" : undefined,
      "aria-disabled": disabled ? "true" : undefined,
      "aria-controls": menuId,
      "aria-expanded": menuOpen ? "true" : "false",
      "aria-describedby": helperId,
      role: "combobox",
      tabindex: "0",
      ...selectAnchorAttrs,
      ...prefixFilter(restProps, "anchor$")
    })}>`;
    if (variant === "filled") {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span class="mdc-select__ripple"></span>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (variant !== "outlined" && !noLabel && label != null) {
      $$payload2.out += "<!--[-->";
      FloatingLabel($$payload2, spread_props([
        {
          id: inputId + "-smui-label",
          floatAbove: store_get($$store_subs ??= {}, "$selectedTextStore", selectedTextStore) !== "",
          required
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
    $$payload2.out += `<!--]--> `;
    if (variant === "outlined") {
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
                  id: inputId + "-smui-label",
                  floatAbove: store_get($$store_subs ??= {}, "$selectedTextStore", selectedTextStore) !== "",
                  required
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
    leadingIcon?.($$payload2);
    $$payload2.out += `<!----> <span${spread_attributes({
      class: clsx(classMap({
        [selectedTextContainer$class]: true,
        "mdc-select__selected-text-container": true
      })),
      ...prefixFilter(restProps, "selectedTextContainer$")
    })}><span${spread_attributes({
      id: inputId + "-smui-selected-text",
      class: clsx(classMap({
        [selectedText$class]: true,
        "mdc-select__selected-text": true
      })),
      role: "button",
      "aria-haspopup": "listbox",
      "aria-labelledby": inputId + "-smui-label",
      ...prefixFilter(restProps, "selectedText$")
    })}>${escape_html(store_get($$store_subs ??= {}, "$selectedTextStore", selectedTextStore))}</span></span> <span${spread_attributes({
      class: clsx(classMap({
        [dropdownIcon$class]: true,
        "mdc-select__dropdown-icon": true
      })),
      ...prefixFilter(restProps, "dropdownIcon$")
    })}><svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false"><polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon><polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon></svg></span> `;
    if (variant !== "outlined" && ripple) {
      $$payload2.out += "<!--[-->";
      LineRipple($$payload2, spread_props([prefixFilter(restProps, "ripple$")]));
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> `;
    Menu($$payload2, spread_props([
      {
        class: classMap({
          [menu$class]: true,
          "mdc-select__menu": true,
          ...menuClasses
        }),
        id: menuId,
        fullWidth: true,
        anchor: false,
        anchorElement,
        anchorCorner
      },
      prefixFilter(restProps, "menu$"),
      {
        onSMUIMenuSelected: (e) => {
          restProps.onSMUIMenuSelected?.(e);
        },
        onSMUIMenuSurfaceClosing: (e) => {
          restProps.onSMUIMenuSurfaceClosing?.(e);
        },
        onSMUIMenuSurfaceClosed: (e) => {
          restProps.onSMUIMenuSurfaceClosed?.(e);
        },
        onSMUIMenuSurfaceOpened: (e) => {
          restProps.onSMUIMenuSurfaceOpened?.(e);
        },
        get open() {
          return menuOpen;
        },
        set open($$value) {
          menuOpen = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          List($$payload3, spread_props([
            { role: "listbox", wrapFocus },
            prefixFilter(restProps, "list$"),
            {
              get selectedIndex() {
                return selectedIndex;
              },
              set selectedIndex($$value) {
                selectedIndex = $$value;
                $$settled = false;
              },
              children: ($$payload4) => {
                children?.($$payload4);
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            }
          ]));
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!----></div> `;
    if (helperText) {
      $$payload2.out += "<!--[-->";
      HelperText($$payload2, spread_props([
        prefixFilter(restProps, "helperText$"),
        {
          children: ($$payload3) => {
            helperText?.($$payload3);
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
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    value,
    dirty,
    invalid,
    getUseDefaultValidation,
    setUseDefaultValidation,
    focus,
    layout,
    getElement
  });
  pop();
}
function Option($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    use = [],
    class: className = "",
    value = "",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  getContext("SMUI:select:selectedText");
  const selectedValue = getContext("SMUI:select:value");
  setContext("SMUI:list:item:role", "option");
  const selected = value != null && value !== "" && store_get($$store_subs ??= {}, "$selectedValue", selectedValue) === value;
  onDestroy(setSelectedText);
  function setSelectedText() {
  }
  function getElement() {
    return element.getElement();
  }
  Item($$payload, spread_props([
    { use, "data-value": value, value, selected },
    restProps,
    {
      children: ($$payload2) => {
        children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { getElement });
  pop();
}

export { Item as I, List as L, Menu as M, Option as O, Select as S };
//# sourceMappingURL=Option-pkJC_U-2.js.map
