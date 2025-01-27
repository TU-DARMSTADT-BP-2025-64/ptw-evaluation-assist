import { createProductTreeView } from '$lib/util/ProductTreeViewUtil';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { v4 as uuidv4 } from 'uuid';
import { ProductTreeViewModel } from '$lib/models/product.model';

export const ssr = false;
export const prerender = false;

export const load: PageLoad = async ({ params }) => {
	console.log('Load', params, params.id);

	const productId = params.id;

	if (productId === 'add') {
		throw redirect(303, '/configuration/' + uuidv4());
	}

	const response = await fetch('/api/product/' + productId + '?asTreeView=true', {
        method: 'GET'
    });

    console.log('Response', response);

	// If the product does not exist we handle it as an add 
	if (response.status === 404) {

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
			productTreeView: productTreeViewModel
		}
	}


	if (!response.ok) {
		return {
			status: response.status,
			error: new Error(response.statusText)
		};
	}

	const productTreeViewElements = await response.json();
	console.log('ProductTreeViewElements', productTreeViewElements);

	const treeView = createProductTreeView(productTreeViewElements);

	return {
		id: productId,
		productTreeView: treeView
	};
};
