<script lang="ts">
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import Autocomplete from '@smui-extra/autocomplete';
	import {
		AssemblyComponentTreeViewModel, CategoryElement,
		Strategies
	} from '$lib/models/assembly-component.model';

	let {machine}: {machine: string} = $props();

	let strats = Object.keys(Strategies);
	let componentCriteria = $state('');

  export function reset(){
	 componentCriteria = '';
	 	value1 = '';
		value2 = '';
		value3 = '';
		grenzwert1 = '';
		grenzwert2 = '';
		grenzwert3 = '';
		strat1 = '';
		strat2 = '';
		strat3 = '';
	}
	let criteria = $derived.by(() => {//Benutzerdefnierte Kriterien müssen noch hinzugefügt werden
		switch(machine){
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
				return ['Haftverlust', 'Rissbildung durch Korrosion']
			case CategoryElement.Wälzlager:
				return ['Pitting durch Adhäsion', 'Spiel durch Abrasion ', 'Korrosiver Verschleiß', 'Oberflächenzerrüttung an Wälzelementen', 'Plastische Verformung der Wälzlager'];
			case CategoryElement.Gleitlager:
				return ['Korrosiver Verschleiß', 'Pitting durch Adhäsion', 'Spiel durch Abrasion', 'Oberflächenzerrüttung an Grenzflächen'];
			case CategoryElement['Achsen/Wellen']:
				return ['Rissbildung', 'Biegung durch Plastische Verformung', 'Riefenbildung druch Abrasion', 'Verschleiß durch Korrosion'];
			case CategoryElement.Zahnräder:
				return ['Zahnflankenausbrüche', 'Pitting durch Adhäsion', 'Riefenbildung druch Abrasion', 'Verschleiß durch Korrosion'];
			case CategoryElement['Riemen- und Kettentriebe']:
				return ['Längung durch plastische Verformung', 'Riefenbildung druch Abrasion', 'Rissbildung durch Korrosion', 'Verhärtung durch Korrosion/Veralten'];
			case CategoryElement['Statische Dichtungen']:
				return ['Leckage durch plastische Verformung', 'Rissbildung durch Materialermüdung', 'Verhärtung durch Korrosion/Veralten'];
			case CategoryElement['Dynamische Dichtungen']:
				return ['Leckage durch plastische Verformung', 'Rissbildung durch Materialermüdung', 'Verhärtung durch Korrosion/Veralten', 'Leckage durch Abrieb'];
			case CategoryElement.Rohre:
				return ['Leckage durch Materialermüdung', 'Biegung durch Plastische Verformung', 'Rissbildung druch plastische Verformung', 'Verschleiß durch Korrosion'];
			case CategoryElement.Ventile:
				return ['Verschleiß durch Korrosion', 'Materialermüdung', 'Plastische Verformung', 'Leckage durch Materialermüdung'];
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

	let value1 = $state('');
	let value2 = $state('');
	let value3 = $state('');

	let grenzwert1 = $state('');
	let grenzwert2 = $state('');
	let grenzwert3 = $state('');

	let strat1 = $state('');
	let strat2 = $state('');
	let strat3 = $state('');

</script>
<div class="Rest">
	<div class="Kriterium">
		<Autocomplete combobox bind:value={componentCriteria} label="Kriterium" options={criteria} />
	</div>
	<div class="Nummer1">
		<div class="df1">
			Optischer Defekt
		</div>
		<div class="Grenzwert1">
			<Textfield bind:value={grenzwert1} label="Grenzwert1"></Textfield>
		</div>
		<div class="Strategie1">
			<Select style="margin-top: 18px" bind:value={strat1} label="Strategie">
				{#each strats as strat}
					<Option value={strat}>{strat}</Option>
				{/each}
			</Select>
		</div>
		<div class="Maßnahme1">
			<Textfield
				textarea
				bind:value={value1}
				label="Maßnahmen"
				input$rows={2}
				input$cols={50}
				input$resizable={false}
			>
			</Textfield>
		</div>
	</div>



	<div class="Nummer2">
		<div class="df2">
			Funktionaler Defekt
		</div>
		<div class="Grenzwert2">
			<Textfield bind:value={grenzwert2} label="Grenzwert2"></Textfield>
		</div>
		<div class="Strategie2">
			<Select style="margin-top: 18px" bind:value={strat2} label="Strategie">
				{#each strats as strat}
					<Option value={strat}>{strat}</Option>
				{/each}
			</Select>
		</div>
		<div class="Maßnahme2">
			<Textfield
				textarea
				bind:value={value2}
				label="Maßnahmen"
				input$rows={2}
				input$cols={50}
				input$resizable={false}
			>
			</Textfield>
		</div>
	</div>



	<div class="Nummer3">
		<div class="df3">
			Sicherheitskritischer Defekt
		</div>
		<div class="Grenzwert3">
			<Textfield bind:value={grenzwert3} label="Grenzwert3"></Textfield>
		</div>
		<div class="Strategie3">
			<Select style="margin-top: 18px" bind:value={strat3} label="Strategie">
				{#each strats as strat}
					<Option value={strat}>{strat}</Option>
				{/each}
			</Select>
		</div>
		<div class="Maßnahme3">
			<Textfield
				textarea
				bind:value={value3}
				label="Maßnahmen"
				input$rows={2}
				input$cols={50}
				input$resizable={false}
			>
			</Textfield>
		</div>
	</div>


</div>
<style>

:global(.Kriterium .mdc-text-field){
	width: 950px;
}

:global(.Nummer1){
	display: flex;
	flex-direction: row;
	width: 950px;
}
:global(.df1){
	margin-top: 25px;
}
:global(.Grenzwert1){
	margin-left: 70px;
	margin-top: 5px;
	width: 130px;
}
:global(.Strategie1){
	margin-left: 15px;
	margin-top: -13px;
	width: 200px;
}
:global(.Maßnahme1){
	margin-top: 25px;
  margin-left: 10px;
  width: 400px;
}


:global(.Nummer2){
	display: flex;
	flex-direction: row;
	margin-top: 10px;
	width: 950px;
}
:global(.df2){
	margin-top: 25px;
}
:global(.Grenzwert2){
	margin-left: 50px;
	margin-top: 5px;
	width: 130px;
}
:global(.Strategie2){
	margin-left: 15px;
	margin-top: -13px;
	width: 200px;
}
:global(.Maßnahme2) {
	margin-top: 25px;
	margin-left: 10px;
	width: 400px;
}


:global(.Nummer3){
	display: flex;
	flex-direction: row;
	margin-top: 10px;
	width: 950px;
}
:global(.df3){
	margin-top: 25px;
}
:global(.Grenzwert3){
	margin-left: -10px;
	margin-top: 5px;
	width: 130px;
}
:global(.Strategie3){
	margin-left: 15px;
	margin-top: -13px;
	width: 200px;
}
:global(.Maßnahme3){
	margin-left: 10px;
	margin-top: 25px;
	width: 400px;
}
:global(.Rest){
	display: flex;
	flex-direction: column;
}
</style>