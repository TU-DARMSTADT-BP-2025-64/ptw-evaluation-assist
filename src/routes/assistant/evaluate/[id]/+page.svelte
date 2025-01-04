<script lang="ts">
	import ComponentSelectDialog from '$lib/components/ComponentSelectDialog/ComponentSelectDialog.svelte';
	import { ProductTreeViewModel } from '$lib/models/product.model';
	import { stringify } from 'uuid';
	import ComponentSidebar from './components/ComponentSidebar.svelte';
	import {
		EvaluatedAssemblyComponentTreeViewModel,
		EvaluatedProductTreeViewModel,
		getEvaluatedComponents
	} from '$lib/components/ComponentSelectDialog/EvaluatedTreeView';
	import { goto } from '$app/navigation';
	import Button from '@smui/button';
	import { Icon } from '@smui/common';
	import { HeaderService } from '../../../HeaderService.svelte';
	import ComponentEvaluation from './components/ComponentEvaluation.svelte';

	let { data }: { data: { id: string; productTreeView: ProductTreeViewModel } } = $props();
	let { id, productTreeView } = data;

	HeaderService.Instance.setTitle('Befundung: ' + productTreeView.name);

	let userSelectedEvaluatedComponents = $state(false);
	let evaluatedProductTreeView: EvaluatedProductTreeViewModel | null = $state(null);
	let evaluatedComponents: EvaluatedAssemblyComponentTreeViewModel[] = $state([]);
	let currentlySelectedComponent: EvaluatedAssemblyComponentTreeViewModel | null = $state(null);

	function startEvaluation(treeView: EvaluatedProductTreeViewModel) {
		evaluatedProductTreeView = treeView;
		userSelectedEvaluatedComponents = true;
		evaluatedComponents = getEvaluatedComponents(treeView);
		currentlySelectedComponent = evaluatedComponents.length > 0 ? evaluatedComponents[0] : null;
	}

    function selectNext() {
        if (currentlySelectedComponent) {
            const currentIndex = evaluatedComponents.indexOf(currentlySelectedComponent);
            const nextIndex = currentIndex + 1;
            if (nextIndex < evaluatedComponents.length) {
                currentlySelectedComponent = evaluatedComponents[nextIndex];
            }
        }
    }

</script>

{#if userSelectedEvaluatedComponents}
	<section class="page">
		<div class="evaluation-container">
			<div class="sidebar">
				<ComponentSidebar
					components={evaluatedComponents}
					bind:selectedComponent={currentlySelectedComponent} />
			</div>
			<div class="evaluation">
                <ComponentEvaluation selectedComponent={currentlySelectedComponent} selectNext={selectNext} />
            </div>
		</div>

		<div class="evaluation-footer">
			<Button onclick={() => goto('/assistant')}>
				<span>Abbrechen</span>
			</Button>
			<Button variant="raised" onclick={() => goto('/assistant')}>
				<span>Befundung abschlißen</span>
			</Button>
		</div>
	</section>
{:else}
	<ComponentSelectDialog open={true} {productTreeView} onstartevaluate={startEvaluation} />
{/if}

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

	.evaluation-footer {
        width: 100%;
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		margin: 8px 8px 8px 0;
	}

	.sidebar {
		width: 250px;
		height: 100%;
	}

	.evaluation {
		flex: 3;
	}
</style>
