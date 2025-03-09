import { x as pop, a2 as copy_payload, a3 as assign_payload, v as push, a4 as attr, a5 as escape_html, a6 as store_get, a7 as unsubscribe_stores, w as setContext, a8 as ensure_array_like, a9 as spread_attributes, aa as clsx, ab as bind_props, Z as writable, ac as getContext } from './exports-nrxFiPmG.js';
import { I as IconButton } from './IconButton-DRCYvsoJ.js';
import { C as CommonLabel } from './CommonLabel-KC9Kte7x.js';
import { H as HeaderService, B as Button, c as classMap, D as Dialog, T as Title, C as Content } from './Content-C6Tb3HUF.js';
import './client-Dx9mIOam.js';
import { C as ContextFragment, T as Textfield } from './Textfield-CwKIeuzn.js';
import { p as page } from './stores-xMvLKFGn.js';
import { A as Actions } from './Actions-Dve6f2mv.js';
import { S as Snackbar, A as Actions$1 } from './Actions2-g5nnxboW.js';
import './events-CxLtQAvh.js';

const logo = "/_app/immutable/assets/ptw-logo.taJY0KNw.png";
const logoDark = "/_app/immutable/assets/ptw-logo_Dark.DkdypMIH.png";
function SegmentedButton($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    segments = [],
    key = (segment2) => segment2,
    singleSelect = false,
    selected = undefined,
    segment,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (singleSelect && typeof selected === "object" && "findIndex" in selected) {
    throw new Error("Single-select segmented buttons must not be given multiple selected segments.");
  }
  if (!singleSelect && selected !== undefined && (typeof selected !== "object" || !("findIndex" in selected))) {
    throw new Error("Multi-select segmented buttons must be given an array of selected segments.");
  }
  let element;
  let segmentAccessorWeakMap = /* @__PURE__ */ new WeakMap();
  let initialSelected = segments.map((segmentId) => singleSelect && selected != null && key(selected) === key(segmentId) || !singleSelect && selected != null && selected.findIndex((segment2) => key(segment2) === key(segmentId)) !== -1);
  setContext("SMUI:icon:context", "segmented-button");
  setContext("SMUI:label:context", "segmented-button");
  const singleSelectStore = writable(singleSelect);
  setContext("SMUI:segmented-button:singleSelect", singleSelectStore);
  singleSelect ? selected : new Set(selected ?? []);
  setContext("SMUI:segmented-button:segment:mount", (accessor) => {
    addAccessor(accessor.segmentId, accessor);
  });
  setContext("SMUI:segmented-button:segment:unmount", (accessor) => {
    removeAccessor(accessor.segmentId);
  });
  function addAccessor(segmentId, accessor) {
    if (segmentId instanceof Object) {
      segmentAccessorWeakMap.set(segmentId, accessor);
    }
  }
  function removeAccessor(segmentId) {
    if (segmentId instanceof Object) {
      segmentAccessorWeakMap.delete(segmentId);
    }
  }
  function getElement() {
    return element;
  }
  const each_array = ensure_array_like(segments);
  $$payload.out += `<div${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-segmented-button": true,
      "mdc-segmented-button--single-select": singleSelect
    })),
    role: singleSelect ? "radiogroup" : "group",
    ...restProps
  })}><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let segmentKey = each_array[i];
    ContextFragment($$payload, {
      key: "SMUI:segmented-button:segment:index",
      value: i,
      children: ($$payload2) => {
        ContextFragment($$payload2, {
          key: "SMUI:segmented-button:segment:initialSelected",
          value: initialSelected[i],
          children: ($$payload3) => {
            segment($$payload3, segmentKey);
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        });
      },
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { selected, getElement });
  pop();
}
function Segment($$payload, $$props) {
  push();
  var $$store_subs;
  let uninitializedValue = () => {
  };
  function isUninitializedValue(value) {
    return value === uninitializedValue;
  }
  let {
    use = [],
    class: className = "",
    style = "",
    segment: segmentId,
    ripple = true,
    touch = false,
    selected = uninitializedValue,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const initialSelectedStore = getContext("SMUI:segmented-button:segment:initialSelected");
  if (isUninitializedValue(selected)) {
    selected = store_get($$store_subs ??= {}, "$initialSelectedStore", initialSelectedStore);
  }
  let element;
  let internalClasses = {};
  let internalStyles = {};
  let internalAttrs = {};
  const singleSelect = getContext("SMUI:segmented-button:singleSelect");
  getContext("SMUI:segmented-button:segment:index");
  getContext("SMUI:segmented-button:segment:mount");
  getContext("SMUI:segmented-button:segment:unmount");
  function getElement() {
    return element;
  }
  $$payload.out += `<button${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-segmented-button__segment": true,
      "mdc-segmented-button__segment--touch": touch,
      "mdc-segmented-button__segment--selected": selected,
      ...internalClasses
    })),
    style: Object.entries(internalStyles).map(([name, value]) => `${name}: ${value};`).concat([style]).join(" "),
    role: singleSelect ? "radio" : undefined,
    "aria-pressed": !singleSelect ? selected ? "true" : "false" : undefined,
    "aria-checked": singleSelect ? selected ? "true" : "false" : undefined,
    ...internalAttrs,
    ...restProps
  })}>`;
  if (ripple) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mdc-segmented-button__ripple"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  children?.($$payload);
  $$payload.out += `<!---->`;
  if (touch) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mdc-segmented-button__segment__touch"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></button>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { selected, getElement });
  pop();
}
function PasswordChangeDialog($$payload, $$props) {
  let { open = undefined } = $$props;
  let currentPassword = "";
  let newPassword = "";
  let confirmPassword = "";
  let snackbarSuccess = null;
  let snackbarWarning = null;
  let snackbarError = null;
  function closeDialog() {
    open = false;
  }
  async function changePassword(event) {
    event.preventDefault();
    event.stopPropagation();
    if (newPassword !== confirmPassword) {
      return;
    }
    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await response.json();
      if (response.ok) {
        snackbarSuccess?.forceOpen();
        setTimeout(() => closeDialog(), 500);
      } else if (data.message.includes("Das aktuelle Passwort ist falsch")) {
        snackbarError?.forceOpen();
      } else {
        snackbarWarning?.forceOpen();
      }
    } catch (error) {
      console.error("Fehler beim Ändern des Passworts:", error);
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Dialog($$payload2, {
      class: "dialog",
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
            $$payload4.out += `<!---->Passwort ändern`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<form class="form-group">`;
            Textfield($$payload4, {
              id: "currentPassword",
              variant: "filled",
              type: "password",
              label: "Aktuelles Passwort",
              get value() {
                return currentPassword;
              },
              set value($$value) {
                currentPassword = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            Textfield($$payload4, {
              id: "newPassword",
              variant: "filled",
              type: "password",
              label: "Neues Passwort",
              get value() {
                return newPassword;
              },
              set value($$value) {
                newPassword = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            Textfield($$payload4, {
              id: "confirmPassword",
              variant: "filled",
              type: "password",
              label: "Passwort bestätigen",
              get value() {
                return confirmPassword;
              },
              set value($$value) {
                confirmPassword = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></form>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Actions($$payload3, {
          children: ($$payload4) => {
            Button($$payload4, {
              id: "closePasswordChangeDialogButton",
              class: "default-button",
              onclick: closeDialog,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Abbrechen`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Button($$payload4, {
              id: "passwordChangeButton",
              onclick: changePassword,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Passwort ändern`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Snackbar($$payload2, {
      class: "snackbar-success",
      children: ($$payload3) => {
        CommonLabel($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Passwort erfolgreich geändert!`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Actions$1($$payload3, {
          children: ($$payload4) => {
            IconButton($$payload4, {
              class: "material-icons",
              title: "Dismiss",
              children: ($$payload5) => {
                $$payload5.out += `<!---->close`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Snackbar($$payload2, {
      class: "snackbar-warning",
      children: ($$payload3) => {
        CommonLabel($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Das neue Passwort und die Bestätigung stimmen nicht überein.`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Actions$1($$payload3, {
          children: ($$payload4) => {
            IconButton($$payload4, {
              class: "material-icons",
              title: "Dismiss",
              children: ($$payload5) => {
                $$payload5.out += `<!---->close`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Snackbar($$payload2, {
      class: "snackbar-error",
      children: ($$payload3) => {
        CommonLabel($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Das aktuelle Passwort ist falsch!`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Actions$1($$payload3, {
          children: ($$payload4) => {
            IconButton($$payload4, {
              class: "material-icons",
              title: "Dismiss",
              children: ($$payload5) => {
                $$payload5.out += `<!---->close`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { open });
}
function Header($$payload, $$props) {
  push();
  var $$store_subs;
  let passwordChangeDialogOpen = false;
  let isDarkMode = false;
  let fontSize = "medium";
  let showSettings = false;
  let fontSizeChoices = ["small", "medium", "large"];
  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
  }
  function toggleSettings() {
    showSettings = !showSettings;
  }
  function openPasswordChangeDialog() {
    passwordChangeDialogOpen = true;
  }
  async function logout() {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Logout fehlgeschlagen:", await response.text());
      }
    } catch (err) {
      console.error("Fehler beim Logout:", err);
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<header class="svelte-1gmtk13"><a href="/"><div class="logo svelte-1gmtk13"><img${attr("src", isDarkMode ? logoDark : logo)} alt="PTW Logo" class="svelte-1gmtk13"></div></a> <div class="triangle svelte-1gmtk13"></div> <div class="toolbar svelte-1gmtk13"><div class="title svelte-1gmtk13"><p class="title-text">${escape_html(HeaderService.Instance.getTitle())}</p></div> <div class="actions svelte-1gmtk13">`;
    IconButton($$payload2, {
      class: "material-icons",
      onclick: () => toggleDarkMode(),
      children: ($$payload3) => {
        $$payload3.out += `<!---->dark_mode`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    IconButton($$payload2, {
      id: "settingsButton",
      class: "material-icons",
      onclick: () => toggleSettings(),
      children: ($$payload3) => {
        $$payload3.out += `<!---->settings`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    if (store_get($$store_subs ??= {}, "$page", page).data.isLoggedIn) {
      $$payload2.out += "<!--[-->";
      IconButton($$payload2, {
        id: "logoutButton",
        class: "material-icons",
        onclick: logout,
        children: ($$payload3) => {
          $$payload3.out += `<!---->logout`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></div></header> `;
    if (showSettings) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div id="settingsMenuBackground" class="settings-menu-background svelte-1gmtk13" role="button" tabindex="0"></div> <div class="settings-menu mdc-elevation--z4 svelte-1gmtk13"><h2 class="svelte-1gmtk13">Einstellungen</h2> <p style="margin-bottom: -2px" class="settings-section svelte-1gmtk13">Schriftgröße</p> `;
      {
        let segment = function($$payload3, segment2) {
          Segment($$payload3, {
            segment: segment2,
            id: segment2 + "FontSizeButton",
            children: ($$payload4) => {
              CommonLabel($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->${escape_html(segment2)}`;
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
        };
        SegmentedButton($$payload2, {
          segments: fontSizeChoices,
          singleSelect: true,
          get selected() {
            return fontSize;
          },
          set selected($$value) {
            fontSize = $$value;
            $$settled = false;
          },
          segment,
          $$slots: { segment: true }
        });
      }
      $$payload2.out += `<!----> <p class="settings-section svelte-1gmtk13">Benutzer</p> `;
      Button($$payload2, {
        variant: "raised",
        id: "PasswordChange",
        onclick: () => openPasswordChangeDialog(),
        children: ($$payload3) => {
          $$payload3.out += `<!---->Passwort ändern`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (passwordChangeDialogOpen) {
      $$payload2.out += "<!--[-->";
      PasswordChangeDialog($$payload2, {
        get open() {
          return passwordChangeDialogOpen;
        },
        set open($$value) {
          passwordChangeDialogOpen = $$value;
          $$settled = false;
        }
      });
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
  pop();
}
function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  $$payload.out += `<div class="app svelte-spnzg7">`;
  Header($$payload);
  $$payload.out += `<!----> <main class="svelte-spnzg7">`;
  children($$payload);
  $$payload.out += `<!----></main></div>`;
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-cGnNFqhC.js.map
