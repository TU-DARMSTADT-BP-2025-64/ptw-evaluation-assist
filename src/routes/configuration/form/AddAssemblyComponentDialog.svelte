<script lang="ts">
	import Dialog, { Content, Title } from '@smui/dialog';
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import {
		AssemblyComponentTreeViewModel,
		PredefinedComponentCategory,
	} from '$lib/models/assembly-component.model';
	import Select, { Option } from '@smui/select';
	import AssemblyComponentDialogForm from './AssemblyComponentDialogForm.svelte';
	import reset from './AssemblyComponentDialogForm.svelte';

	let verschleißkriterien = $state([{value : '', grenzwert : '', strategie : ''}]);
	function addVerschleißkriterium() {
		verschleißkriterien = [...verschleißkriterien, {value: '', grenzwert: '', strategie: ''}];
	}
	function deleteVerschleißkriterium(){
		verschleißkriterien.pop();
	}

	let childRefs = []; // Array to hold references to child components

	// Function to reset all child components
	function resetChildComponents() {
		console.log(childRefs);
		childRefs.forEach(child => {
			if (child) {
				child.reset(); // Call the reset method on each child
			}
		});
	}

	let category_elements = $derived.by(() => {
		switch (componentCategory) {
			case PredefinedComponentCategory.Lagerungselemente:
				return ['Gleitlager', 'Wälzlager'];
			case PredefinedComponentCategory.Übertragungselemente:
				return ['Achsen/Wellen', 'Zahnräder', 'Riemen- und Kettentriebe'];
			case PredefinedComponentCategory.Verbindungselemente:
				return ['Schraube', 'Niete', 'Schweißverbindungen', 'Federn', 'Stifte_Bolzen', 'Lötverbindungen', 'Klebverbindungen'];
			case PredefinedComponentCategory.Dichtungselemente:
				return['Statische Dichtungen', 'Dynamische Dichtungen'];
			case PredefinedComponentCategory.Bau_und_Gehäuseteile:
				return ['Gehäuse', 'Rahmen', 'Kerne'];
			case PredefinedComponentCategory.Elemente_zum_Transport_von_Flüssigkeiten_und_Gasen:
				return ['Ventile', 'Rohre'];
			case PredefinedComponentCategory.Elektronisches_Bauteile:
				return ['Platine'];
			default:
				return [];
		}
	});

	let {
		open = $bindable(),
		onSave,
		assemblyComponent
	}: { open: boolean; onSave: (group: AssemblyComponentTreeViewModel) => void; assemblyComponent: AssemblyComponentTreeViewModel} = $props();

	let name = $state(assemblyComponent?.name ?? '');// Für gleichen Dialog bzw fürs editieren
  let componentCategory = $state('');
	let invalidName = $state(false);

  let predefinedCategories = Object.keys(PredefinedComponentCategory);

	function saveNewComponent() {
		if (!name || name.trim() === '') {
			invalidName = true;
			return;
		}
		const component = new AssemblyComponentTreeViewModel();
		component.name = name;
		onSave(component);
		name = '';
		componentCategory = '';
		machine_elements = '';
		resetChildComponents();
		verschleißkriterien.length = 1;
		//alle variablen auf null setzen -> für neuen Dialog
		open = false;
	}


	function cancel() {
		name = '';
		open = false;
	}
	let machine_elements = $state('');
</script>
<Dialog bind:open class="custom-dialog">

	<Title><span data-testid="dialog-title">Neue Komponente</span></Title>
	<Content class="content">
		<Textfield
			required
			invalid={invalidName}
			style="width: 100%;"
			bind:value={name}
			onkeydown={(e) => e.key === 'Enter' && saveNewComponent()}
			label="Name"
		></Textfield>

		<Select style="margin-top: 18px" bind:value={componentCategory} label="Kategorie_Maschinenelement">
			{#each predefinedCategories as category}
				<Option value={category}>{category}</Option>
			{/each}
		</Select>

		<Select style="margin-top: 18px" bind:value={machine_elements} label="Maschinenelemente">
		  {#each category_elements as element}
				<Option value={element}>{element}</Option>
			{/each}
		</Select>

		<h1> Verschleißkriterien </h1>

		{#each verschleißkriterien as verschleißkrit, index}
			<AssemblyComponentDialogForm bind:this={childRefs[index]} machine={machine_elements} />
		{/each}


		<Button onclick={addVerschleißkriterium}>Add Verschleißkriterium</Button>
		<Button onclick={deleteVerschleißkriterium}>Delete Verschleißkriterium</Button>


	</Content>

	<div class="actions">
		<Button class="cancel-button" onclick={() => cancel()}>Abbrechen</Button>
		<Button onclick={() => saveNewComponent()}>Speichern</Button>
	</div>
</Dialog>

<style>
	:global(.custom-dialog .mdc-dialog__surface) {
    max-width: none;
    height: 800px;
		width: 1000px;
	}
	:global(.content .mdc-dialog__content){
		max-width: none;
		width: 950px;
	}
	:global(.mdc-deprecated-list){
			max-height: 200px;
			overflow-y: auto;
	}
	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		margin: 8px 8px 8px 0;
	}
</style>
