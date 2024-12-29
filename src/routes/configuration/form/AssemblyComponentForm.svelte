<script lang="ts">
	import type { AssemblyComponentTreeViewModel } from '$lib/models/assembly-component.model';
	import Textfield from '@smui/textfield';
	import IconButton from '@smui/icon-button';
	import AddAssemblyComponentDialog from './AddAssemblyComponentDialog.svelte';

	let { assemblyComponent = $bindable(), level, lastChild, onDeleteAssemblyComponent}:
		{ assemblyComponent: AssemblyComponentTreeViewModel, level: number, lastChild: boolean, onDeleteAssemblyComponent: () => void,
			onUpdateComponent: (component: AssemblyComponentTreeViewModel) => void } = $props();

	let editDialogOpen = $state(false); // Zustand für den Dialog

	$inspect(assemblyComponent)

	function openEditDialog() {
		editDialogOpen = true;
	}
</script>


<div class="component-name">
	<Textfield variant="filled" bind:value={assemblyComponent.name} label="Name"></Textfield>
		<IconButton onclick={openEditDialog}>
			<i class="material-icons">edit</i>
		</IconButton>
	<IconButton onclick={() => onDeleteAssemblyComponent()}>
		<i class="material-icons">delete</i>
	</IconButton>
</div>

<AddAssemblyComponentDialog
	bind:open={editDialogOpen}
	{...assemblyComponent}
	onSave={(component) => {
	assemblyComponent = component;
	editDialogOpen = false;
}}
/>
<style>
	.component-name {
		display: flex;
		align-items: center;
			padding-top: 15px;
	}

</style>