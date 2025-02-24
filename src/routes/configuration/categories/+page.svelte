<script lang="ts">
	import type { CategoriesTreeView } from '$lib/util/CategoriesTreeViewUtil.svelte';
	import Button from '@smui/button';
	import { Icon } from '@smui/common';
	import IconButton from '@smui/icon-button';
	import Dialog from '@smui/dialog';
	import Textfield from '@smui/textfield';
	import { Title, Content, Actions } from '@smui/dialog';
	import { HeaderService } from '../../HeaderService.svelte';
	import { MachineElementCriteriaViewModel } from '$lib/models/machine-element-criteria.model';
	import { getElementsFromCategoriesTreeView, MachineElementCategoryTreeViewModel, MachineElementTreeViewModel } from '$lib/util/CategoriesTreeViewUtil.svelte';
	import { goto } from '$app/navigation';

	HeaderService.Instance.setTitle('Kategorien');

	const { data }: { data: { categoriesTreeView: CategoriesTreeView } } = $props();

    const treeView = $state(data.categoriesTreeView);
	

	let selectedCategory: MachineElementCategoryTreeViewModel | null = $state(null);
	let selectedElement: MachineElementTreeViewModel | null = $state(null);

	let categoryDialogOpen = $state(false);
	let editedCategory: MachineElementCategoryTreeViewModel | null = $state(null);
	let categoryName = $state('');

	let addElementDialogOpen = $state(false);
	let editedElement: MachineElementTreeViewModel | null = $state(null);
	let elementName = $state('');

	let addCriterionDialogOpen = $state(false);
	let editedCriterion: MachineElementCriteriaViewModel | null = $state(null);
	let criterionName = $state('');

    function editCategory(category: MachineElementCategoryTreeViewModel) {
        editedCategory = category;
        categoryName = category.name;
        categoryDialogOpen = true;
    }

    function editElement(element: MachineElementTreeViewModel) {
        editedElement = element;
        elementName = element.name;
        addElementDialogOpen = true;
    }

    function editCriterion(criterion: MachineElementCriteriaViewModel) {
        editedCriterion = criterion;
        criterionName = criterion.name;
        addCriterionDialogOpen = true;
    }


    function deleteCategory(index: number) {
        if (selectedCategory === treeView[index]) {
            selectedCategory = null;
        }

        treeView.splice(index, 1);
    }

    function deleteElement(index: number) {
        if (selectedElement === selectedCategory!.elements[index]) {
            selectedElement = null;
        }

        selectedCategory!.elements.splice(index, 1);
    }

    function deleteCriterion(index: number) {
        selectedElement!.criteria.splice(index, 1);
    }

	function saveCategory() {
		if (editedCategory) {
			editedCategory.name = categoryName;
		} else {
			treeView.push(
				new MachineElementCategoryTreeViewModel({
					name: categoryName,
					elements: []
				})
			);
		}

		categoryDialogOpen = false;
		editedCategory = null;
	}

    

	function saveElement() {
		if (editedElement) {
			editedElement.name = elementName;
		} else {
			selectedCategory!.elements.push(
				new MachineElementTreeViewModel({
					name: elementName,
					criteria: []
				})
			);
		}

		addElementDialogOpen = false;
		editedElement = null;
	}

	function saveCriterion() {
		if (editedCriterion) {
			editedCriterion.name = criterionName;
		} else {
			selectedElement!.criteria.push(
				new MachineElementCriteriaViewModel({
					name: criterionName
				})
			);
		}

		addCriterionDialogOpen = false;
		editedCriterion = null;
	}

    function goBack() {
        goto('/configuration');
    }

    async function saveCategories() {

        const elements = getElementsFromCategoriesTreeView(treeView);

        const saveResponse = await fetch('/api/categories', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(elements)
        });

        if (saveResponse.ok) {
            goto('/configuration');
        }
        
    }
</script>

