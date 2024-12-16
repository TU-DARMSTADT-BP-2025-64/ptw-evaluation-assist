<script lang="ts">
    import { HeaderService } from '../HeaderService.svelte';
    import ProductTable from '$lib/components/ProductTable/ProductTable.svelte';
    import type { ProductViewModel } from '$lib/models/product.model';
	import { goto } from '$app/navigation';
    
    HeaderService.Instance.setTitle('Konfiguration');
    let props: { data: {products: ProductViewModel[]} } = $props();


    function addProduct() {
		goto('configuration/form');
        // fetch('api/product', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name: 'zylinder'
        //     })

        // })
    }
</script>

<svelte:head>
	<title>Konfiguration</title>
	<meta name="description" content="PTW evaluation assist" />
</svelte:head>

<section>
    Konfiguration
    <button onclick="{() => addProduct()}">Add product</button>
    <ProductTable products = {props.data.products} />
</section>

<style>
	.card-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 12px;
		border-radius: 8px;
		background: white;
		cursor: pointer;
		margin-right: 1300px;
		position: relative; /* Necessary for absolute positioning of label */
		width: 48px; /* Adjust width to fit the button */
		height: 48px; /* Adjust height to fit the button */
	}

	.card-btn .icon i {
		font-size: 60px;
		height: 60px;
		width: 60px;
		color: #b81018;
	}
</style>
