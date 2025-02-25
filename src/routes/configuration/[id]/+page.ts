import { createProductTreeView } from '$lib/util/ProductTreeViewUtil';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { v4 as uuidv4 } from 'uuid';
import { ProductTreeViewModel } from '$lib/models/product.model';
import { createCategoriesTreeView } from '$lib/util/CategoriesTreeViewUtil.svelte';

export const ssr = false;
export const prerender = false;

export const load: PageLoad = async ({ params }) => {
	console.log('Load', params, params.id);

	const productId = params.id;

	if (productId === 'add') {
		throw redirect(303, '/configuration/' + uuidv4());
	}

	const productTreeViewResponse = await fetch('/api/product/' + productId + '?asTreeView=true', {
        method: 'GET'
    });

	const categoriesResponse = await fetch('/api/categories', {
		method: 'GET'
	});

	const categoryElements = await categoriesResponse.json();
	const categoriesTreeView = createCategoriesTreeView(categoryElements);

    console.log('Response', productTreeViewResponse);

	// If the product does not exist we handle it as an add 
	if (productTreeViewResponse.status === 404) {

		const productTreeViewModel = new ProductTreeViewModel({
			id: productId,
		});


		productTreeViewModel.fixStrategies.push({
			id: uuidv4(),
			name: 'Reuse',
			priority: 0,
			product: productTreeViewModel
		});

		productTreeViewModel.fixStrategies.push({
			id: uuidv4(),
			name: 'Remanufacture',
			priority: 1,
			product: productTreeViewModel
		});

		productTreeViewModel.fixStrategies.push({
			id: uuidv4(),
			name: 'Recycle',
			priority: 2,
			product: productTreeViewModel
		});

		return {
			id: productId,
			productTreeView: productTreeViewModel,
			categoriesTreeView: categoriesTreeView
		}
	}


	if (!productTreeViewResponse.ok) {
		return {
			status: productTreeViewResponse.status,
			error: new Error(productTreeViewResponse.statusText)
		};
	}

	const productTreeViewElements = await productTreeViewResponse.json();
	console.log('ProductTreeViewElements', productTreeViewElements);

	const treeView = createProductTreeView(productTreeViewElements);

	return {
		id: productId,
		productTreeView: treeView,
		categoriesTreeView: categoriesTreeView
	};
};
