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

<style>
</style>
