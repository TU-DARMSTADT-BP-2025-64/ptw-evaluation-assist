<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import TextField from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import Button from '@smui/button';
	import { Label } from '@smui/common';
	import { goto } from '$app/navigation';
	import type { ProductViewModel } from '$lib/models/product.model';
	import { Icon } from '@smui/common';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';

	let {
		products,
		onProductClicked,
		showDelete = false,
		onProductDelete = () => {}
	}: {
		products: ProductViewModel[];
		onProductClicked: (product: ProductViewModel) => void;
		showDelete?: boolean;
		onProductDelete?: (product: ProductViewModel) => void;
	} = $props();

	// Reaktive Variable für den Suchbegriff
	let searchQuery = $state('');

	let verifyDeleteDialogOpen = $state(false);
	let productToDelete: ProductViewModel | null = $state(null);

	// Filtere die Daten basierend auf dem Suchbegriff
	const filteredData = $derived.by(() => {
		return products.filter(
			(product) =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.id === searchQuery
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

	function verifyDelete(event: Event, product: ProductViewModel) {
		event.stopPropagation();
		productToDelete = product;
		verifyDeleteDialogOpen = true;
	}

	function cancelDelete() {
		verifyDeleteDialogOpen = false;
		productToDelete = null;
	}

	function deleteProduct() {
		if (productToDelete) {
			onProductDelete(productToDelete);
			productToDelete = null;
		}
		verifyDeleteDialogOpen = false;
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
					<Cell>Produkt</Cell>
					{#if showDelete}
						<Cell style="width: 100px"></Cell>
					{/if}
				</Row>
			</Head>
			<Body>
				{#each slice as product}
					<Row style="cursor: pointer" onclick={() => onProductClicked(product)}>
						<Cell>{product.name}</Cell>

						{#if showDelete}
							<Cell style="width: 100px;">
								<IconButton class="material-icons" action="delete" title="Delete" onclick={(event: Event) =>  verifyDelete(event, product)}>delete</IconButton>
							</Cell>
						{/if}
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

<Dialog bind:open={verifyDeleteDialogOpen}>
	<Title>Produkt löschen</Title>
	<Content>
		<p>Wollen Sie das Produkt: 
			<strong>{productToDelete?.name}</strong>
			wirklich löschen?</p>
	</Content>
	<div class="actions">
		<Button class="color-unset" onclick={() => cancelDelete()}>Abbrechen</Button>
		<Button onclick={() => deleteProduct()}>Löschen</Button>
	</div>
</Dialog>

<style>
	.product-table {
		width: 100%;
		height: 100%;
		overflow: hidden;
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

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		margin: 8px 8px 8px 0;
	}
</style>
