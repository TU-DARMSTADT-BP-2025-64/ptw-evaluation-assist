import { a2 as copy_payload, a3 as assign_payload, x as pop, a8 as ensure_array_like, af as fallback, ab as bind_props, v as push, a4 as attr, ae as stringify, a5 as escape_html, w as setContext, a9 as spread_attributes, aa as clsx, ag as spread_props } from './exports-nrxFiPmG.js';
import { H as HeaderService, B as Button, D as Dialog, T as Title, C as Content, c as classMap, e as exclude, p as prefixFilter, a as ClassAdder, d as dispatch } from './Content-C6Tb3HUF.js';
import { T as Textfield } from './Textfield-CwKIeuzn.js';
import { A as Actions } from './Actions-Dve6f2mv.js';
import { P as ProductTreeViewModel } from './product.model-CtjXPvr8.js';
import { I as IconButton } from './IconButton-DRCYvsoJ.js';
import { C as CommonIcon } from './Svg-B0FOppr7.js';
import { g as getElementsFromProductTreeView, a as AssemblyComponentTreeViewModel, W as WearCriterionTreeViewModel, A as AssemblyGroupTreeViewModel } from './ProductTreeViewUtil-D5fgOrvk.js';
import { M as Menu, L as List, I as Item, S as Select, O as Option } from './Option-pkJC_U-2.js';
import { C as CommonLabel } from './CommonLabel-KC9Kte7x.js';
import { b as WearThresholdTreeViewModel, a as WearThresholdType, d as WearThresholdTypeTranslation } from './wear-threshold.model-BEv4SSMu.js';
import 'browser-image-compression';
import { S as Snackbar, A as Actions$1 } from './Actions2-g5nnxboW.js';
import { g as goto } from './client-Dx9mIOam.js';
import { v4 } from 'uuid';
import './events-CxLtQAvh.js';

