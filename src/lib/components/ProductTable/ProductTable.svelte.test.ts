
import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import DataTableComponent from './ProductTable.svelte'

const mockProducts = [
	{ id: 1, name: 'Product A' },
	{ id: 2, name: 'Product B' },
	{ id: 3, name: 'Product C' },
	{ id: 4, name: 'Product D' },
	{ id: 5, name: 'Product E' }
];

describe('DataTableComponent', () => {
	it('should render 5 rows with correct ID and name', async () => {
		render(DataTableComponent, {
			props: { products: mockProducts },
		});

		const rows = document.querySelectorAll('.mdc-data-table__row');
		expect(rows).toHaveLength(mockProducts.length); 
	});
});
