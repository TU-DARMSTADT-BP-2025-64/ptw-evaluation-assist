<script lang="ts">
	import { HeaderService } from '../HeaderService.svelte';
	import { Icon } from '@smui/common';
	import Button from '@smui/button';
	import { goto } from '$app/navigation';
	import ProductTable from '$lib/components/ProductTable/ProductTable.svelte';
	import type { ProductViewModel } from '$lib/models/product.model';
	import { onMount } from 'svelte';
	import ProductImportDialog from '$lib/components/ProductImportDialog/ProductImportDialog.svelte';
	import { ProductImporter } from '$lib/components/ProductImportDialog/ProductImporter';
	import { getElementsFromProductTreeView } from '$lib/util/ProductTreeViewUtil';

	HeaderService.Instance.setTitle('Konfiguration');
	let props: { data: { products: ProductViewModel[] } } = $props();
	let products = $state(props.data.products);

	let fileInput = $state<HTMLInputElement | null>(null);

	let productImportDialogOpen = $state(false);

	function editProduct(product: ProductViewModel) {
		goto(`/configuration/${product.id}`);
	}

	function deleteProduct(product: ProductViewModel) {
		fetch(`api/product/${product.id}`, {
			method: 'DELETE'
		});

		products = products.filter((p) => p.id !== product.id);
	}

	function fileSelected() {
		const file = fileInput?.files?.[0];

		if (!file || !file.name.endsWith('.xlsm')) {
			return;
		}
		console.log(file);

		const reader = new FileReader();

		reader.onload = function (e) {
			if (!e.target || !e.target.result) {
				console.error('No file content');
				return;
			}
			const data = new Uint8Array(e.target.result as ArrayBuffer);

			const importedProduct = ProductImporter.getProductTreeViewFromXlsx(data);

			const elements = getElementsFromProductTreeView(importedProduct);

			fetch('/api/product/' + importedProduct.id + '?asTreeView=true', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(elements)
			});

			products = [...products, {id: importedProduct.id, name: importedProduct.name}];
		};

		reader.readAsArrayBuffer(file);
	}
</script>

<svelte:head>
	<title>Konfiguration</title>
	<meta name="description" content="PTW evaluation assist" />
</svelte:head>

<section class="page">
	<div class="back-button">
		<Button onclick={() => goto('/')}>
			<Icon class="material-icons">arrow_back</Icon>
			<span>Zurück</span>
		</Button>
	</div>

	<div class="product-table">
		<ProductTable
			{products}
			onProductClicked={(product) => editProduct(product)}
			showDelete
			onProductDelete={(product) => deleteProduct(product)} />
	</div>

	<div class="product-action-buttons">
		<Button
			id="add-product-button"
			variant="raised"
			color="primary"
			onclick={() => goto('/configuration/add')}>
			<Icon class="material-icons">add</Icon>
			<span>Produkt hinzufügen</span>
		</Button>
		<Button
			id="import-product-button"
			variant="raised"
			color="secondary"
			onclick={() => fileInput?.click()}>
			<Icon class="material-icons">file_upload</Icon>
			<span>Produkt importieren</span>
		</Button>

		<input style="display: none" onchange={fileSelected} type="file" bind:this={fileInput} />
	</div>
</section>

<!-- <ProductImportDialog bind:open={productImportDialogOpen}></ProductImportDialog> -->

<style>
	.page {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.back-button {
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 100;
	}

	.product-table {
		max-height: 100%;
		height: 100%;
		overflow: auto;
		width: 100%;
		max-width: min(100%, 800px);
	}

	.product-action-buttons {
		position: absolute;
		top: 20px;
		right: 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