function Text($$payload, $$props) {
  push();
  let { children, $$slots, $$events, ...restProps } = $$props;
  let element;
  function getElement() {
    return element.getElement();
  }
  ClassAdder($$payload, spread_props([
    {
      _smuiClass: "mdc-deprecated-list-item__text",
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
let counter = 0;
function Autocomplete($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    options = [],
    value = undefined,
    getOptionDisabled = () => false,
    getOptionLabel = (option) => option == null ? "" : `${option}`,
    text = getOptionLabel(value),
    label,
    disabled = false,
    toggle = false,
    combobox = false,
    clearOnBlur = !combobox,
    selectOnExactMatch = true,
    showMenuWithNoInput = true,
    noMatchesActionDisabled = true,
    search = async (input) => {
      const linput = input.toLowerCase();
      const fullOptions = typeof options == "function" ? await options() : options || [];
      if (linput === "") {
        return fullOptions;
      }
      const result = fullOptions.filter((item) => getOptionLabel(item).toLowerCase().includes(linput));
      result.sort((a, b) => {
        const aString = getOptionLabel(a).toLowerCase();
        const bString = getOptionLabel(b).toLowerCase();
        if (aString.startsWith(linput) && !bString.startsWith(linput)) {
          return -1;
        } else if (bString.startsWith(linput) && !aString.startsWith(linput)) {
          return 1;
        }
        return 0;
      });
      return result;
    },
    menu$class = "",
    menu$anchor = false,
    menu$anchorCorner = "BOTTOM_START",
    children,
    loading,
    error,
    match,
    noMatches,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let focused = false;
  let matches = [];
  let menuId = restProps["menu$id"] ?? "SMUI-autocomplete-" + counter++ + "-menu";
  const menuOpen = focused;
  setContext("SMUI:list:mount", (accessor) => {
  });
  function selectOption(option, setText = true) {
    const event = dispatch(getElement(), "SMUIAutocompleteSelected", option, { bubbles: true, cancelable: true });
    if (event.defaultPrevented) {
      return;
    }
    if (setText) {
      text = getOptionLabel(option);
    }
    value = option;
  }
  function deselectOption(option, setText = true) {
    const event = dispatch(getElement(), "SMUIAutocompleteDeselected", option, { bubbles: true, cancelable: true });
    if (event.defaultPrevented) {
      return;
    }
    if (setText) {
      text = "";
    }
    value = undefined;
  }
  function toggleOption(option) {
    if (option === value) {
      deselectOption(option);
    } else {
      selectOption(option);
    }
  }
  function focus() {
  }
  function blur() {
  }
  function getElement() {
    return element;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div${spread_attributes({
      class: clsx(classMap({ [className]: true, "smui-autocomplete": true })),
      ...exclude(restProps, ["menu$", "textfield$", "list$"])
    })}><div${attr("aria-controls", menuId)}${attr("aria-expanded", "false")} role="combobox" tabindex="0">`;
    if (children) {
      $$payload2.out += "<!--[-->";
      children?.($$payload2);
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
      Textfield($$payload2, spread_props([
        { label, disabled },
        prefixFilter(restProps, "textfield$"),
        {
          get value() {
            return text;
          },
          set value($$value) {
            text = $$value;
            $$settled = false;
          }
        }
      ]));
    }
    $$payload2.out += `<!--]--></div> `;
    Menu($$payload2, spread_props([
      {
        class: classMap({
          [menu$class]: true,
          "smui-autocomplete__menu": true
        }),
        id: menuId,
        managed: true,
        neverRestoreFocus: true,
        open: menuOpen,
        anchor: menu$anchor,
        anchorCorner: menu$anchorCorner
      },
      prefixFilter(restProps, "menu$"),
      {
        get anchorElement() {
          return element;
        },
        set anchorElement($$value) {
          element = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          List($$payload3, spread_props([
            prefixFilter(restProps, "list$"),
            {
              children: ($$payload4) => {
                {
                  $$payload4.out += "<!--[!-->";
                  {
                    $$payload4.out += "<!--[!-->";
                    const each_array = ensure_array_like(matches);
                    if (each_array.length !== 0) {
                      $$payload4.out += "<!--[-->";
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let curMatch = each_array[i];
                        Item($$payload4, {
                          disabled: getOptionDisabled(curMatch),
                          selected: curMatch === value,
                          onmouseenter: () => {
                          },
                          onSMUIAction: () => toggle ? toggleOption(curMatch) : selectOption(curMatch),
                          children: ($$payload5) => {
                            if (match) {
                              $$payload5.out += "<!--[-->";
                              match($$payload5, curMatch);
                              $$payload5.out += `<!---->`;
                            } else {
                              $$payload5.out += "<!--[!-->";
                              Text($$payload5, {
                                children: ($$payload6) => {
                                  $$payload6.out += `<!---->${escape_html(getOptionLabel(curMatch))}`;
                                },
                                $$slots: { default: true }
                              });
                            }
                            $$payload5.out += `<!--]-->`;
                          },
                          $$slots: { default: true }
                        });
                      }
                    } else {
                      $$payload4.out += "<!--[!-->";
                      Item($$payload4, {
                        disabled: noMatchesActionDisabled,
                        onSMUIAction: (e) => dispatch(getElement(), "SMUIAutocompleteNoMatchesAction", e),
                        children: ($$payload5) => {
                          if (noMatches) {
                            $$payload5.out += "<!--[-->";
                            noMatches($$payload5);
                            $$payload5.out += `<!---->`;
                          } else {
                            $$payload5.out += "<!--[!-->";
                            Text($$payload5, {
                              children: ($$payload6) => {
                                $$payload6.out += `<!---->No matches found.`;
                              },
                              $$slots: { default: true }
                            });
                          }
                          $$payload5.out += `<!--]-->`;
                        },
                        $$slots: { default: true }
                      });
                    }
                    $$payload4.out += `<!--]-->`;
                  }
                  $$payload4.out += `<!--]-->`;
                }
                $$payload4.out += `<!--]-->`;
              },
              $$slots: { default: true }
            }
          ]));
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { value, text, focus, blur, getElement });
  pop();
}
function WearThresholdForm($$payload, $$props) {
  push();
  let { wearThreshold = undefined, strategies } = $$props;
  let selectedImage = wearThreshold.image;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="threshold svelte-16gw6xs"><div class="threshold-type svelte-16gw6xs">${escape_html(WearThresholdTypeTranslation[wearThreshold.type])}</div> <div class="threshold-value svelte-16gw6xs">`;
    Textfield($$payload2, {
      label: "Grenzwert",
      get value() {
        return wearThreshold.label;
      },
      set value($$value) {
        wearThreshold.label = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="threshold-strategy svelte-16gw6xs">`;
    Select($$payload2, {
      style: "margin-top: 18px",
      label: "Strategie",
      get value() {
        return wearThreshold.fixStrategy;
      },
      set value($$value) {
        wearThreshold.fixStrategy = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        const each_array = ensure_array_like(strategies);
        $$payload3.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let strat = each_array[$$index];
          Option($$payload3, {
            value: strat.name,
            children: ($$payload4) => {
              $$payload4.out += `<!---->${escape_html(strat.name)}`;
            },
            $$slots: { default: true }
          });
        }
        $$payload3.out += `<!--]-->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div class="threshold-measures svelte-16gw6xs">`;
    Textfield($$payload2, {
      textarea: true,
      label: "Maßnahmen",
      input$rows: 2,
      input$resizable: true,
      get value() {
        return wearThreshold.measures;
      },
      set value($$value) {
        wearThreshold.measures = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="threshold-image svelte-16gw6xs" role="button" tabindex="0">`;
    if (selectedImage) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="image-delete-button svelte-16gw6xs"><i class="material-icons svelte-16gw6xs" role="button" tabindex="0">delete</i></div> <img${attr("src", selectedImage)} alt="Bild" style="width: 120px; height: 80px; border-radius: 4px; object-fit: contain">`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<i class="material-icons">photo_camera</i>`;
    }
    $$payload2.out += `<!--]--></div> <input type="file" style="display: none"></div> `;
    Snackbar($$payload2, {
      class: "snackbar-error",
      children: ($$payload3) => {
        CommonLabel($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Die hochgeladenen Datei ist kein Bild!`;
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
  bind_props($$props, { wearThreshold });
  pop();
}
function WearCriterionForm($$payload, $$props) {
  push();
  let {
    wearCriterion = undefined,
    machineElement,
    strategies,
    ondelete
  } = $$props;
  console.log("wearCriterion", wearCriterion, machineElement);
  let availableCriteria = (() => machineElement?.criteria?.map((c) => c.name) ?? [])();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(wearCriterion.wearThresholds);
    $$payload2.out += `<div class="wear-criterion-form svelte-1keedjp"><div class="criterion svelte-1keedjp">`;
    Autocomplete($$payload2, {
      combobox: true,
      label: "Kriterium",
      options: availableCriteria,
      get value() {
        return wearCriterion.label;
      },
      set value($$value) {
        wearCriterion.label = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    IconButton($$payload2, {
      onclick: ondelete,
      children: ($$payload3) => {
        $$payload3.out += `<i class="material-icons">delete</i>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div class="thresholds svelte-1keedjp"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      each_array[i];
      WearThresholdForm($$payload2, {
        strategies,
        get wearThreshold() {
          return wearCriterion.wearThresholds[i];
        },
        set wearThreshold($$value) {
          wearCriterion.wearThresholds[i] = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { wearCriterion });
  pop();
}
function AssemblyComponentDialog($$payload, $$props) {
  push();
  let {
    open = undefined,
    strategies,
    categoriesTreeView,
    onSave,
    assemblyComponent = new AssemblyComponentTreeViewModel()
  } = $$props;
  console.log("assemblyComponent", assemblyComponent);
  let wearCriteria = assemblyComponent.wearCriteria;
  if (!assemblyComponent.wearCriteria || assemblyComponent.wearCriteria.length === 0) {
    console.log("add wear criterion");
    addWearCriterion();
  }
  console.log("AssemblyComponent", assemblyComponent);
  let name = assemblyComponent.name;
  let machineElementCategory = assemblyComponent.machineElementCategory;
  let machineElement = assemblyComponent.machineElement;
  let invalidName = false;
  let predefinedCategories = categoriesTreeView.map((category) => category.name);
  let selectedCategory = (() => {
    return categoriesTreeView.find((category) => category.name === machineElementCategory);
  })();
  let predefinedElements = (() => {
    if (!selectedCategory) return [];
    return selectedCategory.elements.map((element) => element.name);
  })();
  let selectedElement = (() => {
    if (!selectedCategory) return null;
    return selectedCategory.elements.find((element) => element.name === machineElement);
  })();
  function addWearCriterion() {
    const wearCriterion = new WearCriterionTreeViewModel();
    wearCriterion.component = assemblyComponent;
    wearCriterion.wearThresholds = [
      new WearThresholdTreeViewModel({
        type: WearThresholdType.OpticalError,
        criterion: wearCriterion
      }),
      new WearThresholdTreeViewModel({
        type: WearThresholdType.FunctionalError,
        criterion: wearCriterion
      }),
      new WearThresholdTreeViewModel({
        type: WearThresholdType.SafetyError,
        criterion: wearCriterion
      })
    ];
    wearCriteria.push(wearCriterion);
  }
  function removeWearCriterion(index) {
    wearCriteria.splice(index, 1);
  }
  function saveNewComponent() {
    if (!name || name.trim() === "") {
      invalidName = true;
      return;
    }
    const component = new AssemblyComponentTreeViewModel({
      ...assemblyComponent,
      name,
      machineElementCategory,
      machineElement,
      wearCriteria
    });
    onSave(component);
    open = false;
  }
  function cancel() {
    name = "";
    open = false;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Dialog($$payload2, {
      class: "custom-dialog",
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
            $$payload4.out += `<span data-testid="dialog-title">Neue Komponente</span>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Content($$payload3, {
          class: "content",
          children: ($$payload4) => {
            const each_array = ensure_array_like(wearCriteria);
            Textfield($$payload4, {
              required: true,
              invalid: invalidName,
              style: "width: 100%;",
              onkeydown: (e) => e.key === "Enter" && saveNewComponent(),
              label: "Name",
              get value() {
                return name;
              },
              set value($$value) {
                name = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            Autocomplete($$payload4, {
              style: "margin-top: 12px",
              combobox: true,
              options: predefinedCategories,
              label: "Kategorie Maschinenelement",
              get value() {
                return machineElementCategory;
              },
              set value($$value) {
                machineElementCategory = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            Autocomplete($$payload4, {
              style: "margin-top: 12px",
              combobox: true,
              options: predefinedElements,
              label: "Maschinenelement",
              get value() {
                return machineElement;
              },
              set value($$value) {
                machineElement = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> <div class="wear-criterion-title svelte-1261838">Verschleißkriterien</div> <div class="wear-criteria svelte-1261838"><!--[-->`;
            for (let index = 0, $$length = each_array.length; index < $$length; index++) {
              each_array[index];
              WearCriterionForm($$payload4, {
                machineElement: selectedElement,
                strategies,
                ondelete: () => removeWearCriterion(index),
                get wearCriterion() {
                  return wearCriteria[index];
                },
                set wearCriterion($$value) {
                  wearCriteria[index] = $$value;
                  $$settled = false;
                }
              });
            }
            $$payload4.out += `<!--]--></div> `;
            Button($$payload4, {
              id: "wear-criterion-add-button",
              onclick: addWearCriterion,
              children: ($$payload5) => {
                CommonIcon($$payload5, {
                  class: "material-icons",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->add`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <span>Verschleißkriterium hinzufügen</span>`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <div class="actions svelte-1261838">`;
        Button($$payload3, {
          class: "cancel-button",
          onclick: () => cancel(),
          children: ($$payload4) => {
            $$payload4.out += `<!---->Abbrechen`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Button($$payload3, {
          onclick: () => saveNewComponent(),
          children: ($$payload4) => {
            $$payload4.out += `<!---->Speichern`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----></div>`;
      },
      $$slots: { default: true }
    });
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { open });
  pop();
}
function AssemblyComponentForm($$payload, $$props) {
  push();
  let {
    assemblyComponent = undefined,
    strategies,
    categoriesTreeView,
    canMoveUp,
    canMoveDown,
    onMoveUp,
    onMoveDown,
    level,
    lastChild,
    onDeleteAssemblyComponent
  } = $$props;
  let editDialogOpen = false;
  function openEditDialog() {
    editDialogOpen = true;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="component-name svelte-3p8an4">`;
    Textfield($$payload2, {
      variant: "filled",
      label: "Name",
      get value() {
        return assemblyComponent.name;
      },
      set value($$value) {
        assemblyComponent.name = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    IconButton($$payload2, {
      class: "material-icons",
      disabled: !canMoveUp,
      onclick: () => onMoveUp(),
      children: ($$payload3) => {
        $$payload3.out += `<!---->keyboard_arrow_up`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    IconButton($$payload2, {
      class: "material-icons",
      disabled: !canMoveDown,
      onclick: () => onMoveDown(),
      children: ($$payload3) => {
        $$payload3.out += `<!---->keyboard_arrow_down`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    IconButton($$payload2, {
      onclick: openEditDialog,
      children: ($$payload3) => {
        $$payload3.out += `<i class="material-icons">edit</i>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    IconButton($$payload2, {
      onclick: () => onDeleteAssemblyComponent(),
      children: ($$payload3) => {
        $$payload3.out += `<i class="material-icons">delete</i>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> `;
    if (editDialogOpen) {
      $$payload2.out += "<!--[-->";
      AssemblyComponentDialog($$payload2, {
        strategies,
        categoriesTreeView,
        assemblyComponent,
        onSave: (component) => {
          assemblyComponent = component;
          editDialogOpen = false;
        },
        get open() {
          return editDialogOpen;
        },
        set open($$value) {
          editDialogOpen = $$value;
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
  bind_props($$props, { assemblyComponent });
  pop();
}
function AssemblyGroupStructureAddButton($$payload, $$props) {
  let onAddAssemblyGroup = $$props["onAddAssemblyGroup"];
  let onAddAssemblyComponent = fallback($$props["onAddAssemblyComponent"], () => {
  });
  let showAddAssemblyComponent = fallback($$props["showAddAssemblyComponent"], true);
  $$payload.out += `<div class="assembly-group-structure-add-button svelte-1ijejwk"><div class="prefix-block svelte-1ijejwk"><div class="prefix-block-1 svelte-1ijejwk"> </div> <div class="prefix-block-2 svelte-1ijejwk"> </div></div> <div class="text-container svelte-1ijejwk"><div class="assembly-group-text svelte-1ijejwk" role="button" tabindex="0"><i class="material-icons">add</i> Baugruppe</div> `;
  if (showAddAssemblyComponent) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-divider svelte-1ijejwk"></div> <div class="assembly-component-text svelte-1ijejwk" role="button" tabindex="0"><i class="material-icons">add</i> Komponente</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, {
    onAddAssemblyGroup,
    onAddAssemblyComponent,
    showAddAssemblyComponent
  });
}
function AddAssemblyGroupDialog($$payload, $$props) {
  push();
  let { open = undefined, onSave } = $$props;
  let name = "";
  let invalidName = false;
  function saveNewGroup() {
    if (!name || name.trim() === "") {
      invalidName = true;
      return;
    }
    const group = new AssemblyGroupTreeViewModel();
    group.name = name;
    onSave(group);
    name = "";
    open = false;
  }
  function cancel() {
    name = "";
    open = false;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Dialog($$payload2, {
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
            $$payload4.out += `<span data-testid="dialog-title">Neue Baugruppe</span>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Content($$payload3, {
          children: ($$payload4) => {
            Textfield($$payload4, {
              required: true,
              invalid: invalidName,
              style: "width: 100%;",
              onkeydown: (e) => e.key === "Enter" && saveNewGroup(),
              label: "Name",
              get value() {
                return name;
              },
              set value($$value) {
                name = $$value;
                $$settled = false;
              }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <div class="actions svelte-xq993">`;
        Button($$payload3, {
          class: "cancel-button",
          onclick: () => cancel(),
          children: ($$payload4) => {
            $$payload4.out += `<!---->Abbrechen`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Button($$payload3, {
          onclick: () => saveNewGroup(),
          children: ($$payload4) => {
            $$payload4.out += `<!---->Speichern`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----></div>`;
      },
      $$slots: { default: true }
    });
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { open });
  pop();
}
function AssemblyGroupForm_1($$payload, $$props) {
  push();
  let {
    assemblyGroup = undefined,
    onDeleteAssemblyGroup,
    onMoveUp,
    onMoveDown,
    canMoveUp,
    canMoveDown,
    level,
    lastChild,
    strategies,
    categoriesTreeView
  } = $$props;
  assemblyGroup.name;
  let children = assemblyGroup.children;
  let addAssemblyGroupDialogOpen = false;
  let addAssemblyComponentDialogOpen = false;
  function addSubAssemblyGroup(newAssemblyGroup) {
    newAssemblyGroup.parent = assemblyGroup;
    children.push(newAssemblyGroup);
    console.log(children);
  }
  function updateAssemblyComponent(updatedComponent) {
    const index = children.findIndex((child) => child.id === updatedComponent.id);
    if (index !== -1) {
      children[index] = updatedComponent;
    }
  }
  function addAssemblyComponent(assemblyComponent) {
    assemblyComponent.parent = assemblyGroup;
    children.push(assemblyComponent);
    console.log(children);
  }
  function deleteAssemblyGroupFromChildren(index) {
    children.splice(index, 1);
  }
  function moveGroupUp(index) {
    if (index === 0) return;
    const group = children[index];
    children[index] = children[index - 1];
    children[index - 1] = group;
  }
  function moveGroupDown(index) {
    if (index === children.length - 1) return;
    const group = children[index];
    children[index] = children[index + 1];
    children[index + 1] = group;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="group-form svelte-i93m5w"${attr("style", `margin-bottom: ${stringify(lastChild ? "0" : "16px")}`)}><div class="group-form-prefix-borders svelte-i93m5w"><div class="group-form-prefix-borders-1 svelte-i93m5w"> </div> <div class="group-form-prefix-borders-2 svelte-i93m5w"> </div></div> <div class="group-form-content svelte-i93m5w"><div class="assembly-header svelte-i93m5w">`;
    Textfield($$payload2, {
      variant: "filled",
      label: "Name",
      get value() {
        return assemblyGroup.name;
      },
      set value($$value) {
        assemblyGroup.name = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    IconButton($$payload2, {
      class: "material-icons",
      disabled: !canMoveUp,
      onclick: () => onMoveUp(),
      children: ($$payload3) => {
        $$payload3.out += `<!---->keyboard_arrow_up`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    IconButton($$payload2, {
      class: "material-icons",
      disabled: !canMoveDown,
      onclick: () => onMoveDown(),
      children: ($$payload3) => {
        $$payload3.out += `<!---->keyboard_arrow_down`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    IconButton($$payload2, {
      onclick: () => onDeleteAssemblyGroup(),
      children: ($$payload3) => {
        $$payload3.out += `<i class="material-icons">delete</i>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div><div class="expand-button svelte-i93m5w" role="button" tabindex="0">${escape_html("▼")}</div></div> `;
    {
      $$payload2.out += "<!--[-->";
      if (children && children.length > 0) {
        $$payload2.out += "<!--[-->";
        const each_array = ensure_array_like(children);
        $$payload2.out += `<div class="children-groups-container svelte-i93m5w"><div class="vertical-border svelte-i93m5w"> </div> <div class="children-groups svelte-i93m5w"><!--[-->`;
        for (let i = 0, $$length = each_array.length; i < $$length; i++) {
          let child = each_array[i];
          if (child.type === "assembly-component") {
            $$payload2.out += "<!--[-->";
            AssemblyComponentForm($$payload2, {
              strategies,
              level: level + 1,
              lastChild: i === children.length - 1,
              canMoveUp: i > 0,
              canMoveDown: i !== children.length - 1,
              onMoveUp: () => moveGroupUp(i),
              onMoveDown: () => moveGroupDown(i),
              categoriesTreeView,
              onDeleteAssemblyComponent: () => deleteAssemblyGroupFromChildren(i),
              onUpdateComponent: updateAssemblyComponent,
              get assemblyComponent() {
                return children[i];
              },
              set assemblyComponent($$value) {
                children[i] = $$value;
                $$settled = false;
              }
            });
          } else {
            $$payload2.out += "<!--[!-->";
            AssemblyGroupForm_1($$payload2, {
              level: level + 1,
              strategies,
              lastChild: i !== children.length - 1,
              canMoveUp: i > 0,
              canMoveDown: i === children.length - 1,
              onMoveUp: () => moveGroupUp(i),
              onMoveDown: () => moveGroupDown(i),
              categoriesTreeView,
              onDeleteAssemblyGroup: () => deleteAssemblyGroupFromChildren(i),
              get assemblyGroup() {
                return children[i];
              },
              set assemblyGroup($$value) {
                children[i] = $$value;
                $$settled = false;
              }
            });
          }
          $$payload2.out += `<!--]-->`;
        }
        $$payload2.out += `<!--]--></div></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      AssemblyGroupStructureAddButton($$payload2, {
        onAddAssemblyGroup: () => addAssemblyGroupDialogOpen = true,
        onAddAssemblyComponent: () => addAssemblyComponentDialogOpen = true,
        showAddAssemblyComponent: true
      });
      $$payload2.out += `<!----> `;
      if (addAssemblyGroupDialogOpen) {
        $$payload2.out += "<!--[-->";
        AddAssemblyGroupDialog($$payload2, {
          onSave: (group) => addSubAssemblyGroup(group),
          get open() {
            return addAssemblyGroupDialogOpen;
          },
          set open($$value) {
            addAssemblyGroupDialogOpen = $$value;
            $$settled = false;
          }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (addAssemblyComponentDialogOpen) {
        $$payload2.out += "<!--[-->";
        AssemblyComponentDialog($$payload2, {
          strategies,
          categoriesTreeView,
          onSave: (component) => addAssemblyComponent(component),
          get open() {
            return addAssemblyComponentDialogOpen;
          },
          set open($$value) {
            addAssemblyComponentDialogOpen = $$value;
            $$settled = false;
          }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    }
    $$payload2.out += `<!--]--></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { assemblyGroup });
  pop();
}
function ThresholdStrategyForm($$payload, $$props) {
  push();
  let { strategies = undefined, product } = $$props;
  function addStrategy() {
    strategies.push({
      id: v4(),
      name: "",
      priority: strategies.length + 1,
      product
    });
  }
  function removeStrategy(index) {
    strategies.splice(index, 1);
  }
  function moveUp(index) {
    if (index === 0) return;
    const strategy = strategies[index];
    strategy.priority = strategy.priority - 1;
    strategies[index] = strategies[index - 1];
    strategies[index - 1] = strategy;
    strategies[index].priority = strategies[index].priority + 1;
  }
  function moveDown(index) {
    if (index === strategies.length - 1) return;
    const strategy = strategies[index];
    strategy.priority = strategy.priority + 1;
    strategies[index] = strategies[index + 1];
    strategies[index + 1] = strategy;
    strategies[index].priority = strategies[index].priority - 1;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(strategies);
    $$payload2.out += `<!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      each_array[index];
      $$payload2.out += `<div style="display: flex; margin-top: 12px;">`;
      IconButton($$payload2, {
        class: "material-icons",
        disabled: index === 0,
        onclick: () => moveUp(index),
        children: ($$payload3) => {
          $$payload3.out += `<!---->keyboard_arrow_up`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      IconButton($$payload2, {
        class: "material-icons",
        disabled: index === strategies.length - 1,
        onclick: () => moveDown(index),
        children: ($$payload3) => {
          $$payload3.out += `<!---->keyboard_arrow_down`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Textfield($$payload2, {
        style: "width: 200px",
        label: "Name",
        get value() {
          return strategies[index].name;
        },
        set value($$value) {
          strategies[index].name = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      IconButton($$payload2, {
        class: "material-icons",
        onclick: () => removeStrategy(index),
        children: ($$payload3) => {
          $$payload3.out += `<!---->delete`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div>`;
    }
    $$payload2.out += `<!--]--> <div style="display: flex; margin-top: 12px;">`;
    Button($$payload2, {
      onclick: addStrategy,
      children: ($$payload3) => {
        CommonIcon($$payload3, {
          class: "material-icons",
          children: ($$payload4) => {
            $$payload4.out += `<!---->add`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> Strategie hinzufügen`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { strategies });
  pop();
}
function _page($$payload, $$props) {
  push();
  HeaderService.Instance.setTitle("Konfiguration");
  let { data } = $$props;
  let {
    id,
    productTreeView,
    categoriesTreeView,
    ...rest
  } = data;
  let saveDialogOpen = false;
  console.log("props", id, productTreeView, categoriesTreeView, rest);
  let product = !id ? new ProductTreeViewModel() : productTreeView;
  let addAssemblyGroupDialogOpen = false;
  let strategies = productTreeView.fixStrategies.sort((a, b) => a.priority - b.priority) ?? [];
  let assemblyGroups = product.assemblyGroups;
  function addAssemblyGroup(assemblyGroup) {
    assemblyGroup.parent = product;
    assemblyGroups.push(assemblyGroup);
    console.log(product);
  }
  function removeAssemblyGroup(index) {
    assemblyGroups.splice(index, 1);
  }
  function moveGroupUp(index) {
    if (index === 0) return;
    const group = assemblyGroups[index];
    assemblyGroups[index] = assemblyGroups[index - 1];
    assemblyGroups[index - 1] = group;
  }
  function moveGroupDown(index) {
    if (index === assemblyGroups.length - 1) return;
    const group = assemblyGroups[index];
    assemblyGroups[index] = assemblyGroups[index + 1];
    assemblyGroups[index + 1] = group;
  }
  function saveProduct() {
    product.assemblyGroups = assemblyGroups;
    product.fixStrategies = strategies;
    product.createdAt = product.createdAt ?? /* @__PURE__ */ new Date();
    const elements = getElementsFromProductTreeView(product);
    console.log("elements", elements);
    fetch("/api/product/" + id + "?asTreeView=true", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(elements)
    });
    goto();
  }
  function goBack() {
    goto();
  }
  function leave() {
    goto();
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(assemblyGroups);
    $$payload2.out += `<section class="product-form svelte-i1r9uc"><div class="product-form-header svelte-i1r9uc">`;
    Button($$payload2, {
      class: "default-button",
      onclick: () => goBack(),
      children: ($$payload3) => {
        $$payload3.out += `<i class="material-icons">arrow_back</i> <span>Zurück</span>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <h1 class="svelte-i1r9uc">Produkt hinzufügen</h1> `;
    Button($$payload2, {
      onclick: saveProduct,
      children: ($$payload3) => {
        $$payload3.out += `<i class="material-icons">save</i> <span>Speichern</span>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div class="product-form-content svelte-i1r9uc"><div class="name-field svelte-i1r9uc">`;
    Textfield($$payload2, {
      variant: "filled",
      label: "Produktname",
      get value() {
        return product.name;
      },
      set value($$value) {
        product.name = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <h3>Baugruppenstruktur</h3> <div class="assembly-group-structure svelte-i1r9uc"><div class="children-groups-container svelte-i1r9uc"><div class="vertical-border svelte-i1r9uc"> </div> <div class="children-groups svelte-i1r9uc"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      each_array[i];
      AssemblyGroupForm_1($$payload2, {
        strategies,
        level: 1,
        canMoveUp: i > 0,
        canMoveDown: i !== assemblyGroups.length - 1,
        onMoveUp: () => moveGroupUp(i),
        onMoveDown: () => moveGroupDown(i),
        lastChild: i === assemblyGroups.length - 1,
        categoriesTreeView,
        onDeleteAssemblyGroup: () => removeAssemblyGroup(i),
        get assemblyGroup() {
          return assemblyGroups[i];
        },
        set assemblyGroup($$value) {
          assemblyGroups[i] = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--></div></div> `;
    AssemblyGroupStructureAddButton($$payload2, {
      onAddAssemblyGroup: () => addAssemblyGroupDialogOpen = true,
      showAddAssemblyComponent: false
    });
    $$payload2.out += `<!----></div> `;
    AddAssemblyGroupDialog($$payload2, {
      onSave: (group) => addAssemblyGroup(group),
      get open() {
        return addAssemblyGroupDialogOpen;
      },
      set open($$value) {
        addAssemblyGroupDialogOpen = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <h3 style="margin-top: 32px">Fix Strategien</h3> `;
    ThresholdStrategyForm($$payload2, {
      product: productTreeView,
      get strategies() {
        return strategies;
      },
      set strategies($$value) {
        strategies = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> `;
    Dialog($$payload2, {
      class: "dialog",
      get open() {
        return saveDialogOpen;
      },
      set open($$value) {
        saveDialogOpen = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Title($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Änderungen speichern`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<p>Möchten Sie die Änderungen vor dem Verlassen speichern oder verwerfen?</p>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Actions($$payload3, {
          children: ($$payload4) => {
            Button($$payload4, {
              onclick: leave,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Verwerfen`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Button($$payload4, {
              onclick: saveProduct,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Speichern`;
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
    $$payload2.out += `<!----></section>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C65U8ghY.js.map
