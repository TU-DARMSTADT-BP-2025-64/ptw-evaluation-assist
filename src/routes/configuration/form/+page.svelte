<script lang="ts">
	import { HeaderService } from './../../HeaderService.svelte';
	import Textfield from '@smui/textfield';
	HeaderService.Instance.setTitle('Konfiguration');
	let valueA = $state('');
//liste von den baugruppen erstellen und dann mit dem plus oder minus ein
	// element entfernen oder hinzufügen
</script>

<body>
<h1>Produkt hinzufügen</h1>
</body>

<section>

	<div class="pname">
		<div>
			<Textfield variant="filled" bind:value={valueA} label="Produkt Name">
			</Textfield>
		</div>
	</div>

	<div class="Baugruppe">
		<div>
			<Textfield variant="filled" bind:value={valueA} label="Baugruppe">
			</Textfield>
		</div>
	</div>


</section>

<style>
    h1 {
        position: fixed;
        top: 80px; /* Abstand vom oberen Rand */
        left: 30px; /* Abstand vom linken Rand */
    }
		.pname{
			position: fixed;
			top: 150px;
			left: 60px;
		}
		.Baugruppe{
			position: fixed;
			top: 230px;
			left: 60px;
				cursor: crosshair;
		}
</style>
