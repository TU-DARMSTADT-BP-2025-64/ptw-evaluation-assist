<script lang="ts">
	import { HeaderService } from '../../HeaderService.svelte';
	import Textfield from '@smui/textfield';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Ripple from '@smui/ripple';
	import Button from '@smui/button';
	import { ProductTreeViewModel } from '$lib/models/product.model';
	import { AssemblyGroupTreeViewModel } from '$lib/models/assembly-group.model';
	import AssemblyGroupForm from './components/AssemblyGroupForm.svelte';
	import AssemblyGroupStructureAddButton from './components/AssemblyGroupStructureAddButton.svelte';
	import AddAssemblyGroupDialog from './components/AddAssemblyGroupDialog.svelte';
	import { beforeNavigate, goto } from '$app/navigation';
	import { getElementsFromProductTreeView } from '$lib/util/ProductTreeViewUtil';
	import ThresholdStrategyForm from './components/ThresholdStrategyForm.svelte';
		import type { CategoriesTreeView } from '$lib/util/CategoriesTreeViewUtil.svelte';

	HeaderService.Instance.setTitle('Konfiguration');

	let { data }: { data: { id: string; productTreeView: ProductTreeViewModel, categoriesTreeView: CategoriesTreeView } } = $props();
	let { id, productTreeView, categoriesTreeView, ...rest } = data;

	let intercept = true;
	let saveDialogOpen = $state(false);

	console.log('props', id, productTreeView, categoriesTreeView, rest);

	let product = $state(!id ? new ProductTreeViewModel() : productTreeView);

	let addAssemblyGroupDialogOpen = $state(false);

	let strategies = $state(
		productTreeView.fixStrategies.sort((a, b) => a.priority - b.priority) ?? []
	);

	let assemblyGroups: AssemblyGroupTreeViewModel[] = $state(product.assemblyGroups);

	function addAssemblyGroup(assemblyGroup: AssemblyGroupTreeViewModel) {
		assemblyGroup.parent = product;

		assemblyGroups.push(assemblyGroup);
		console.log(product);
	}

	function removeAssemblyGroup(index: number) {
		assemblyGroups.splice(index, 1);
	}

	function moveGroupUp(index: number) {
		if (index === 0) return;

		const group = assemblyGroups[index];

		assemblyGroups[index] = assemblyGroups[index - 1];
		assemblyGroups[index - 1] = group;
	}

	function moveGroupDown(index: number) {
		if (index === assemblyGroups.length - 1) return;

		const group = assemblyGroups[index];

		assemblyGroups[index] = assemblyGroups[index + 1];
		assemblyGroups[index + 1] = group;
	}

	function saveProduct() {
		product.assemblyGroups = assemblyGroups;
		product.fixStrategies = strategies;
		product.createdAt = product.createdAt ?? new Date();

		const elements = getElementsFromProductTreeView(product);

		console.log('elements', elements);

		fetch('/api/product/' + id + '?asTreeView=true', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(elements)
		});

		intercept = false;

		goto('/configuration');
	}

	function goBack() {
		goto('/configuration');
	}

	function leave() {
		intercept = false;
		goto('/configuration');
	}

	beforeNavigate((navigation) => {
		if (intercept) {
			navigation.cancel();
			saveDialogOpen = true;
		}
	});
</script>

<section class="product-form">
	<div class="product-form-header">
		<Button class="default-button" onclick={() => goBack()}>
			<i class="material-icons">arrow_back</i>
			<span>Zurück</span>
		</Button>
		<h1>Produkt hinzufügen</h1>

		<Button onclick={saveProduct}>
			<i class="material-icons">save</i>
			<span>Speichern</span>
		</Button>
	</div>

	<div class="product-form-content">
		<div class="name-field">
			<Textfield variant="filled" bind:value={product.name} label="Produktname"></Textfield>
		</div>

		<h3>Baugruppenstruktur</h3>

		<div class="assembly-group-structure">
			<div class="children-groups-container">
				<div class="vertical-border">&nbsp;</div>
				<div class="children-groups">
					{#each assemblyGroups as group, i (group.id)}
						<AssemblyGroupForm
							bind:assemblyGroup={assemblyGroups[i]}
							{strategies}
							level={1}
							canMoveUp={i > 0}
							canMoveDown={i !== assemblyGroups.length - 1}
							onMoveUp={() => moveGroupUp(i)}
							onMoveDown={() => moveGroupDown(i)}
							lastChild={i === assemblyGroups.length - 1}
							categoriesTreeView={categoriesTreeView}
							onDeleteAssemblyGroup={() => removeAssemblyGroup(i)} />
					{/each}
				</div>
			</div>
			<AssemblyGroupStructureAddButton
				onAddAssemblyGroup={() => (addAssemblyGroupDialogOpen = true)}
				showAddAssemblyComponent={false} />
		</div>

		<AddAssemblyGroupDialog
			bind:open={addAssemblyGroupDialogOpen}
			onSave={(group) => addAssemblyGroup(group)} />

		<h3 style="margin-top: 32px">Fix Strategien</h3>
		<ThresholdStrategyForm bind:strategies product={productTreeView} />
	</div>
	<Dialog bind:open={saveDialogOpen} class="dialog">
		<Title>Änderungen speichern</Title>
		<Content>
			<p>Möchten Sie die Änderungen vor dem Verlassen speichern oder verwerfen?</p>
		</Content>
		<Actions>
			<Button onclick={leave}>Verwerfen</Button>
			<Button onclick={saveProduct}>Speichern</Button>
		</Actions>
	</Dialog>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.product-form-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.product-form-header h1 {
		margin: 0;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.product-form-content {
		height: 100%;
		overflow-y: auto;
	}

	.name-field {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	.assembly-group-structure {
		overflow: hidden;
	}

	.children-groups-container {
		display: flex;
		justify-content: center;
		align-items: stretch;
	}

	.vertical-border {
		border-left: 2px dashed rgba(0, 0, 0, 0.75);
	}

	.children-groups {
		width: 100%;
	}
</style>
