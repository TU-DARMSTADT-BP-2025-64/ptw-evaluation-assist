<script lang="ts">
	import { HeaderService } from '../HeaderService.svelte';
	import ProductTable from '$lib/components/ProductTable/ProductTable.svelte';
	import type { ProductViewModel } from '$lib/models/product.model';

	HeaderService.Instance.setTitle('Assistent');
	let props: { data: {products: ProductViewModel[]} } = $props();
</script>

<svelte:head>
	<title>Assistent</title>
	<meta name="description" content="PTW evaluation assist" />
</svelte:head>

<section>
	<ProductTable products = {props.data.products} />
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
