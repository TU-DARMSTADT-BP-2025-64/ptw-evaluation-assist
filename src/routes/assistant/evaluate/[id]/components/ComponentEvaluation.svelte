<script lang="ts">
	import type { EvaluatedAssemblyComponentTreeViewModel } from '$lib/components/ComponentSelectDialog/EvaluatedTreeView';
	import Ripple from '@smui/ripple';
	import Button from '@smui/button';
	import { Icon } from '@smui/common';
	import WearCriterionEvaluation from './WearCriterionEvaluation.svelte';

	let {
		selectedComponent,
		selectNext
	}: { selectedComponent: EvaluatedAssemblyComponentTreeViewModel | null; selectNext: () => void } =
		$props();

	let evaluatedCriteria = $derived.by(() => {
		if (selectedComponent) {
			return selectedComponent.wearCriteria.filter(
				(c) => c.wearThresholds.length > 0 && c.label.length > 0
			);
		}
		return [];
	});

	let finished = $derived.by(() => {
		return evaluatedCriteria.every((c) => c.wearThresholds.every((t) => t.selected));
	});
</script>

<div class="component-evaluation">
	{#if !!selectedComponent}
		<div>
			<div class="component-name">
				Verschleiß von Komponente: {selectedComponent.name}
			</div>
			<div class="wear-criteria">
				{#if evaluatedCriteria.length === 0}
					<span class="no-wear-criteria-found-msg">Keine Verschleißkriterien für diese Komponente gefunden!</span>
				{:else}
					{#each evaluatedCriteria as wearCriterion, i}
						<WearCriterionEvaluation bind:wearCriterion={evaluatedCriteria[i]} />
					{/each}
				{/if}
			</div>

			<div class="actions">
				<Button onclick={selectNext}>
					<Icon class="material-icons">skip_next</Icon>
					<span>Überspringen </span>
				</Button>
				<Button variant="raised" disabled={!finished}>
					<Icon class="material-icons">arrow_forward</Icon>
					<span>Nächste </span>
				</Button>
			</div>
		</div>
	{:else}
		<div class="no-component-selected">
			<span>Keine Komponente ausgewählt</span>
		</div>
	{/if}
</div>

<style>
	.component-evaluation {
		padding-left: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.component-name {
		font-size: 1.4rem;
		/* font-weight: bold; */
		margin-bottom: 1rem;
	}

	.wear-criteria {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.actions {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		margin: 8px 8px 8px 0;
	}

    .no-wear-criteria-found-msg {
        font-weight: bold;
    }
</style>
