<script lang="ts">
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import Autocomplete from '@smui-extra/autocomplete';
	import IconButton from '@smui/icon-button';
	import {
		AssemblyComponentTreeViewModel,
		CategoryElement,
		Strategies
	} from '$lib/models/assembly-component.model';
	import type { WearCriterionTreeViewModel } from '$lib/models/wear-criterion.model';
	import WearThresholdForm from './WearThresholdForm.svelte';

	let {
		wearCriterion = $bindable(),
		machineElement,
		ondelete
	}: {
		wearCriterion: WearCriterionTreeViewModel;
		machineElement: string;
		ondelete: () => void;
	} = $props();

	console.log('wearCriterion', wearCriterion, machineElement);

	
	let criteria = $derived.by(() => {
		//Benutzerdefnierte Kriterien müssen noch hinzugefügt werden
		switch (machineElement) {
			case CategoryElement.Niete:
				return ['Verschleiß durch Korrosion ', 'Plastische Verformung', 'Oberflächenzerrüttung'];
			case CategoryElement.Schraube:
				return ['Korrosiver Verschleiß', 'Plastische Verformung'];
			case CategoryElement.Federn:
				return ['Plastische Verformung'];
			case CategoryElement.Stifte_Bolzen:
				return ['Plastische Verformung', 'Oberflächenzerüttung'];
			case CategoryElement.Schweißverbindungen:
				return ['Korrosiver Verschleiß', 'Plastische Verformung', 'Oberflächenzerrüttung'];
			case CategoryElement.Lötverbindungen:
				return ['Korrosiver Verschleiß', 'Plastische Verformung', 'Oberflächenzerrüttung'];
			case CategoryElement.Klebverbindungen:
				return ['Haftverlust', 'Rissbildung durch Korrosion'];
			case CategoryElement.Wälzlager:
				return [
					'Pitting durch Adhäsion',
					'Spiel durch Abrasion ',
					'Korrosiver Verschleiß',
					'Oberflächenzerrüttung an Wälzelementen',
					'Plastische Verformung der Wälzlager'
				];
			case CategoryElement.Gleitlager:
				return [
					'Korrosiver Verschleiß',
					'Pitting durch Adhäsion',
					'Spiel durch Abrasion',
					'Oberflächenzerrüttung an Grenzflächen'
				];
			case CategoryElement['Achsen/Wellen']:
				return [
					'Rissbildung',
					'Biegung durch Plastische Verformung',
					'Riefenbildung druch Abrasion',
					'Verschleiß durch Korrosion'
				];
			case CategoryElement.Zahnräder:
				return [
					'Zahnflankenausbrüche',
					'Pitting durch Adhäsion',
					'Riefenbildung druch Abrasion',
					'Verschleiß durch Korrosion'
				];
			case CategoryElement['Riemen- und Kettentriebe']:
				return [
					'Längung durch plastische Verformung',
					'Riefenbildung druch Abrasion',
					'Rissbildung durch Korrosion',
					'Verhärtung durch Korrosion/Veralten'
				];
			case CategoryElement['Statische Dichtungen']:
				return [
					'Leckage durch plastische Verformung',
					'Rissbildung durch Materialermüdung',
					'Verhärtung durch Korrosion/Veralten'
				];
			case CategoryElement['Dynamische Dichtungen']:
				return [
					'Leckage durch plastische Verformung',
					'Rissbildung durch Materialermüdung',
					'Verhärtung durch Korrosion/Veralten',
					'Leckage durch Abrieb'
				];
			case CategoryElement.Rohre:
				return [
					'Leckage durch Materialermüdung',
					'Biegung durch Plastische Verformung',
					'Rissbildung druch plastische Verformung',
					'Verschleiß durch Korrosion'
				];
			case CategoryElement.Ventile:
				return [
					'Verschleiß durch Korrosion',
					'Materialermüdung',
					'Plastische Verformung',
					'Leckage durch Materialermüdung'
				];
			case CategoryElement.Gehäuse:
				return ['Abrasion außen', 'Materialermüdung durch Korrosion', 'Plastische Verformung'];
			case CategoryElement.Rahmen:
				return ['Abrasion außen', 'Materialermüdung durch Korrosion', 'Plastische Verformung'];
			case CategoryElement.Kerne:
				return ['Abrasion', 'Materialermüdung durch Korrosion', 'Plastische Verformung'];
			case CategoryElement.Platine:
				return ['Kontaktkorrosion', 'Lötstellenbruch'];
			default:
				return [];
		}
	});

</script>

<div class="wear-criterion-form">
	<div class="criterion">
		<Autocomplete combobox bind:value={wearCriterion.label} label="Kriterium" options={criteria} />
		<IconButton onclick={ondelete}>
			<i class="material-icons">delete</i>
		</IconButton>
	</div>

	<div class="thresholds">
		{#each wearCriterion.wearThresholds as threshold, i}
			<WearThresholdForm bind:wearThreshold={wearCriterion.wearThresholds[i]} />
		{/each}

	</div>


	
</div>

<style>
.criterion {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 24px;
}

.wear-criterion-form {
	display: flex;
	flex-direction: column;
}

.thresholds {
	display: flex;
	flex-direction: column;
	gap: 12px;
}
</style>
