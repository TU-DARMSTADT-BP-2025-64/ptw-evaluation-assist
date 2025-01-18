<script lang="ts">
	import type {
		EvaluatedAssemblyComponentTreeViewModel,
		EvaluatedWearCriterionTreeViewModel,
		EvaluatedWearThresholdTreeViewModel
	} from '$lib/components/ComponentSelectDialog/EvaluatedTreeView.svelte';
	import Ripple from '@smui/ripple';
	import Button from '@smui/button';
	import { Icon } from '@smui/common';
	import WearCriterionEvaluation from './WearCriterionEvaluation.svelte';
	import { WearThresholdFixStrategy } from '$lib/models/wear-threshold.model';

	let {
		selectedComponent = $bindable(),
		canFinishEvaluation,
		selectNext,
		onSelectionChanged,
		onEvaluationFinished
	}: {
		selectedComponent: EvaluatedAssemblyComponentTreeViewModel | null;
		canFinishEvaluation: boolean;
		selectNext: () => void;
		onSelectionChanged: () => void;
		onEvaluationFinished: () => void;
	} = $props();

	$effect(() => {
		if (selectedComponent) {
			checkFinishedEvaluation();
		}
	});

	let evaluatedCriteria = $derived.by(() => {
		if (selectedComponent) {
			return selectedComponent.wearCriteria.filter((c) => c.canBeEvaluated());
		}
		return [];
	});

	function checkFinishedEvaluation(): void {
		if (!selectedComponent) {
			return;
		}

		const noWearCriteria = selectedComponent.wearCriteria.length === 0;
		const onlyNonEvaluable = selectedComponent.wearCriteria.every((wearCriterion) => {
			return !wearCriterion.canBeEvaluated();
		});

		const allSelected = selectedComponent!.wearCriteria.every((wearCriterion) => {
			return wearCriterion.selectedThreshold !== null;
		});

		const anySelectedRecycled = selectedComponent!.wearCriteria.some((wearCriterion) => {
			return wearCriterion.selectedThreshold?.fixStrategy === WearThresholdFixStrategy.Recycle;
		});

		selectedComponent.finishedEvaluation =
			noWearCriteria || onlyNonEvaluable || allSelected || anySelectedRecycled;

		if (selectedComponent.finishedEvaluation) {
			const fixStrategyPriority = [
				WearThresholdFixStrategy.Recycle,
				WearThresholdFixStrategy.Repair,
				WearThresholdFixStrategy.Reuse
			];

			const selectedThresholds = selectedComponent.wearCriteria
				.map((wearCriterion) => wearCriterion.selectedThreshold)
				.filter((threshold) => threshold !== null) as EvaluatedWearThresholdTreeViewModel[];

			console.log('selectedThresholds', selectedThresholds);
			const fixStrategy = Math.min(
				...selectedThresholds.map((threshold) =>
					fixStrategyPriority.indexOf(threshold.fixStrategy as WearThresholdFixStrategy)
				).filter((index) => index !== -1)
			);

			console.log('fix strategy', fixStrategy);

			selectedComponent.evaluatedFixStrategy = fixStrategyPriority[fixStrategy];

			selectedComponent.evaluatedProduct.checkIfCanFinishEvaluation();

			console.log('finishedEvaluation', selectedComponent.evaluatedFixStrategy);
		}
	}

	function wearCriterionSelectionChanged(wearCriterion: EvaluatedWearCriterionTreeViewModel) {
		checkFinishedEvaluation();
		onSelectionChanged();
	}

	function skipComponent(): void {
		if (selectedComponent) {
			selectedComponent.skippedEvaluation = true;
			selectedComponent.evaluatedProduct.checkIfCanFinishEvaluation();
		}

		selectNext();
	}

	function getEvaluationResultText(): string {
		if (!selectedComponent || !selectedComponent.evaluatedFixStrategy) {
			return '';
		}

		const fixStrategyText = {
			[WearThresholdFixStrategy.Recycle]: 'Komponente recyceln',
			[WearThresholdFixStrategy.Repair]: 'Komponente reparieren',
			[WearThresholdFixStrategy.Reuse]: 'Komponente wiederverwenden'
		};

		const measures = selectedComponent.getEvaluatedMeasures();
		
		return fixStrategyText[selectedComponent.evaluatedFixStrategy] + (measures.length > 0 ? `: ${measures}` : '');
	}
</script>

<div class="component-evaluation">
	{#if !!selectedComponent}
		<div>
			<div class="component-name">
				Verschleiß von Komponente: {selectedComponent.name}
			</div>
			<div class="wear-criteria">
				{#if evaluatedCriteria.length === 0}
					<span class="no-wear-criteria-found-msg"
						>Keine Verschleißkriterien für diese Komponente gefunden!</span>
				{:else}
					{#each evaluatedCriteria as wearCriterion, i}
						<WearCriterionEvaluation
							bind:wearCriterion={evaluatedCriteria[i]}
							onSelectionChanged={wearCriterionSelectionChanged} />
					{/each}
				{/if}
			</div>

			<div class="evaluation-footer">
				{#if selectedComponent.finishedEvaluation}
					<div class="evaluation-result">
						{getEvaluationResultText()}
					</div>
				{/if}
				<div class="actions">
					{#if canFinishEvaluation}
						<Button variant="raised" onclick={onEvaluationFinished}>
							<Icon class="material-icons">done_all</Icon>
							<span>Befundung abschließen</span>
						</Button>
					{:else if selectedComponent.finishedEvaluation}
						<Button variant="raised" onclick={() => selectNext()}>
							<Icon class="material-icons">arrow_forward</Icon>
							<span>Nächste </span>
						</Button>
					{:else}
						<Button onclick={skipComponent}>
							<Icon class="material-icons">skip_next</Icon>
							<span>Überspringen </span>
						</Button>
					{/if}
				</div>
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
		font-size: 1.3rem;
		font-weight: bold;
		margin-bottom: 2rem;
		text-align: center;
	}

	.wear-criteria {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.evaluation-footer {
		display: flex;
		justify-content: space-between;
		margin-top: 2rem;
	}

	.actions {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		gap: 8px;		
	}

	.evaluation-result {
		font-size: 1.1rem;
		font-weight: bold;
		border: 3px solid green;
		border-radius: 8px;
		padding: 8px;
		margin-left: 8px;
		margin-right: 8px;
		display: flex;
		align-items: center;
      flex-wrap: wrap;
      white-space: normal;
      word-break: break-word;

	}

	.no-wear-criteria-found-msg {
		font-weight: bold;
	}
</style>
