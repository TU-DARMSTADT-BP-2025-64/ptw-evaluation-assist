import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes/configuration/$types';
import { Repository } from '$lib/server/repository';

export const load: PageServerLoad = async () => {

	const products = Repository.Instance.getProducts().sort((a, b) => a.createdAt - b.createdAt);
	console.log('GetProducts', products);
	return { products };
};
