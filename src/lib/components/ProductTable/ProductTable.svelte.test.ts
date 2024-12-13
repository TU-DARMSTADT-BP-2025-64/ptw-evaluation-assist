/*
import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import DataTableComponent from './ProductTable.svelte' // Ersetzen Sie dies durch den tatsächlichen Pfad zu Ihrer Komponente

const mockProducts = [
	{ id: 1, name: 'Product A' },
	{ id: 2, name: 'Product B' },
	{ id: 3, name: 'Product C' },
	{ id: 4, name: 'Product D' },
	{ id: 5, name: 'Product E' }
];

describe('DataTableComponent', () => {
	it('should render 5 rows with correct ID and name', async () => {
		// Komponente rendern mit den Mock-Daten
		const { getAllByRole, getByText } = render(DataTableComponent, {
			props: { products: mockProducts },
		});

		// Prüfen, ob 5 Tabellenzeilen (Rows) existieren
		const rows = getAllByRole('row');
		expect(rows).toHaveLength(mockProducts.length + 1); // +1 für die Header-Row

		// Sicherstellen, dass die Tabelle alle Einträge anzeigt
		mockProducts.forEach((product) => {
			expect(getByText(product.id.toString())).toBeInTheDocument();
			expect(getByText(product.name)).toBeInTheDocument();
		});
	});
	*/
