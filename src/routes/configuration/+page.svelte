<script lang="ts">
    import { HeaderService } from '../HeaderService.svelte';
    import ProductTable from '$lib/ProductTable.svelte';
    import type { ProductViewModel } from '$lib/models/product.model';
    
    HeaderService.Instance.setTitle('Konfiguration');
    let props: { data: {products: ProductViewModel[]} } = $props();


    function addProduct() {
        fetch('api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'zylinder'
            })

        })
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
    
</style>