<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		getEvaluatedComponents,
		type EvaluatedProductTreeViewModel
	} from '$lib/components/ComponentSelectDialog/EvaluatedTreeView.svelte';
	import Button from '@smui/button';
	import jsPDF from 'jspdf';
	import 'jspdf-autotable';

	const { evaluatedProductTreeView }: { evaluatedProductTreeView: EvaluatedProductTreeViewModel } =
		$props();

	const components = $derived.by(() => {
		return getEvaluatedComponents(evaluatedProductTreeView);
	});

	function goBack() {
		goto('/assistant');
	}

	function generatePDF() {
		const doc = new jsPDF();
		const dateTime = new Date().toLocaleString();
		const productName = evaluatedProductTreeView.name;

		doc.setFontSize(16);
		doc.text(`Befundungsergebnis`, 10, 10);
		doc.setFontSize(12);
		doc.text(`Produktname: ${productName}`, 10, 20);
		doc.text(`Datum und Uhrzeit: ${dateTime}`, 10, 30);

		// Table header
		const headers = ["Komponente", "Strategie", "Zusätzliche Maßnahmen"];
		const rows = components.map(component => [
			component.name,
			component.evaluatedFixStrategy,
			component.getEvaluatedMeasures()
		]);

		// Draw table
		let startY = 40;
		doc.autoTable({
			head: [headers],
			body: rows,
			startY,
		});

		doc.save(`Befundung_${productName.replace(/\s+/g, '_')}.pdf`);
	}

	$inspect(components);
</script>

<div class="evaluation-result">
	<div class="evaluation-result-header">
		<Button class="default-button back-button" onclick={() => goBack()}>
			<i class="material-icons">arrow_back</i>
			<span>Zurück</span>
		</Button>
		Ergebnis der Befundung von {evaluatedProductTreeView.name}
	</div>

	<div class="table">
		<div class="table-header">
			<div class="header-cell cell">Komponente</div>
			<div class="header-cell cell">Strategie</div>
			<div class="header-cell cell">Zusätzliche Maßnahmen</div>
		</div>
		{#each components as component, i}
			<div class="table-row">
				<div class="component-cell">{component.name}</div>
				<div class="fix-strategy-cell">{component.evaluatedFixStrategy}</div>
				<div class="measures-cell">{component.getEvaluatedMeasures()}</div>
			</div>
		{/each}
	</div>

	<Button class="default-button pdf-button" onclick={() => generatePDF()}>
		<i class="material-icons">picture_as_pdf</i>
		<span>PDF Generieren</span>
	</Button>
</div>

<style>
    .evaluation-result {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    :global(.back-button) {
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 100;
    }

    :global(.pdf-button) {
        margin-top: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .evaluation-result-header {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 32px;
    }

    .table {
        width: 50%;
        display: flex;
        flex-direction: column;
        max-height: 400px; /* Maximale Höhe der Tabelle */
        overflow-y: scroll; /* Scrollbar immer anzeigen */
        border: 1px solid rgba(var(--mdc-theme-on-surface-rgb), 0.3); /* Optional: Rahmen */
    }

    .table::-webkit-scrollbar {
        width: 10px; /* Breite der Scrollbar */
    }

    .table::-webkit-scrollbar-thumb {
        background-color: rgba(var(--mdc-theme-primary-rgb), 0.6); /* Farbe des Scrollbalkens */
        border-radius: 4px;
        border: 2px solid rgba(var(--mdc-theme-on-surface-rgb), 0.1); /* Abstand und Rand */
    }

    .table::-webkit-scrollbar-thumb:hover {
        background-color: rgba(var(--mdc-theme-primary-rgb), 0.8); /* Farbe beim Hover */
    }

    .table::-webkit-scrollbar-track {
        background-color: rgba(var(--mdc-theme-on-surface-rgb), 0.1); /* Hintergrundfarbe der Scrollspur */
        border-radius: 4px;
    }

    .table-header {
        border-bottom: 1px solid rgba(var(--mdc-theme-on-surface-rgb), 0.6);
        display: flex;
        padding: 0 8px;
    }

    .header-cell {
        flex: 1;
        text-align: start;
        font-weight: bold;
        color: var(--primary);
        padding-bottom: 4px;
    }

    .table-row {
        padding: 0 8px;
        display: flex;
        border-bottom: 1px solid rgba(var(--mdc-theme-on-surface-rgb), 0.3);
    }

    .component-cell {
        flex: 1;
        padding: 8px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-right: 1px solid rgba(var(--mdc-theme-on-surface-rgb), 0.3);
    }

    .fix-strategy-cell {
        flex: 1;
        padding: 8px 0 8px 8px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-right: 1px solid rgba(var(--mdc-theme-on-surface-rgb), 0.3);
    }

    .measures-cell {
        flex: 1;
        padding: 8px 0 8px 8px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        white-space: normal;
        word-break: break-word;
    }

    .table-row:nth-child(odd) {
        background: rgba(var(--mdc-theme-on-surface-rgb), 0.1);
    }
</style>





