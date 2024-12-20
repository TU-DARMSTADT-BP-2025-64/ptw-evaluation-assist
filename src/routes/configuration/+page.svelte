<script lang="ts">
    import { HeaderService } from '../HeaderService.svelte';
    import { Icon } from '@smui/common';
	import Button from '@smui/button';
	import { goto } from '$app/navigation';
    import ProductTable from '$lib/components/ProductTable/ProductTable.svelte';
    import type { ProductViewModel } from '$lib/models/product.model';
	import { onMount } from 'svelte';
    
    HeaderService.Instance.setTitle('Konfiguration');
    let props: { data: {products: ProductViewModel[]} } = $props();
    let products = $state(props.data.products);


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

    function editProduct(product: ProductViewModel) {
        goto(`/configuration/${product.id}`);
    }

    function deleteProduct(product: ProductViewModel) {
        fetch(`api/product/${product.id}`, {
            method: 'DELETE'
        })

        products = products.filter(p => p.id !== product.id);
    }
</script>

<svelte:head>
    <title>Konfiguration</title>
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
		<ProductTable 
            products = {products} 
            onProductClicked={(product) => editProduct(product)} 
            showDelete 
            onProductDelete={(product) => deleteProduct(product)} />

	</div>

    <div class="add-product-button">
		<Button variant="raised" color="secondary"  onclick={() => goto('/configuration/add')}>
			<Icon class="material-icons">add</Icon>
			<span>Produkt hinzufügen</span>
		</Button>
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
        max-height: 100%;
        overflow: hidden;
		width: 100%;
		max-width: min(100%, 800px);
	}

    .add-product-button {
        position: absolute;
        top: 20px;
        right: 20px;
    }
    
</style>