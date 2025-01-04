<script lang="ts">
	import { HeaderService } from '../../HeaderService.svelte';
	import Textfield from '@smui/textfield';
	import Ripple from '@smui/ripple';
	import Button from '@smui/button';
	import { ProductTreeViewModel } from '$lib/models/product.model';
	import { AssemblyGroupTreeViewModel } from '$lib/models/assembly-group.model';
	import AssemblyGroupForm from './components/AssemblyGroupForm.svelte';
	import AssemblyGroupStructureAddButton from './components/AssemblyGroupStructureAddButton.svelte';
	import AddAssemblyGroupDialog from './components/AddAssemblyGroupDialog.svelte';
	import { goto } from '$app/navigation';
	import { getElementsFromProductTreeView } from '$lib/util/ProductTreeViewUtil';

	HeaderService.Instance.setTitle('Konfiguration');

	let { data }: { data: { id: string; productTreeView: ProductTreeViewModel } } = $props();
	let { id, productTreeView, ...rest } = data;

	console.log('props', id, productTreeView, rest);

	let product = $state(!id ? new ProductTreeViewModel() : productTreeView);

	let addAssemblyGroupDialogOpen = $state(false);

	let assemblyGroups: AssemblyGroupTreeViewModel[] = $state(product.assemblyGroups);

	function addAssemblyGroup(assemblyGroup: AssemblyGroupTreeViewModel) {
		assemblyGroup.parent = product;

		assemblyGroups.push(assemblyGroup);
		console.log(product);
	}

	function removeAssemblyGroup(index: number) {
		assemblyGroups.splice(index, 1);
	}

	function saveProduct() {
		product.assemblyGroups = assemblyGroups;

		const elements = getElementsFromProductTreeView(product);

		console.log('elements', elements);

		fetch('/api/product/' + id  + '?asTreeView=true', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(elements)
		});
		goto('/configuration');
	}

	function goBack() {
		goto('/configuration');
	}
</script>

<section>
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

	<div class="name-field">
		<Textfield variant="filled" bind:value={product.name} label="Produktname"></Textfield>
	</div>

	<h2>Baugruppenstruktur</h2>

	<div class="assembly-group-structure">
		<div class="children-groups-container">
			<div class="vertical-border">&nbsp;</div>
			<div class="children-groups">
				{#each assemblyGroups as group, i}
					<AssemblyGroupForm
						bind:assemblyGroup={assemblyGroups[i]}
						level={1}
						lastChild={i === assemblyGroups.length - 1}
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

	.name-field {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	.assembly-group-structure {
		overflow: auto;
		height: 100%;
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
