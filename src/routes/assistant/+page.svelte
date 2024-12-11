<script lang="ts">
	import { HeaderService } from '../HeaderService.svelte';
	import Textfield from '@smui/textfield';
	import {onMount}from 'svelte';
	let value = $state('');
	let products =[];
	let subgroups: string | any[]=[];
	let selectedProduct='';
	let selectedSubgroup='';
    
    HeaderService.Instance.setTitle('Assistent');
//Produkte laden
	onMount(async()=> {products= await fetchProducts();

});
// Produkte von der API abrufen
async function fetchProducts(){

const response = await fetch ('/api/products');
return await response.json();
}
//funtion Unterbaugruppen für ein Produkt abrufen
async function fetchSubgroups(product:string) {
	const response = await fetch(`/api/subgroups?product=${encodeURIComponent(product)}`); 
		subgroups = await response.json(); 
	
}


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
<div>
	<Textfield
	style="width: 100%;"
			bind:value={selectedProduct}
			label="Unterbaugruppe suchen"
			class="solo-input"
			on:change={() => fetchSubgroups(selectedProduct)} />
</div>

{#if subgroups.length > 0}
		<div>
			<label for="subgroupSelect">Unterbaugruppe auswählen:</label>
			<select id="subgroupSelect" bind:value={selectedSubgroup}>
				{#each subgroups as subgroup}
					<option value={subgroup}>{subgroup}</option>
				{/each}
			</select>
		</div>
	{/if}


<style>
</style>
