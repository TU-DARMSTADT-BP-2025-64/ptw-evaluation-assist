<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import { goto } from '$app/navigation';
	import type { ProductViewModel } from '$lib/models/product.model';

	// Props
	let props: { products: ProductViewModel[]; clickable?: boolean } = $props();

	// Suchbegriff
	let searchQuery = $state('');

	// Gefilterte Daten basierend auf dem Suchbegriff
	const filteredData = $derived.by(() => {
		return props.products.filter(
			(product) =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.id === Number(searchQuery)
		);
	});

	// Pagination-Variablen
	let perPage = $state(10);
	let currentPage = $state(0);

	const start = $derived(currentPage * perPage);
	const end = $derived(Math.min(start + perPage, filteredData.length));
	const slice = $derived(filteredData.slice(start, end));
	const lastPage = $derived(Math.max(Math.ceil(filteredData.length / perPage) - 1, 0));

	$effect(() => {
		if (currentPage > lastPage) {
			currentPage = lastPage;
		}
	});

	// Navigationsfunktion
	function navigateToProcess(id: number, name: string) {
		if (props.clickable) {
			goto(`/assistant/product-selection?id=${id}&name=${encodeURIComponent(name)}`);
		}
	}
</script>

<!-- Suchleiste -->
<div class="search-bar">
	<input
		type="text"
		placeholder="Search by ID or name..."
		bind:value={searchQuery}
		style="width: 100%; padding: 0.5rem; font-size: 1rem;" />
</div>

<!-- Tabelle -->
<DataTable table$aria-label="Product List" style="max-width: 100%;">
	<Head>
		<Row>
			<Cell>ID</Cell>
			<Cell>Name</Cell>
			{#if props.clickable}
				<Cell>Aktion</Cell>
			{/if}
		</Row>
	</Head>
	<Body>
		{#each slice as { id, name }}
			<Row>
				<Cell>{id}</Cell>
				<Cell>{name}</Cell>
				{#if props.clickable}
					<Cell>
						<button onclick={() => navigateToProcess(id, name)}> Befundung starten </button>
					</Cell>
				{/if}
			</Row>
		{/each}
	</Body>

	<!-- Pagination -->
	{#snippet paginate()}
		<Pagination>
			<Label>Rows Per Page</Label>
			<Select variant="outlined" bind:value={perPage} noLabel>
				<Option value={10}>10</Option>
				<Option value={25}>25</Option>
				<Option value={100}>100</Option>
			</Select>
			{start + 1}-{end} of {filteredData.length}

			<!-- Navigation Buttons -->
			<IconButton
				class="material-icons"
				title="First page"
				onclick={() => (currentPage = 0)}
				disabled={currentPage === 0}>first_page</IconButton>

			<IconButton
				class="material-icons"
				title="Prev page"
				onclick={() => currentPage--}
				disabled={currentPage === 0}>chevron_left</IconButton>

			<IconButton
				class="material-icons"
				title="Next page"
				onclick={() => currentPage++}
				disabled={currentPage === lastPage}>chevron_right</IconButton>

			<IconButton
				class="material-icons"
				title="Last page"
				onclick={() => (currentPage = lastPage)}
				disabled={currentPage === lastPage}>last_page</IconButton>
		</Pagination>
	{/snippet}
</DataTable>

<style>
	.search-bar {
		margin-bottom: 1rem;
	}
</style>
