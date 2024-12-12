<script lang="ts">
	import { HeaderService } from './../../HeaderService.svelte';
	import Textfield from '@smui/textfield';
	import Ripple from '@smui/ripple';
	import Button from '@smui/button';
	import { ProductTreeViewModel } from '$lib/models/product.model';
	import { AssemblyGroupTreeViewModel } from '$lib/models/assembly-group.model';
	import AssemblyGroupForm from './AssemblyGroupForm.svelte';
	HeaderService.Instance.setTitle('Konfiguration');
	let valueA = $state('');
	let valueB = $state('');

	let product = $state(new ProductTreeViewModel());

	let assemblyGroups: AssemblyGroupTreeViewModel[] = $state([]);


	function addAssemblyGroup(name: string) {
		const assemblyGroupTreeView = new AssemblyGroupTreeViewModel();
		assemblyGroupTreeView.name = name;
		assemblyGroupTreeView.parent = product;
		
		assemblyGroups.push(assemblyGroupTreeView);
		console.log(product);
	}

	function removeAssemblyGroup(index: number) {
		console.log('remove-assembly-group', index);
		assemblyGroups.splice(index, 1);
	}
	//funktion wo man ein element in die liste hinzufügt
	//liste von den baugruppen erstellen und dann mit dem plus oder minus ein
	// element entfernen oder hinzufügen
</script>

<body>
	<h1>Produkt hinzufügen</h1>
</body>

<section>
	<div class="wholeshit">
		<div class="pname">
			<Textfield variant="filled" bind:value={valueA} label="Produkt Name"></Textfield>
		</div>

		<div class="Baugruppe">
			<Textfield variant="filled" bind:value={valueB} label="Baugruppe"></Textfield>
			<div
				class="add-btn mdc-elevation--z2"
				use:Ripple={{ surface: true }}
				onkeydown={() => {}}
				role="button"
				tabindex="0"
				onclick={() => addAssemblyGroup(valueB)}
			>
				<i class="material-icons">add</i>
			</div>
		</div>

		{#each assemblyGroups as group, i}
			<AssemblyGroupForm bind:assemblyGroup={assemblyGroups[i]} level={1} on:delete-assembly-group={(e) => removeAssemblyGroup(i)} />
		{/each}


		<Button onclick={() => console.log(assemblyGroups)}>
			<i class="material-icons">save</i>
			Speichern
		</Button>
	</div>
</section>

<style>
	h1 {
		position: fixed;
		top: 80px; /* Abstand vom oberen Rand */
		left: 30px; /* Abstand vom linken Rand */
	}
	.pname {
		top: 150px;
		left: 60px;
	}
	.Baugruppe {
		top: 230px;
		left: 60px;
		width: 200px;
		height: 150px;
	}

	.add-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 12px;
		border-radius: 8px;
		background: white;
		cursor: pointer;
		margin-right: 1300px;
		position: relative; /* Necessary for absolute positioning of label */
		width: 10px; /* Adjust width to fit the button */
		height: 10px;
	}
	.add-btn .icon i {
		font-size: 55px;
		height: 30px;
		width: 30px;
		color: #b81018;
	}
	.ug-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 12px;
		border-radius: 8px;
		background: white;
		cursor: pointer;
		margin-right: 1700px;
		position: relative; /* Necessary for absolute positioning of label */
		width: 10px; /* Adjust width to fit the button */
		height: 10px;
	}
	.addition-button {
		font-size: 20px;
		margin-left: 28px;
	}
	.wholeshit {
		display: flex;
		position: fixed;
		top: 150px;
		left: 30px;
		height: 200px;
		flex-direction: column;
		gap: 20px;
	}
</style>
