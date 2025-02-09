<script lang="ts">
	import { EvaluatedAssemblyComponentTreeViewModel } from '$lib/components/ComponentSelectDialog/EvaluatedTreeView.svelte';

	let {
		components,
		selectedComponent = $bindable()
	}: {
		components: EvaluatedAssemblyComponentTreeViewModel[];
		selectedComponent: EvaluatedAssemblyComponentTreeViewModel | null;
		
	} = $props();
</script>

<div class="sidebar">
	<div class="title">Komponenten</div>
	<div class="components-container">
	{#each components as component, i}
		<div
			class={"component" + (selectedComponent === component ? ' selected' : '')}
			role="button"
            tabindex="0"
			onkeydown={() => {}}
			onclick={() => selectedComponent = component}>


			<div class={'icon-container' + ( component.hasBeenEvaluated() ? ' show' : '')}>
				<i class={ 'material-icons icon' + (component.finishedEvaluation ? ' finished' : ' skipped')}>
					{component.finishedEvaluation ? 'check' : 'skip_next'}
				</i>
			</div>

			<span>{component.name}</span>
			
		</div>
	{/each}
	</div>
</div>

<style>
	.sidebar {
		display: flex;
		flex-direction: column;
	}

	.title {
		font-size: 1.2rem;
		font-weight: bold;
	}


	.components-container{
      height: 100%;
      overflow-y: auto;
	}

	.component {
		cursor: pointer;
		display:flex;
		align-items: center;
		border-bottom: 1px solid var(--mdc-theme-on-surface);
		padding: 8px;
	}

	.component.selected {
		color: var(--mdc-theme-primary);
	}

	:global(.icon-container) {
		visibility: hidden;
		margin-right: 8px;
	}

	:global(.icon-container.show) {
		visibility: visible;
	}

	:global(.icon.finished) {
		color: green;
	}

	:global(.icon.skipped) {
		color: red;
	}
</style>
