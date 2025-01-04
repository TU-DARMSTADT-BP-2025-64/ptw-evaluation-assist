<script lang="ts">
	import ComponentSelectDialog from '$lib/components/ComponentSelectDialog/ComponentSelectDialog.svelte';
	import { ProductTreeViewModel } from '$lib/models/product.model';
	import { stringify } from 'uuid';
	import ComponentSidebar from './components/ComponentSidebar.svelte';
	import {
		EvaluatedAssemblyComponentTreeViewModel,
		EvaluatedProductTreeViewModel,
		getEvaluatedComponents
	} from '$lib/components/ComponentSelectDialog/SelectableTreeView';
	import { goto } from '$app/navigation';
    import Button from '@smui/button';
    import { Icon } from '@smui/common';

	let { data }: { data: { id: string; productTreeView: ProductTreeViewModel } } = $props();
	let { id, productTreeView } = data;

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

</script>

{#if userSelectedEvaluatedComponents}
<section class="page">
    <div class="evaluation-header">
        <div class="back-button">
            <Button  onclick={() => goto('/assistant')}>
                <Icon class="material-icons">arrow_back</Icon>
                <span>Zurück</span>
            </Button>
        </div>

        <h1>Befundung: {productTreeView.name}</h1>
    
    </div>
        <div class="evaluation-container">
    
            <div class="sidebar">
                <ComponentSidebar
                    components={evaluatedComponents}
                    oncomponentselected={(component) => (currentlySelectedComponent = component)} />
            </div>
            <div class="evaluation">
    
            </div>
    
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

    .evaluation-header {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 24px;
    }

    .evaluation-container {
        display: flex;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .back-button {
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 100;
	}

    .sidebar {
        width: 250px;
        height: 100%;
    }

    .evaluation {
        flex: 3;
    }

</style>
