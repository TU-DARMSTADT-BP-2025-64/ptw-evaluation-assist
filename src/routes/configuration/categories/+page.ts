import { createCategoriesTreeView, type CategoriesTreeViewElements } from '$lib/util/CategoriesTreeViewUtil.svelte';
import type { PageLoad } from './$types';

export const ssr = false;
export const prerender = false;

export const load: PageLoad = async () => {

    const categoryElementsResponse = await fetch('/api/categories', {
        method: 'GET'
    });

    const categoryElements = await categoryElementsResponse.json() as CategoriesTreeViewElements;

    console.log('CategoryElements', categoryElements);

    const treeView = createCategoriesTreeView(categoryElements);

    console.log('TreeView', treeView);

    return {
        categoriesTreeView: treeView
    }
};
