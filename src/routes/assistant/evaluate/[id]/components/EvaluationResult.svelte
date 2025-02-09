<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		getEvaluatedComponents,
		type EvaluatedProductTreeViewModel
	} from '$lib/components/ComponentSelectDialog/EvaluatedTreeView.svelte';
	import Button from '@smui/button';
	import {jsPDF} from 'jspdf';
	import 'jspdf-autotable';





	const { evaluatedProductTreeView }: { evaluatedProductTreeView: EvaluatedProductTreeViewModel } =
		$props();


	const names = [];

	function traverseArrayWithNames(group, depth) {
		let indent = ' '.repeat(depth * 2);
		names.push(indent + group.name);

		group.children.forEach(child => {
			if (child.type === 'assembly-group') {
				traverseArrayWithNames(child, depth + 1);
			}
			else {
				let indent = ' '.repeat(depth * 2 + 2);
				names.push(indent + child.name);
			}
		})
	}

	evaluatedProductTreeView.assemblyGroups.forEach(assemblyGroup => {
		traverseArrayWithNames(assemblyGroup, 0);
	})




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
		const logoBase64 = "data:image/png;base64,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"
		doc.addImage(logoBase64, "PNG", 138, 5, 100, 20); // Adjust position and size

		doc.setFontSize(16);
		doc.getFillColor();
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
			headStyles: {
				fillColor: [184, 16, 24], // Red background
				textColor: [255, 255, 255], // White text
			},
			bodyStyles: {
				textColor: [0, 0, 0], // Black text
			}

		});
		doc.addPage();
		doc.addImage(logoBase64, "PNG", 138, 5, 100, 20); // Adjust position and size
		doc.setFontSize(16);
		doc.text('Übersicht zur Baugruppenstruktur', 10, 10); // Überschrift hinzufügen
		doc.setFontSize(12);
		names.forEach((name, index) => {
			doc.text(name, 10, 20 + index * 5); // Namen unter der Überschrift platzieren
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

	<Button class="pdf-button" onclick={() => generatePDF()} id="pdf-creation">
		<i class="material-icons">file_download</i>
		<span>PDF Download</span>
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
        width: 60%;
        display: flex;
        flex-direction: column;
        max-height: 650px;
        overflow-y: auto;
        border: 1px solid rgba(var(--mdc-theme-on-surface-rgb), 0.3);
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



