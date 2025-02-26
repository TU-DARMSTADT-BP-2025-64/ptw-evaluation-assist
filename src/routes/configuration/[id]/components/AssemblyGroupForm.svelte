<script lang="ts">
	import { AssemblyComponentTreeViewModel } from '$lib/models/assembly-component.model';
	import { AssemblyGroupTreeViewModel } from '$lib/models/assembly-group.model';
	import Textfield from '@smui/textfield';
	import Ripple from '@smui/ripple';
	import IconButton from '@smui/icon-button';
	import Button from '@smui/button';
	import AssemblyComponentForm from './AssemblyComponentForm.svelte';
	import AssemblyGroupForm from './AssemblyGroupForm.svelte';
	import AssemblyGroupStructureAddButton from './AssemblyGroupStructureAddButton.svelte';
	import AddAssemblyGroupDialog from './AddAssemblyGroupDialog.svelte';
	import AssemblyComponentDialog from './AssemblyComponentDialog.svelte';
	import type { ThresholdStrategyTreeViewModel } from '$lib/models/threshold-strategy.model';
	import type { CategoriesTreeView } from '$lib/util/CategoriesTreeViewUtil.svelte';

	let {
		assemblyGroup = $bindable(),
		onDeleteAssemblyGroup,
		onMoveUp,
		onMoveDown,
		canMoveUp,
		canMoveDown,
		level,
		lastChild,
		strategies,
		categoriesTreeView,
	}: {
		assemblyGroup: AssemblyGroupTreeViewModel;
		onDeleteAssemblyGroup: () => void;
		onMoveUp: () => void;
		onMoveDown: () => void;
		canMoveUp: boolean;
		canMoveDown: boolean;
		level: number;
		lastChild: boolean;
		strategies: ThresholdStrategyTreeViewModel[];
		categoriesTreeView: CategoriesTreeView;
	} = $props();

	let name = $state(assemblyGroup.name);
	let children = $state(assemblyGroup.children);

	let expanded = $state(true);
	let addAssemblyGroupDialogOpen = $state(false);
	let addAssemblyComponentDialogOpen = $state(false);

	function addSubAssemblyGroup(newAssemblyGroup: AssemblyGroupTreeViewModel) {
		newAssemblyGroup.parent = assemblyGroup;
		children.push(newAssemblyGroup);
		console.log(children);
	}

	function updateAssemblyComponent(updatedComponent: AssemblyComponentTreeViewModel) {
		const index = children.findIndex((child) => child.id === updatedComponent.id);
		if (index !== -1) {
			children[index] = updatedComponent;
		}
	}

	function addAssemblyComponent(assemblyComponent: AssemblyComponentTreeViewModel) {
		assemblyComponent.parent = assemblyGroup;

		children.push(assemblyComponent);

		console.log(children);
	}

	function deleteAssemblyGroupFromChildren(index: number) {
		children.splice(index, 1);
	}

	function moveGroupUp(index: number) {
		if (index === 0) return;

		const group = children[index];

		children[index] = children[index - 1];
		children[index - 1] = group;
	}

	function moveGroupDown(index: number) {
		if (index === children.length - 1) return;

		const group = children[index];

		children[index] = children[index + 1];
		children[index + 1] = group;
	}

	$effect(() => {
		assemblyGroup.children = children;
		assemblyGroup.name = name;
		console.log('effect', assemblyGroup);
	});

</script>

<div class="group-form" style="margin-bottom: {lastChild ? '0' : '16px'}">
	<div class="group-form-prefix-borders">
		<div class="group-form-prefix-borders-1">&nbsp;</div>
		<div class="group-form-prefix-borders-2">&nbsp;</div>
	</div>
	<div class="group-form-content">
		<div class="assembly-header">
			<Textfield variant="filled" bind:value={assemblyGroup.name} label="Name"></Textfield>
			<IconButton class="material-icons" disabled={!canMoveUp} onclick={() => onMoveUp()}>
				keyboard_arrow_up
			</IconButton>
			<IconButton class="material-icons" disabled={!canMoveDown} onclick={() => onMoveDown()}>
				keyboard_arrow_down
			</IconButton>

			<IconButton onclick={() => onDeleteAssemblyGroup()}>
				<i class="material-icons">delete</i>
			</IconButton>
		</div>

		<div>
			<div class="expand-button" 
			role="button"
			tabindex="0"
			onkeydown="{(e) => e.key === 'Enter' && (expanded = !expanded)}"
			onclick={() => (expanded = !expanded)}>
				{expanded ? '▼' : '►'}
			</div>
		</div>

		{#if expanded}
			{#if children && children.length > 0}
				<div class="children-groups-container">
					<div class="vertical-border">&nbsp;</div>
					<div class="children-groups">
						{#each children as child, i (child.id)}
							{#if child.type === 'assembly-component'}
								<AssemblyComponentForm
									bind:assemblyComponent={children[i] as AssemblyComponentTreeViewModel}
									strategies={strategies}
									level={level + 1}
									lastChild={i === children.length - 1}
									canMoveUp={i > 0}
									canMoveDown={i !== children.length - 1}
									onMoveUp={() => moveGroupUp(i)}
									onMoveDown={() => moveGroupDown(i)}
									categoriesTreeView={categoriesTreeView}
									onDeleteAssemblyComponent={() => deleteAssemblyGroupFromChildren(i)}
									onUpdateComponent={updateAssemblyComponent} />
							{:else}
								<AssemblyGroupForm
									bind:assemblyGroup={children[i] as AssemblyGroupTreeViewModel}
									level={level + 1}
									strategies={strategies}
									lastChild={i !== children.length - 1}
									canMoveUp={i > 0}
									canMoveDown={i === children.length - 1}
									onMoveUp={() => moveGroupUp(i)}
									onMoveDown={() => moveGroupDown(i)}
									categoriesTreeView={categoriesTreeView}
									onDeleteAssemblyGroup={() => deleteAssemblyGroupFromChildren(i)} />
							{/if}
						{/each}
					</div>
				</div>
			{/if}

			<AssemblyGroupStructureAddButton
				onAddAssemblyGroup={() => (addAssemblyGroupDialogOpen = true)}
				onAddAssemblyComponent={() => (addAssemblyComponentDialogOpen = true)}
				showAddAssemblyComponent={true} />

			{#if addAssemblyGroupDialogOpen}
				<AddAssemblyGroupDialog
					bind:open={addAssemblyGroupDialogOpen}
					onSave={(group) => addSubAssemblyGroup(group)} />
			{/if}

			{#if addAssemblyComponentDialogOpen}
				<AssemblyComponentDialog
					bind:open={addAssemblyComponentDialogOpen}
					strategies={strategies}
					categoriesTreeView={categoriesTreeView}
					onSave={(component) => addAssemblyComponent(component)} />
			{/if}
		{/if}
	</div>
</div>

<style>
	.group-form {
		display: flex;
		align-items: stretch;
	}

	.group-form-prefix-borders {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 20px;
	}

	.group-form-prefix-borders-1 {
		border-bottom: 2px dashed rgba(0, 0, 0, 0.75);
		width: 100%;
		height: 20px;
	}

	.group-form-prefix-borders-2 {
		width: 100%;
		height: 100%;
	}

	.assembly-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.group-form-content {
		/* width: 100%; */
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

	.expand-button {
		width: 18px;
		height: 18px;
		font-size: 18px;
		cursor: pointer;
		margin-left: -8px;
	}
</style>
