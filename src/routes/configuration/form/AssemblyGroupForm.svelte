<script lang="ts">
	import { AssemblyComponentTreeViewModel } from '$lib/models/assembly-component.model';
	import { AssemblyGroupTreeViewModel } from '$lib/models/assembly-group.model';
	import Textfield from '@smui/textfield';
	import Ripple from '@smui/ripple';
	import IconButton from '@smui/icon-button';
	import Button from '@smui/button';
	import AssemblyComponentForm from './AssemblyComponentForm.svelte';
	import AssemblyGroupForm from './AssemblyGroupForm.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let {
		assemblyGroup = $bindable(),
		level
	}: { assemblyGroup: AssemblyGroupTreeViewModel; level: number } = $props();

	let name = $state(assemblyGroup.name);
	let children = $state(assemblyGroup.children);

	let newName = $state('');

	function addSubAssemblyGroup(name: string) {
		const assemblyGroupTreeView = new AssemblyGroupTreeViewModel();
		assemblyGroupTreeView.name = name;
		assemblyGroupTreeView.parent = assemblyGroup;

		children.push(assemblyGroupTreeView);
		newName = '';
	}

    function addAssemblyComponent(name: string) {
        const assemblyComponentTreeView = new AssemblyComponentTreeViewModel();
        assemblyComponentTreeView.name = name;
        assemblyComponentTreeView.parent = assemblyGroup;

        children.push(assemblyComponentTreeView);

        console.log(children);
        newName = '';
    }

	function deleteAssemblyGroupFromChildren(index: number) {
		children.splice(index, 1);
	}

	$effect(() => {
		assemblyGroup.children = children;
		assemblyGroup.name = name;
        console.log('effect', assemblyGroup);
	});

    $inspect(children);

	function dispatchDelete() {
		dispatch('delete-assembly-group', assemblyGroup);
	}

    function setAssemblyGroup(nextAssemblyGroup: AssemblyGroupTreeViewModel) {
        assemblyGroup = nextAssemblyGroup;
    }
</script>

<div>
	<div class="assembly-header">
		<Textfield variant="filled" bind:value={name} label="Name"></Textfield>
		<IconButton
			onclick={() => {
				dispatchDelete();
			}}
		>
			<i class="material-icons">delete</i>
		</IconButton>
	</div>

	<div class="assembly-children">
		{#each children as child, i}
            
			<div style="margin-left: 12px" class="child-container">
				{#if child.type === 'assembly-group'}
					<div>
						<AssemblyGroupForm
							bind:assemblyGroup={children[i] as AssemblyGroupTreeViewModel}
							level={level + 1}
							on:delete-assembly-group={() => deleteAssemblyGroupFromChildren(i)}
						/>
					</div>
				{/if}
				{#if child.type === 'assembly-component'}
					<div>
						<AssemblyComponentForm
							bind:assemblyComponent={children[i] as AssemblyComponentTreeViewModel}
							level={level + 1}
						/>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<div class="add-section">
		<Textfield variant="filled" bind:value={newName} label="Unterbaugruppe"></Textfield>
		<Button onclick={() => addSubAssemblyGroup(newName)}>
			<i class="material-icons">add</i>
			Untergruppe hinzufügen
		</Button>

		<Button onclick={() => addAssemblyComponent(newName)} >
			<i class="material-icons">add</i>
			Komponente hinzufügen
		</Button>
	</div>
</div>

<style>
	.add-section {
		display: flex;
		align-items: center;
		margin-left: 12px;
	}

	.assembly-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.child-container {
		margin-bottom: 8px;
	}
</style>
