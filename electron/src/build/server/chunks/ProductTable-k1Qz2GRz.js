import { a2 as copy_payload, a3 as assign_payload, x as pop, v as push, ac as getContext, w as setContext, a9 as spread_attributes, aa as clsx, a4 as attr, ab as bind_props, a5 as escape_html, Z as writable, a8 as ensure_array_like, a6 as store_get, ae as stringify, a7 as unsubscribe_stores } from './exports-nrxFiPmG.js';
import { D as Dialog, T as Title, C as Content, B as Button, o as onDestroy, c as classMap, e as exclude, p as prefixFilter } from './Content-C6Tb3HUF.js';
import { C as CommonLabel } from './CommonLabel-KC9Kte7x.js';
import { C as CommonIcon } from './Svg-B0FOppr7.js';
import { T as Textfield } from './Textfield-CwKIeuzn.js';
import { S as Select, O as Option } from './Option-pkJC_U-2.js';
import { I as IconButton } from './IconButton-DRCYvsoJ.js';

function DataTable($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    stickyHeader = false,
    sortable = false,
    sort = null,
    sortDirection = "ascending",
    sortAscendingAriaLabel = "sorted, ascending",
    sortDescendingAriaLabel = "sorted, descending",
    container$use = [],
    container$class = "",
    table$use = [],
    table$class = "",
    children,
    progress,
    paginate,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let instance = undefined;
  let internalClasses = {};
  let progressIndicatorStyles = { height: "auto", top: "initial" };
  let addLayoutListener = getContext("SMUI:addLayoutListener");
  let removeLayoutListener;
  let progressClosed = writable(false);
  let sortStore = writable(sort);
  let sortDirectionStore = writable(sortDirection);
  setContext("SMUI:checkbox:context", "data-table");
  setContext("SMUI:linear-progress:context", "data-table");
  setContext("SMUI:linear-progress:closed", progressClosed);
  setContext("SMUI:data-table:sortable", sortable);
  setContext("SMUI:data-table:sort", sortStore);
  setContext("SMUI:data-table:sortDirection", sortDirectionStore);
  setContext("SMUI:data-table:sortAscendingAriaLabel", sortAscendingAriaLabel);
  setContext("SMUI:data-table:sortDescendingAriaLabel", sortDescendingAriaLabel);
  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }
  setContext("SMUI:checkbox:mount", () => {
  });
  setContext("SMUI:data-table:header:mount", (accessor) => {
  });
  setContext("SMUI:data-table:header:unmount", () => {
  });
  setContext("SMUI:data-table:body:mount", (accessor) => {
  });
  setContext("SMUI:data-table:body:unmount", () => {
  });
  onDestroy(() => {
    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });
  function layout() {
    return instance?.layout();
  }
  function getElement() {
    return element;
  }
  $$payload.out += `<div${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-data-table": true,
      "mdc-data-table--sticky-header": stickyHeader,
      ...internalClasses
    })),
    ...exclude(restProps, ["container$", "table$"])
  })}><div${spread_attributes({
    class: clsx(classMap({
      [container$class]: true,
      "mdc-data-table__table-container": true
    })),
    ...prefixFilter(restProps, "container$")
  })}><table${spread_attributes({
    class: clsx(classMap({
      [table$class]: true,
      "mdc-data-table__table": true
    })),
    ...prefixFilter(restProps, "table$")
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></table></div> `;
  if (progress) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mdc-data-table__progress-indicator"${attr("style", Object.entries(progressIndicatorStyles).map(([name, value]) => `${name}: ${value};`).join(" "))}><div class="mdc-data-table__scrim"></div> `;
    progress?.($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  paginate?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { sort, sortDirection, layout, getElement });
  pop();
}
function Head($$payload, $$props) {
  push();
  let {
    use = [],
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  const cellAccessorMap = /* @__PURE__ */ new WeakMap();
  setContext("SMUI:data-table:row:header", true);
  const SMUICheckboxMount = getContext("SMUI:checkbox:mount");
  setContext("SMUI:checkbox:mount", (accessor) => {
    SMUICheckboxMount && SMUICheckboxMount(accessor);
  });
  const SMUICheckboxUnount = getContext("SMUI:checkbox:unmount");
  setContext("SMUI:checkbox:unmount", (accessor) => {
    SMUICheckboxUnount && SMUICheckboxUnount(accessor);
  });
  setContext("SMUI:data-table:cell:mount", (accessor) => {
    cellAccessorMap.set(accessor.element, accessor);
  });
  setContext("SMUI:data-table:cell:unmount", (accessor) => {
    cellAccessorMap.delete(accessor.element);
  });
  getContext("SMUI:data-table:header:mount");
  getContext("SMUI:data-table:header:unmount");
  function getElement() {
    return element;
  }
  $$payload.out += `<thead${spread_attributes({ ...restProps })}>`;
  children?.($$payload);
  $$payload.out += `<!----></thead>`;
  bind_props($$props, { getElement });
  pop();
}
function Body($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  const rowAccessorMap = /* @__PURE__ */ new WeakMap();
  setContext("SMUI:data-table:row:header", false);
  setContext("SMUI:data-table:row:mount", (accessor) => {
    rowAccessorMap.set(accessor.element, accessor);
  });
  setContext("SMUI:data-table:row:unmount", (accessor) => {
    rowAccessorMap.delete(accessor.element);
  });
  getContext("SMUI:data-table:body:mount");
  getContext("SMUI:data-table:body:unmount");
  function getElement() {
    return element;
  }
  $$payload.out += `<tbody${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-data-table__content": true
    })),
    ...restProps
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></tbody>`;
  bind_props($$props, { getElement });
  pop();
}
let counter$1 = 0;
function Row($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    rowId = "SMUI-data-table-row-" + counter$1++,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let checkbox = undefined;
  let internalClasses = {};
  let internalAttrs = {};
  let header = getContext("SMUI:data-table:row:header");
  const SMUICheckboxMount = getContext("SMUI:checkbox:mount");
  setContext("SMUI:checkbox:mount", (accessor) => {
    checkbox = accessor;
    SMUICheckboxMount && SMUICheckboxMount(accessor);
  });
  const SMUICheckboxUnount = getContext("SMUI:checkbox:unmount");
  setContext("SMUI:checkbox:unmount", (accessor) => {
    checkbox = undefined;
    SMUICheckboxUnount && SMUICheckboxUnount(accessor);
  });
  getContext("SMUI:data-table:row:mount");
  getContext("SMUI:data-table:row:unmount");
  function getElement() {
    return element;
  }
  $$payload.out += `<tr${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-data-table__header-row": header,
      "mdc-data-table__row": !header,
      "mdc-data-table__row--selected": !header && checkbox && checkbox.checked,
      ...internalClasses
    })),
    "aria-selected": checkbox ? checkbox.checked ? "true" : "false" : undefined,
    ...internalAttrs,
    ...restProps
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></tr>`;
  bind_props($$props, { getElement });
  pop();
}
let counter = 0;
function Cell($$payload, $$props) {
  push();
  var $$store_subs;
  let header = getContext("SMUI:data-table:row:header");
  let {
    use = [],
    class: className = "",
    numeric = false,
    checkbox = false,
    columnId = header ? "SMUI-data-table-column-" + counter++ : "SMUI-data-table-unused",
    sortable = getContext("SMUI:data-table:sortable"),
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  let internalClasses = {};
  let internalAttrs = {};
  let sort = getContext("SMUI:data-table:sort");
  let sortDirection = getContext("SMUI:data-table:sortDirection");
  let sortAscendingAriaLabel = getContext("SMUI:data-table:sortAscendingAriaLabel");
  let sortDescendingAriaLabel = getContext("SMUI:data-table:sortDescendingAriaLabel");
  if (sortable) {
    setContext("SMUI:label:context", "data-table:sortable-header-cell");
    setContext("SMUI:icon-button:context", "data-table:sortable-header-cell");
    setContext("SMUI:icon-button:aria-describedby", columnId + "-status-label");
  }
  getContext("SMUI:data-table:cell:mount");
  getContext("SMUI:data-table:cell:unmount");
  function getElement() {
    return element;
  }
  if (header) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<th${spread_attributes({
      class: clsx(classMap({
        [className]: true,
        "mdc-data-table__header-cell": true,
        "mdc-data-table__header-cell--numeric": numeric,
        "mdc-data-table__header-cell--checkbox": checkbox,
        "mdc-data-table__header-cell--with-sort": sortable,
        "mdc-data-table__header-cell--sorted": sortable && store_get($$store_subs ??= {}, "$sort", sort) === columnId,
        ...internalClasses
      })),
      role: "columnheader",
      scope: "col",
      "data-column-id": columnId,
      "aria-sort": sortable ? store_get($$store_subs ??= {}, "$sort", sort) === columnId ? store_get($$store_subs ??= {}, "$sortDirection", sortDirection) : "none" : undefined,
      ...internalAttrs,
      ...restProps
    })}>`;
    if (sortable) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="mdc-data-table__header-cell-wrapper">`;
      children?.($$payload);
      $$payload.out += `<!----> <div class="mdc-data-table__sort-status-label" aria-hidden="true"${attr("id", `${stringify(columnId)}-status-label`)}>${escape_html(store_get($$store_subs ??= {}, "$sort", sort) === columnId ? store_get($$store_subs ??= {}, "$sortDirection", sortDirection) === "ascending" ? sortAscendingAriaLabel : sortDescendingAriaLabel : "")}</div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      children?.($$payload);
      $$payload.out += `<!---->`;
    }
    $$payload.out += `<!--]--></th>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<td${spread_attributes({
      class: clsx(classMap({
        [className]: true,
        "mdc-data-table__cell": true,
        "mdc-data-table__cell--numeric": numeric,
        "mdc-data-table__cell--checkbox": checkbox,
        ...internalClasses
      })),
      ...internalAttrs,
      ...restProps
    })}>`;
    children?.($$payload);
    $$payload.out += `<!----></td>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { getElement });
  pop();
}
function Pagination($$payload, $$props) {
  push();
  let {
    use = [],
    class: className = "",
    trailing$use = [],
    trailing$class = "",
    children,
    rowsPerPage,
    total,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let element;
  setContext("SMUI:label:context", "data-table:pagination");
  setContext("SMUI:select:context", "data-table:pagination");
  setContext("SMUI:icon-button:context", "data-table:pagination");
  function getElement() {
    return element;
  }
  $$payload.out += `<div${spread_attributes({
    class: clsx(classMap({
      [className]: true,
      "mdc-data-table__pagination": true
    })),
    ...exclude(restProps, ["trailing$"])
  })}><div${spread_attributes({
    class: clsx(classMap({
      [trailing$class]: true,
      "mdc-data-table__pagination-trailing": true
    })),
    ...prefixFilter(restProps, "trailing$")
  })}>`;
  if (rowsPerPage) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mdc-data-table__pagination-rows-per-page">`;
    rowsPerPage?.($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="mdc-data-table__pagination-navigation">`;
  if (total) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mdc-data-table__pagination-total">`;
    total?.($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  children?.($$payload);
  $$payload.out += `<!----></div></div></div>`;
  bind_props($$props, { getElement });
  pop();
}
function ProductTable($$payload, $$props) {
  push();
  let {
    products,
    onProductClicked,
    showDelete = false,
    onProductDelete = () => {
    }
  } = $$props;
  let searchQuery = "";
  let verifyDeleteDialogOpen = false;
  let productToDelete = null;
  const filteredData = (() => {
    return products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.id === searchQuery);
  })();
  let perPage = 10;
  let currentPage = 0;
  const start = currentPage * perPage;
  const end = Math.min(start + perPage, filteredData.length);
  const slice = filteredData.slice(start, end);
  const lastPage = Math.max(Math.ceil(filteredData.length / perPage) - 1, 0);
  function verifyDelete(event, product) {
    event.stopPropagation();
    productToDelete = product;
    verifyDeleteDialogOpen = true;
  }
  function cancelDelete() {
    verifyDeleteDialogOpen = false;
    productToDelete = null;
  }
  function deleteProduct() {
    if (productToDelete) {
      onProductDelete(productToDelete);
      productToDelete = null;
    }
    verifyDeleteDialogOpen = false;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="product-table svelte-lp1j32"><div class="search-bar mdc-elevation--z1 svelte-lp1j32">`;
    {
      let leadingIcon = function($$payload3) {
        CommonIcon($$payload3, {
          style: "margin-left: 8px; margin-right: 4px",
          class: "material-icons",
          children: ($$payload4) => {
            $$payload4.out += `<!---->search`;
          },
          $$slots: { default: true }
        });
      };
      Textfield($$payload2, {
        style: "width: 100%",
        variant: "filled",
        label: "Suche",
        get value() {
          return searchQuery;
        },
        set value($$value) {
          searchQuery = $$value;
          $$settled = false;
        },
        leadingIcon,
        $$slots: { leadingIcon: true }
      });
    }
    $$payload2.out += `<!----></div> <div class="mdc-elevation--z1" style="width: 100%">`;
    {
      let paginate = function($$payload3) {
        {
          let total = function($$payload4) {
            $$payload4.out += `<!---->${escape_html(start + 1)}-${escape_html(end)} of ${escape_html(filteredData.length)}`;
          };
          Pagination($$payload3, {
            total,
            children: ($$payload4) => {
              CommonLabel($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Produkte pro Seite`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Select($$payload4, {
                variant: "outlined",
                noLabel: true,
                get value() {
                  return perPage;
                },
                set value($$value) {
                  perPage = $$value;
                  $$settled = false;
                },
                children: ($$payload5) => {
                  Option($$payload5, {
                    value: 10,
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->10`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Option($$payload5, {
                    value: 25,
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->25`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Option($$payload5, {
                    value: 100,
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->100`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->  `;
              IconButton($$payload4, {
                class: "material-icons",
                action: "first-page",
                title: "First page",
                onclick: () => currentPage = 0,
                disabled: currentPage === 0,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->first_page`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              IconButton($$payload4, {
                class: "material-icons",
                action: "prev-page",
                title: "Prev page",
                onclick: () => currentPage--,
                disabled: currentPage === 0,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->chevron_left`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              IconButton($$payload4, {
                class: "material-icons",
                action: "next-page",
                title: "Next page",
                onclick: () => currentPage++,
                disabled: currentPage === lastPage,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->chevron_right`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              IconButton($$payload4, {
                class: "material-icons",
                action: "last-page",
                title: "Last page",
                onclick: () => currentPage = lastPage,
                disabled: currentPage === lastPage,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->last_page`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { total: true, default: true }
          });
        }
      };
      DataTable($$payload2, {
        "table$aria-label": "Product List",
        style: "width: 100%;",
        paginate,
        children: ($$payload3) => {
          Head($$payload3, {
            children: ($$payload4) => {
              Row($$payload4, {
                children: ($$payload5) => {
                  Cell($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Produkt`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  if (showDelete) {
                    $$payload5.out += "<!--[-->";
                    Cell($$payload5, { style: "width: 100px" });
                  } else {
                    $$payload5.out += "<!--[!-->";
                  }
                  $$payload5.out += `<!--]-->`;
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Body($$payload3, {
            children: ($$payload4) => {
              const each_array = ensure_array_like(slice);
              $$payload4.out += `<!--[-->`;
              for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                let product = each_array[i];
                Row($$payload4, {
                  id: "product-table-row-" + i,
                  style: "cursor: pointer",
                  onclick: () => onProductClicked(product),
                  children: ($$payload5) => {
                    Cell($$payload5, {
                      children: ($$payload6) => {
                        $$payload6.out += `<!---->${escape_html(product.name)}`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload5.out += `<!----> `;
                    if (showDelete) {
                      $$payload5.out += "<!--[-->";
                      Cell($$payload5, {
                        style: "width: 100px;",
                        children: ($$payload6) => {
                          IconButton($$payload6, {
                            class: "material-icons",
                            action: "delete",
                            title: "Delete",
                            onclick: (event) => verifyDelete(event, product),
                            children: ($$payload7) => {
                              $$payload7.out += `<!---->delete`;
                            },
                            $$slots: { default: true }
                          });
                        },
                        $$slots: { default: true }
                      });
                    } else {
                      $$payload5.out += "<!--[!-->";
                    }
                    $$payload5.out += `<!--]-->`;
                  },
                  $$slots: { default: true }
                });
              }
              $$payload4.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { paginate: true, default: true }
      });
    }
    $$payload2.out += `<!----></div></div> `;
    Dialog($$payload2, {
      get open() {
        return verifyDeleteDialogOpen;
      },
      set open($$value) {
        verifyDeleteDialogOpen = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Title($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Produkt löschen`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<p>Wollen Sie das Produkt: <strong>${escape_html(productToDelete?.name)}</strong> wirklich löschen?</p>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <div class="actions svelte-lp1j32">`;
        Button($$payload3, {
          class: "color-unset",
          onclick: () => cancelDelete(),
          children: ($$payload4) => {
            $$payload4.out += `<!---->Abbrechen`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Button($$payload3, {
          onclick: () => deleteProduct(),
          children: ($$payload4) => {
            $$payload4.out += `<!---->Löschen`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----></div>`;
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
  pop();
}

export { ProductTable as P };
//# sourceMappingURL=ProductTable-k1Qz2GRz.js.map
