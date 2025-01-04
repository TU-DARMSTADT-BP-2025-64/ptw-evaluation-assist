<script lang="ts">
	import { goto } from '$app/navigation';
	import { ProductTreeViewModel } from '$lib/models/product.model';
    import Button from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import AssemblyGroupSelect from './AssemblyGroupSelect.svelte';
	import { createEvaluatedProductTreeView, EvaluatedProductTreeViewModel } from './EvaluatedTreeView';
	let {
		open = $bindable(),
		productTreeView,
		onstartevaluate
	}: { open: boolean, productTreeView: ProductTreeViewModel; onstartevaluate: (treeView: EvaluatedProductTreeViewModel) => void } = $props();

	let selectableProductTreeView = $state(createEvaluatedProductTreeView(productTreeView));

	console.log(selectableProductTreeView);

    function startEvaluation() {
        onstartevaluate(selectableProductTreeView);
        open = false;
    }

    function cancel() {
        open = false;
        goto('/assistant');
    }
    
</script>

<Dialog bind:open>
	<Title><span data-testid="dialog-title">Auswahl Befundung</span></Title>
	<Content>
		{#each selectableProductTreeView.assemblyGroups as group, i}
			<AssemblyGroupSelect bind:assemblyGroup={selectableProductTreeView.assemblyGroups[i]} />
		{/each}
		
	</Content>
	<div class="actions">
		<Button class="cancel-button" onclick={() => cancel()}>Abbrechen</Button>
		<Button onclick={() => startEvaluation()}>Befundung starten</Button>
	</div>
</Dialog>


<style>
    .actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		margin: 8px 8px 8px 0;
	}
</style>
