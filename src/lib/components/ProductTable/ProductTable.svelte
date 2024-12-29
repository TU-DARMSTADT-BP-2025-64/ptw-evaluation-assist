<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import TextField from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import { goto } from '$app/navigation';
	import type { ProductViewModel } from '$lib/models/product.model';
  	import { Icon } from '@smui/common';

	// Props
	let props: { products: ProductViewModel[]; clickable?: boolean } = $props();

	// Reaktive Variable für den Suchbegriff
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

<div class="product-table">
	<!-- Suchleiste -->
	<div class="search-bar mdc-elevation--z1">
		<TextField style="width: 100%" variant="filled" bind:value={searchQuery} label="Suche">
			{#snippet leadingIcon()}
			  <Icon style="margin-left: 8px; margin-right: 4px" class="material-icons">search</Icon>
			{/snippet}
		  </TextField>
	</div>
	
	<div class="mdc-elevation--z1" style="width: 100%">
		<!-- Tabelle -->
		<DataTable table$aria-label="Product List" style="width: 100%;">
			<Head>
				<Row>
					<Cell>ID</Cell>
					<Cell>Name</Cell>
				</Row>
			</Head>
			<Body>
				{#each slice as { id, name }}
					<Row>
						<Cell>{id}</Cell>
						<Cell>{name}</Cell>
					</Row>
				{/each}
			</Body>
		
			<!-- Pagination -->
			{#snippet paginate()}
				<Pagination>
					<Label>Produkte pro Seite</Label>
					<Select variant="outlined" bind:value={perPage} noLabel>
						<Option value={10}>10</Option>
						<Option value={25}>25</Option>
						<Option value={100}>100</Option>
					</Select>
					{#snippet total()}
						{start + 1}-{end} of {filteredData.length}
					{/snippet}
		
					<!-- Buttons for Pagination -->
					<IconButton
						class="material-icons"
						action="first-page"
						title="First page"
						onclick={() => (currentPage = 0)}
						disabled={currentPage === 0}>first_page</IconButton
					>
		
					<IconButton
						class="material-icons"
						action="prev-page"
						title="Prev page"
						onclick={() => currentPage--}
						disabled={currentPage === 0}>chevron_left</IconButton
					>
		
					<IconButton
						class="material-icons"
						action="next-page"
						title="Next page"
						onclick={() => currentPage++}
						disabled={currentPage === lastPage}>chevron_right</IconButton
					>
		
					<IconButton
						class="material-icons"
						action="last-page"
						title="Last page"
						onclick={() => (currentPage = lastPage)}
						disabled={currentPage === lastPage}>last_page</IconButton
					>
				</Pagination>
			{/snippet}
		</DataTable>
	</div>
</div>

<style>

	.product-table {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

	}
	.search-bar {
		margin-top: 2rem;
		margin-bottom: 2rem;
		width: 100%;
		max-width: min(100%, 400px);
	}
</style>
