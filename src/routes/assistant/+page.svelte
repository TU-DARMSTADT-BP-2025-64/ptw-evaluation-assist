<script lang="ts">
	import { HeaderService } from '../HeaderService.svelte';
	import ProductTable from '$lib/components/ProductTable/ProductTable.svelte';
	import type { ProductViewModel } from '$lib/models/product.model';
	import { Icon } from '@smui/common';
	import Button from '@smui/button';
	import { goto } from '$app/navigation';

	HeaderService.Instance.setTitle('Assistent');
	let props: { data: {products: ProductViewModel[]} } = $props();

	function startEvaluation(product: ProductViewModel) {
		goto(`/assistant/${product.id}`);
	}
</script>

<svelte:head>
	<title>Assistent</title>
	<meta name="description" content="PTW evaluation assist" />
</svelte:head>

<section class="page">
	<div class="back-button">
		<Button  onclick={() => goto('/')}>
			<Icon class="material-icons">arrow_back</Icon>
			<span>Zurück</span>
		</Button>
	</div>

	<div class="product-table">
		<ProductTable products = {props.data.products} onProductClicked={(product) => startEvaluation(product)} />
	</div>
</section>

<style>
	.page {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
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
		width: 100%;
		max-width: min(100%, 800px);
	}
</style>
