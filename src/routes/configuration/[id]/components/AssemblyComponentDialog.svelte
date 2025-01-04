<script lang="ts">
	import Dialog, { Content, Title } from '@smui/dialog';
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import { Icon } from '@smui/common';
	import {
		AssemblyComponentTreeViewModel,
		PredefinedComponentCategory
	} from '$lib/models/assembly-component.model';
	import Select, { Option } from '@smui/select';
	import WearCriterionForm from './WearCriterionForm.svelte';
	import { WearCriterionTreeViewModel } from '$lib/models/wear-criterion.model';
	import { WearThresholdTreeViewModel, WearThresholdType } from '$lib/models/wear-threshold.model';

	let {
		open = $bindable(),
		onSave,
		assemblyComponent = new AssemblyComponentTreeViewModel()
	}: {
		open: boolean;
		onSave: (group: AssemblyComponentTreeViewModel) => void;
		assemblyComponent?: AssemblyComponentTreeViewModel;
	} = $props();

	console.log('assemblyComponent', assemblyComponent);

	
	let wearCriteria = $state(assemblyComponent.wearCriteria);

	if (!assemblyComponent.wearCriteria || assemblyComponent.wearCriteria.length === 0) {
		console.log('add wear criterion');
		addWearCriterion();
	}

	let category_elements = $derived.by(() => {
		switch (machineElementCategory) {
			case PredefinedComponentCategory.Lagerungselemente:
				return ['Gleitlager', 'Wälzlager'];
			case PredefinedComponentCategory.Übertragungselemente:
				return ['Achsen/Wellen', 'Zahnräder', 'Riemen- und Kettentriebe'];
			case PredefinedComponentCategory.Verbindungselemente:
				return [
					'Schraube',
					'Niete',
					'Schweißverbindungen',
					'Federn',
					'Stifte_Bolzen',
					'Lötverbindungen',
					'Klebverbindungen'
				];
			case PredefinedComponentCategory.Dichtungselemente:
				return ['Statische Dichtungen', 'Dynamische Dichtungen'];
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

	let name = $state(assemblyComponent.name); // Für gleichen Dialog bzw fürs editieren
	let machineElementCategory = $state(assemblyComponent.machineElementCategory);
	let machineElement = $state(assemblyComponent.machineElement);

	let invalidName = $state(false);

	let predefinedCategories = Object.keys(PredefinedComponentCategory);

	function addWearCriterion() {
		const wearCriterion = new WearCriterionTreeViewModel();
		wearCriterion.component = assemblyComponent;
		wearCriterion.wearThresholds = [
			new WearThresholdTreeViewModel({
				type: WearThresholdType.OpticalError,
				criterion: wearCriterion
			}),
			new WearThresholdTreeViewModel({
				type: WearThresholdType.FunctionalError,
				criterion: wearCriterion
			}),
			new WearThresholdTreeViewModel({
				type: WearThresholdType.SafetyError,
				criterion: wearCriterion
			})
		]
		
		wearCriteria.push(wearCriterion);
	}

	function removeWearCriterion(index: number) {
		wearCriteria.splice(index, 1);
	}

	function saveNewComponent() {
		if (!name || name.trim() === '') {
			invalidName = true;
			return;
		}
		const component = new AssemblyComponentTreeViewModel({
			...assemblyComponent,
			name,
			machineElementCategory,
			machineElement,
			wearCriteria
		});
		onSave(component);
		open = false;
	}

	function cancel() {
		name = '';
		open = false;
	}
	
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
			label="Name"></Textfield>

		<Select
			style="margin-top: 18px"
			bind:value={machineElementCategory}
			label="Kategorie_Maschinenelement">
			{#each predefinedCategories as category}
				<Option value={category}>{category}</Option>
			{/each}
		</Select>

		<Select style="margin-top: 18px" bind:value={machineElement} label="Maschinenelemente">
			{#each category_elements as element}
				<Option value={element}>{element}</Option>
			{/each}
		</Select>

		<div class="wear-criterion-title">Verschleißkriterien</div>

		<div class="wear-criteria">
			{#each wearCriteria as verschleißkrit, index}
				<WearCriterionForm bind:wearCriterion={wearCriteria[index]} machineElement={machineElement} ondelete={() => removeWearCriterion(index)} />
			{/each}
		</div>

		<Button id="wear-criterion-add-button" onclick={addWearCriterion}>
			<Icon class="material-icons">add</Icon>
			<span>Verschleißkriterium hinzufügen</span>
		</Button>
	</Content>

	<div class="actions">
		<Button class="cancel-button" onclick={() => cancel()}>Abbrechen</Button>
		<Button onclick={() => saveNewComponent()}>Speichern</Button>
	</div>
</Dialog>

<style>
	:global(.custom-dialog .mdc-dialog__surface) {
		max-width: none;
		height: 70vh;
		width: 80vw;
	}
	:global(.content .mdc-dialog__content) {
		max-width: none;
		width: 100%;
	}
	:global(.mdc-deprecated-list) {
		max-height: 200px;
		overflow-y: auto;
	}

	.wear-criterion-title {
		font-size: 1rem;
		margin-top: 24px;
		font-weight: 600;
		margin-bottom: 8px;
	}

	.wear-criteria {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}


	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		margin: 8px 8px 8px 0;
	}

	:global(#wear-criterion-add-button) {
		margin-top: 24px;
	}
</style>
