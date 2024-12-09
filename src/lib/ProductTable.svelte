<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import type { ProductViewModel } from '$lib/models/product.model';
	/*
	// Originaldaten der Tabelle
	const entries = writable([
		{ name: "Steve", favoriteColor: "Red", favoriteNumber: 45 },
		{ name: "Sharon", favoriteColor: "Purple", favoriteNumber: 5 },
		{ name: "Rodney", favoriteColor: "Orange", favoriteNumber: 32 },
		{ name: "Mack", favoriteColor: "Blue", favoriteNumber: 12 },
	]);
	 */
	let props: {products: ProductViewModel[]} = $props();

	console.log(props.products);


	// Reaktive Variable für den Suchbegriff
	let searchQuery = $state("");

	// Abgeleitete Daten basierend auf dem Filter
	// Filtere die Daten basierend auf dem Suchbegriff
	const filteredData = $derived.by(() => {
		return props.products.filter(product =>
			product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.id === Number(searchQuery)
		);
	});
</script>

<style>
    .search-bar {
        margin-bottom: 1rem;
    }
</style>

<!-- Suchleiste -->
<div class="search-bar">
	<input
		type="text"
		placeholder="Search by ID or name..."
		bind:value={searchQuery}
		style="width: 100%; padding: 0.5rem; font-size: 1rem;"
	/>
</div>

<!-- Tabelle -->
<DataTable table$aria-label="Product List" style="max-width: 100%;">
	<Head>
		<Row>
			<Cell>ID</Cell>
			<Cell>Name</Cell>
		</Row>
	</Head>
	<Body>
	{#each filteredData as { id, name }}
		<Row>
			<Cell>{id}</Cell>
			<Cell>{name}</Cell>
		</Row>
	{/each}
	</Body>
</DataTable>

