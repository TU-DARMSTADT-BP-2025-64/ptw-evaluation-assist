<script lang="ts">
	import { HeaderService } from '../HeaderService.svelte';
	import Textfield from '@smui/textfield';

	let value = $state('');
    
    HeaderService.Instance.setTitle('Assistent');
</script>

<svelte:head>
	<title>Assistent</title>
	<meta name="description" content="PTW evaluation assist" />
</svelte:head>

<section>

	<div>
		<Textfield
		style="width: 100%;"
		bind:value
		label="Search"
		class="solo-input"></Textfield>
	</div>
    
	
</section>

<style>
</style>
