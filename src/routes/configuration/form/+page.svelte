<script lang="ts">
	import { HeaderService } from './../../HeaderService.svelte';
	import Textfield from '@smui/textfield';
	import Ripple from '@smui/ripple';
	HeaderService.Instance.setTitle('Konfiguration');
	let valueA = $state('');
	let valueB = $state('');
	let baugruppen:string[] = $state([]);
	let unterbaugruppe:string[] = $state([]);

	function add_unterbaugruppe(items:string) {
		unterbaugruppe.push(items);
		console.log(unterbaugruppe);
	}

	function add(items:string) {
		baugruppen.push(items);
		console.log(baugruppen);
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
				<Textfield variant="filled" bind:value={valueA} label="Produkt Name">
				</Textfield>
		</div>

		<div class="Baugruppe">
				<Textfield variant="filled" bind:value={valueB} label="Baugruppe">
				</Textfield>
				<div class="add-btn mdc-elevation--z2 "
					 use:Ripple={{ surface: true }}
					 onkeydown={() => {}}
					 role="button"
					 tabindex="0"
					 onclick={() => add('')}
				>
					<i class="material-icons">add</i>
				</div>
				<div class="ug-btn mdc-elevation--z2"
						use:Ripple={{surface: true}}
					 	onkeydown={() => {}}
					 	role="button"
					 	tabindex="0"
					 	onclick={() => add_unterbaugruppe('')}
				>
				<i class="material-icons">minus</i>
			</div>
				</div>
		{#each baugruppen as baugruppe,i}
			<div class="treeview">
				<Textfield variant="filled" bind:value={baugruppen[i]} label="Baugruppe">
				</Textfield>
				<div class="addition-button mdc-elevation--z2"
					 	use:Ripple={{ surface: true }}
					 	onkeydown={() => {}}
					 	role="button"
					 	tabindex="0"
					 	onclick={() => add('')}
				>
					<t>Add Unterbaugruppe/Komponente</t>
				</div>
			</div>
		{/each}
		
	</div>
</section>

<style>
    h1 {
				position: fixed;
        top: 80px; /* Abstand vom oberen Rand */
        left: 30px; /* Abstand vom linken Rand */
    }
		.pname{
			top: 150px;
			left: 60px;
		}
		.Baugruppe{
			top: 230px;
			left: 60px;
			width: 200px;
			height: 150px;
		}

		.add-btn{
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
		.add-btn .icon i{
			font-size: 55px;
			height: 30px;
			width: 30px;
			color: #b81018;
		}
		.ug-button{
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
		.addition-button{
			font-size: 20px;
			margin-left: 28px;
		}
		.wholeshit{
				display:flex;
				position:fixed;
				top: 150px;
				left: 30px;
				height: 200px;
				flex-direction: column;
				gap: 20px;
		}


</style>
