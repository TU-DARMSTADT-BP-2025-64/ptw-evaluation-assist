<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		getEvaluatedComponents,
		type EvaluatedProductTreeViewModel
	} from '$lib/components/ComponentSelectDialog/EvaluatedTreeView.svelte';
    import Button from '@smui/button';

	const { evaluatedProductTreeView }: { evaluatedProductTreeView: EvaluatedProductTreeViewModel } =
		$props();

	const components = $derived.by(() => {
		return getEvaluatedComponents(evaluatedProductTreeView);
	});

    function goBack() {
        goto('/assistant');
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

	.evaluation-result-header {
		font-size: 1.5rem;
		font-weight: bold;
		margin-bottom: 32px;
	}

	.table {
        width: 50%;
		display: flex;
		flex-direction: column;
	}

	.table-header {
		border-bottom: 1px solid rgba(var(--mdc-theme-on-surface-rgb), 0.6);
		display: flex;
		padding: 0 8px;
	}

	.header-cell {
		flex: 1;
		text-align: start;
		/* font-size: 15px; */
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
	}

	.measures-cell {
		flex: 1;
		padding: 8px 0 8px 8px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.table-row:nth-child(odd) {
		background: rgba(var(--mdc-theme-on-surface-rgb), 0.1);
	}
</style>
