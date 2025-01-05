<script lang="ts">
	import ComponentSelectDialog from '$lib/components/ComponentSelectDialog/ComponentSelectDialog.svelte';
	import { ProductTreeViewModel } from '$lib/models/product.model';
	import ComponentSidebar from './components/ComponentSidebar.svelte';
	import {
		EvaluatedAssemblyComponentTreeViewModel,
		EvaluatedProductTreeViewModel,
		getEvaluatedComponents
	} from '$lib/components/ComponentSelectDialog/EvaluatedTreeView.svelte';
	import { goto } from '$app/navigation';
	import Button from '@smui/button';
	import { Icon } from '@smui/common';
	import { HeaderService } from '../../../HeaderService.svelte';
	import ComponentEvaluation from './components/ComponentEvaluation.svelte';
	import EvaluationResult from './components/EvaluationResult.svelte';

	let { data }: { data: { id: string; productTreeView: ProductTreeViewModel } } = $props();
	let { id, productTreeView } = data;

	HeaderService.Instance.setTitle('Befundung: ' + productTreeView.name);

	let userSelectedEvaluatedComponents = $state(false);
	let evaluatedProductTreeView: EvaluatedProductTreeViewModel | null = $state(null);
	let evaluatedComponents: EvaluatedAssemblyComponentTreeViewModel[] = $state([]);
	let currentlySelectedComponent: EvaluatedAssemblyComponentTreeViewModel | null = $state(null);
	let finishedEvaluation = $state(false);

	function startEvaluation(treeView: EvaluatedProductTreeViewModel) {
		console.log('startEvaluation', treeView);
		evaluatedProductTreeView = treeView;
		console.log('evaluatedProductTreeView', evaluatedProductTreeView);
		userSelectedEvaluatedComponents = true;
		evaluatedComponents = getEvaluatedComponents(treeView);
		currentlySelectedComponent = evaluatedComponents.length > 0 ? evaluatedComponents[0] : null;
	}

	function selectNext() {
		if (currentlySelectedComponent) {
			const currentIndex = evaluatedComponents.indexOf(currentlySelectedComponent);

			let nextUnfinishedComponent = evaluatedComponents
				.slice(currentIndex + 1)
				.find((component) => !component.hasBeenEvaluated());

			if (!nextUnfinishedComponent && !allComponentsEvaluated()) {
				nextUnfinishedComponent = evaluatedComponents.find(
					(component) => !component.hasBeenEvaluated()
				);
			}

			const nextIndex = currentIndex + 1;
			if (nextIndex < evaluatedComponents.length) {
				currentlySelectedComponent = evaluatedComponents[nextIndex];
			}
		}
	}

	function allComponentsEvaluated(): boolean {
		return evaluatedComponents.every((component) => component.hasBeenEvaluated());
	}
</script>

<section class="page">
	{#if userSelectedEvaluatedComponents && evaluatedProductTreeView}
		{#if finishedEvaluation}
			<EvaluationResult evaluatedProductTreeView={evaluatedProductTreeView} />
		{:else}
			<div class="evaluation-container">
				<div class="sidebar">
					<ComponentSidebar
						components={evaluatedComponents}
						bind:selectedComponent={currentlySelectedComponent} />
				</div>
				<div class="evaluation">
					<ComponentEvaluation
						bind:selectedComponent={currentlySelectedComponent}
						{selectNext}
						canFinishEvaluation={evaluatedProductTreeView!.canFinishEvaluation}
						onEvaluationFinished={() => {
							finishedEvaluation = true;
						}}
						onSelectionChanged={() => {
							evaluatedProductTreeView!.checkIfCanFinishEvaluation();
						}} />
				</div>
			</div>
		{/if}
	{:else}
		<ComponentSelectDialog open={true} {productTreeView} onstartevaluate={startEvaluation} />
	{/if}
</section>

<style>
	.page {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.evaluation-container {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.sidebar {
		width: 250px;
		height: 100%;
		border-right: 1px solid var(--mdc-theme-on-surface);
	}

	.sidebar {
		width: 250px;
		height: 100%;
	}

	.evaluation {
		flex: 3;
	}
</style>