<section>
    <div class="categories-header">
		<Button class="default-button" onclick={() => goBack()}>
			<i class="material-icons">arrow_back</i>
			<span>Zurück</span>
		</Button>
		<h1>Kategorien</h1>

		<Button onclick={saveCategories}>
			<i class="material-icons">save</i>
			<span>Speichern</span>
		</Button>
    </div>
	<div class="categories-container">
		<div class="categories">
			<div class="title">Kategorien</div>
			<div>
				{#each treeView as category, i}
					<div
						class={'category-btn ' + (selectedCategory === category ? 'selected' : '')}
						role="button"
						tabindex="0"
						onkeydown={(e) => {
							if (e.key === 'Enter') selectedCategory = category;
						}}
						onclick={() => (selectedCategory = category)}>
						<div class="label">{category.name}</div>
						<div class="actions">
							<IconButton class="material-icons small-icon-button" onclick={() => editCategory(category)}>edit</IconButton>
							<IconButton class="material-icons small-icon-button" onclick={() => deleteCategory(i)}>delete</IconButton>
						</div>
					</div>
				{/each}

				<Button onclick={() => (categoryDialogOpen = true)}>
					<Icon class="material-icons">add</Icon>
					Kategorie hinzufügen
				</Button>
			</div>
		</div>
		<div class="elements">
			<div class="title">Elemente</div>

			<div>
				{#if selectedCategory}
					{#each selectedCategory.elements as element, i}
						<div
							class={'category-btn ' + (selectedElement === element ? 'selected' : '')}
							role="button"
							tabindex="0"
							onkeydown={(e) => {
								if (e.key === 'Enter') selectedElement = element;
							}}
							onclick={() => (selectedElement = element)}>
							<div class="label">{element.name}</div>

							<div class="actions">
								<IconButton class="material-icons small-icon-button" onclick={() => editElement(element)}>edit</IconButton>
								<IconButton class="material-icons small-icon-button" onclick={() => deleteElement(i)}>delete</IconButton>
							</div>
						</div>
					{/each}
					<Button onclick={() => (addElementDialogOpen = true)}>
						<Icon class="material-icons">add</Icon>
						Element hinzufügen
					</Button>
				{/if}
			</div>
		</div>
		<div class="criteria">
			<div class="title">Kriterien</div>

			<div>
				{#if selectedElement}
					{#each selectedElement.criteria as criterion, i}
						<div class="category-btn">
							<div class="label">{criterion.name}</div>

							<div class="actions">
								<IconButton class="material-icons small-icon-button" onclick={() => editCriterion(criterion)}>edit</IconButton>
								<IconButton class="material-icons small-icon-button" onclick={() => deleteElement(i)}>delete</IconButton>
							</div>
						</div>
					{/each}

					<Button onclick={() => (addCriterionDialogOpen = true)}> 
						<Icon class="material-icons">add</Icon>
						Kriterium hinzufügen
					</Button>
				{/if}
			</div>
		</div>
	</div>
</section>

<Dialog bind:open={categoryDialogOpen}>
	<Title>{editedCategory ? 'Kategorie bearbeiten' : 'Neue Kategorie'}</Title>
	<Content>
		<Textfield label="Name" bind:value={categoryName}></Textfield>
	</Content>
	<Actions>
		<Button onclick={() => (categoryDialogOpen = false)}>Abbrechen</Button>
		<Button onclick={() => saveCategory()}>Speichern</Button>
	</Actions>
</Dialog>

<Dialog bind:open={addElementDialogOpen}>
	<Title>{editedElement ? 'Element bearbeiten' : 'Neues Element'}</Title>
	<Content>
		<Textfield label="Name" bind:value={elementName}></Textfield>
	</Content>
	<Actions>
		<Button onclick={() => (addElementDialogOpen = false)}>Abbrechen</Button>
		<Button onclick={() => saveElement()}>Speichern</Button>
	</Actions>
</Dialog>

<Dialog bind:open={addCriterionDialogOpen}>
	<Title>{editedCriterion ? 'Kriterium bearbeiten' : 'Neues Kriterium'}</Title>
	<Content>
		<Textfield label="Name" bind:value={criterionName}></Textfield>
	</Content>
	<Actions>
		<Button onclick={() => (addCriterionDialogOpen = false)}>Abbrechen</Button>
		<Button onclick={() => saveCriterion()}>Speichern</Button>
	</Actions>
</Dialog>

<style>
	section {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

    .categories-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
        margin-bottom: 12px;
	}

	.categories-container {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
	}

	.categories-container > div {
		width: 33%;
		max-width: 400px;
		padding-left: 8px;
	}

	.categories,
	.elements {
		border-right: 1px solid var(--mdc-theme-primary);
	}

	.category-btn {
		padding: 8px;
		cursor: pointer;
		overflow: hidden;
		text-overflow: ellipsis;
		display: flex;
		justify-content: space-between;
        align-items: center;
	}

	.category-btn.selected {
		background-color: var(--mdc-theme-primary);
		color: white;
	}

	.title {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 8px;
	}

	:global(.small-icon-button) {
		width: 30px !important;
		height: 30px !important;
		font-size: 20px !important;
	}

	.actions {
		display: flex;
		gap: 6px;
	}

    .label {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
