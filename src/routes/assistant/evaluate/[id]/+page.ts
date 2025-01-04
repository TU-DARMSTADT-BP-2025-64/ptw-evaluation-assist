import { createProductTreeView } from '$lib/util/ProductTreeViewUtil';
import type { PageLoad } from './$types';


export const ssr = false;
export const prerender = false;


export const load: PageLoad = async ({ params }) => {
	console.log('Load', params, params.id);

	const productId = params.id;

	const response = await fetch('/api/product/' + productId + '?asTreeView=true', {
        method: 'GET'
    });

    console.log('Response', response);

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
