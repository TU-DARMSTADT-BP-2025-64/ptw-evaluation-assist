import { a2 as copy_payload, a3 as assign_payload, x as pop, a8 as ensure_array_like, a4 as attr, a5 as escape_html, v as push, ae as stringify } from './exports-nrxFiPmG.js';
import { H as HeaderService, B as Button, D as Dialog, T as Title, C as Content } from './Content-C6Tb3HUF.js';
import { C as CommonIcon } from './Svg-B0FOppr7.js';
import { I as IconButton } from './IconButton-DRCYvsoJ.js';
import { A as Actions } from './Actions-Dve6f2mv.js';
import { T as Textfield } from './Textfield-CwKIeuzn.js';
import { b as MachineElementCriteriaViewModel } from './machine-element.model-Bo59uC8d.js';
import { g as getElementsFromCategoriesTreeView, M as MachineElementCategoryTreeViewModel, a as MachineElementTreeViewModel } from './CategoriesTreeViewUtil.svelte-CzM3UK9J.js';
import { g as goto } from './client-Dx9mIOam.js';
import './events-CxLtQAvh.js';
import 'uuid';

function _page($$payload, $$props) {
  push();
  HeaderService.Instance.setTitle("Kategorien");
  const { data } = $$props;
  const treeView = data.categoriesTreeView;
  let selectedCategory = null;
  let selectedElement = null;
  let categoryDialogOpen = false;
  let editedCategory = null;
  let categoryName = "";
  let addElementDialogOpen = false;
  let editedElement = null;
  let elementName = "";
  let addCriterionDialogOpen = false;
  let editedCriterion = null;
  let criterionName = "";
  function editCategory(category, event) {
    event.stopPropagation();
    event.preventDefault();
    editedCategory = category;
    categoryName = category.name;
    categoryDialogOpen = true;
  }
  function editElement(element, event) {
    event.stopPropagation();
    event.preventDefault();
    editedElement = element;
    elementName = element.name;
    addElementDialogOpen = true;
  }
  function editCriterion(criterion) {
    editedCriterion = criterion;
    criterionName = criterion.name;
    addCriterionDialogOpen = true;
  }
  function deleteCategory(index, event) {
    event.stopPropagation();
    event.preventDefault();
    if (selectedCategory?.id === treeView[index].id) {
      selectedCategory = null;
    }
    treeView.splice(index, 1);
  }
  function deleteElement(index, event) {
    event.stopPropagation();
    event.preventDefault();
    if (selectedElement?.id === selectedCategory.elements[index].id) {
      console.log("clear selected element");
      selectedElement = null;
    }
    selectedCategory.elements.splice(index, 1);
  }
  function deleteCriterion(index) {
    selectedElement.criteria.splice(index, 1);
  }
  function saveCategory() {
    if (editedCategory) {
      editedCategory.name = categoryName;
    } else {
      treeView.push(new MachineElementCategoryTreeViewModel({ name: categoryName, elements: [] }));
    }
    categoryDialogOpen = false;
    editedCategory = null;
    categoryName = "";
  }
  function saveElement() {
    if (editedElement) {
      editedElement.name = elementName;
    } else {
      selectedCategory.elements.push(new MachineElementTreeViewModel({ name: elementName, criteria: [] }));
    }
    addElementDialogOpen = false;
    editedElement = null;
    elementName = "";
  }
  function saveCriterion() {
    if (editedCriterion) {
      editedCriterion.name = criterionName;
    } else {
      selectedElement.criteria.push(new MachineElementCriteriaViewModel({ name: criterionName }));
    }
    addCriterionDialogOpen = false;
    editedCriterion = null;
    criterionName = "";
  }
  function goBack() {
    goto();
  }
  async function saveCategories() {
    const elements = getElementsFromCategoriesTreeView(treeView);
    const saveResponse = await fetch("/api/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(elements)
    });
    if (saveResponse.ok) {
      goto();
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(treeView);
    $$payload2.out += `<section class="svelte-19c8gnv"><div class="categories-header svelte-19c8gnv">`;
    Button($$payload2, {
      class: "default-button",
      onclick: () => goBack(),
      children: ($$payload3) => {
        $$payload3.out += `<i class="material-icons">arrow_back</i> <span>Zurück</span>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <h1>Kategorien</h1> `;
    Button($$payload2, {
      onclick: saveCategories,
      children: ($$payload3) => {
        $$payload3.out += `<i class="material-icons">save</i> <span>Speichern</span>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div class="categories-container svelte-19c8gnv"><div class="categories svelte-19c8gnv"><div class="title svelte-19c8gnv">Maschinenelement Kategorien</div> <div><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let category = each_array[i];
      $$payload2.out += `<div${attr("class", `${stringify("category-btn " + (selectedCategory === category ? "selected" : ""))} svelte-19c8gnv`)} role="button" tabindex="0"><div class="label svelte-19c8gnv">${escape_html(category.name)}</div> <div class="actions svelte-19c8gnv">`;
      IconButton($$payload2, {
        class: "material-icons small-icon-button",
        onclick: (e) => editCategory(category, e),
        children: ($$payload3) => {
          $$payload3.out += `<!---->edit`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      IconButton($$payload2, {
        class: "material-icons small-icon-button",
        onclick: (e) => deleteCategory(i, e),
        children: ($$payload3) => {
          $$payload3.out += `<!---->delete`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div></div>`;
    }
    $$payload2.out += `<!--]--> `;
    Button($$payload2, {
      onclick: () => categoryDialogOpen = true,
      children: ($$payload3) => {
        CommonIcon($$payload3, {
          class: "material-icons",
          children: ($$payload4) => {
            $$payload4.out += `<!---->add`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> Kategorie hinzufügen`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div></div> <div class="elements svelte-19c8gnv"><div class="title svelte-19c8gnv">Maschinenelement</div> <div>`;
    if (selectedCategory != null) {
      $$payload2.out += "<!--[-->";
      const each_array_1 = ensure_array_like(selectedCategory.elements);
      $$payload2.out += `<!--[-->`;
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let element = each_array_1[i];
        $$payload2.out += `<div${attr("class", `${stringify("category-btn " + (selectedElement === element ? "selected" : ""))} svelte-19c8gnv`)} role="button" tabindex="0"><div class="label svelte-19c8gnv">${escape_html(element.name)}</div> <div class="actions svelte-19c8gnv">`;
        IconButton($$payload2, {
          class: "material-icons small-icon-button",
          onclick: (e) => editElement(element, e),
          children: ($$payload3) => {
            $$payload3.out += `<!---->edit`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> `;
        IconButton($$payload2, {
          class: "material-icons small-icon-button",
          onclick: (e) => deleteElement(i, e),
          children: ($$payload3) => {
            $$payload3.out += `<!---->delete`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----></div></div>`;
      }
      $$payload2.out += `<!--]--> `;
      Button($$payload2, {
        onclick: () => addElementDialogOpen = true,
        children: ($$payload3) => {
          CommonIcon($$payload3, {
            class: "material-icons",
            children: ($$payload4) => {
              $$payload4.out += `<!---->add`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> Element hinzufügen`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></div> <div class="criteria svelte-19c8gnv"><div class="title svelte-19c8gnv">Kriterien</div> <div>`;
    if (selectedElement != null) {
      $$payload2.out += "<!--[-->";
      const each_array_2 = ensure_array_like(selectedElement.criteria);
      $$payload2.out += `<!--[-->`;
      for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
        let criterion = each_array_2[i];
        $$payload2.out += `<div class="category-btn svelte-19c8gnv"><div class="label svelte-19c8gnv">${escape_html(criterion.name)}</div> <div class="actions svelte-19c8gnv">`;
        IconButton($$payload2, {
          class: "material-icons small-icon-button",
          onclick: () => editCriterion(criterion),
          children: ($$payload3) => {
            $$payload3.out += `<!---->edit`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> `;
        IconButton($$payload2, {
          class: "material-icons small-icon-button",
          onclick: () => deleteCriterion(i),
          children: ($$payload3) => {
            $$payload3.out += `<!---->delete`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----></div></div>`;
      }
      $$payload2.out += `<!--]--> `;
      Button($$payload2, {
        onclick: () => addCriterionDialogOpen = true,
        children: ($$payload3) => {
          CommonIcon($$payload3, {
            class: "material-icons",
            children: ($$payload4) => {
              $$payload4.out += `<!---->add`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> Kriterium hinzufügen`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></div></div></section> `;
    Dialog($$payload2, {
      get open() {
        return categoryDialogOpen;
      },
      set open($$value) {
        categoryDialogOpen = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Title($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->${escape_html(editedCategory ? "Kategorie bearbeiten" : "Neue Kategorie")}`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Content($$payload3, {
          children: ($$payload4) => {
            Textfield($$payload4, {
              label: "Name",
              get value() {
                return categoryName;
              },
              set value($$value) {
                categoryName = $$value;
                $$settled = false;
              }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Actions($$payload3, {
          children: ($$payload4) => {
            Button($$payload4, {
              onclick: () => categoryDialogOpen = false,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Abbrechen`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Button($$payload4, {
              onclick: () => saveCategory(),
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
    $$payload2.out += `<!----> `;
    Dialog($$payload2, {
      get open() {
        return addElementDialogOpen;
      },
      set open($$value) {
        addElementDialogOpen = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Title($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->${escape_html(editedElement ? "Element bearbeiten" : "Neues Element")}`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Content($$payload3, {
          children: ($$payload4) => {
            Textfield($$payload4, {
              label: "Name",
              get value() {
                return elementName;
              },
              set value($$value) {
                elementName = $$value;
                $$settled = false;
              }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Actions($$payload3, {
          children: ($$payload4) => {
            Button($$payload4, {
              onclick: () => addElementDialogOpen = false,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Abbrechen`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Button($$payload4, {
              onclick: () => saveElement(),
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
    $$payload2.out += `<!----> `;
    Dialog($$payload2, {
      get open() {
        return addCriterionDialogOpen;
      },
      set open($$value) {
        addCriterionDialogOpen = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Title($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->${escape_html(editedCriterion ? "Kriterium bearbeiten" : "Neues Kriterium")}`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Content($$payload3, {
          children: ($$payload4) => {
            Textfield($$payload4, {
              label: "Name",
              get value() {
                return criterionName;
              },
              set value($$value) {
                criterionName = $$value;
                $$settled = false;
              }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Actions($$payload3, {
          children: ($$payload4) => {
            Button($$payload4, {
              onclick: () => addCriterionDialogOpen = false,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Abbrechen`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Button($$payload4, {
              onclick: () => saveCriterion(),
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

export { _page as default };
//# sourceMappingURL=_page.svelte-BCDOsgb6.js.map
