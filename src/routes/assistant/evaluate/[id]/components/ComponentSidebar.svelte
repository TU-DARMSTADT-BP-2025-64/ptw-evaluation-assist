<script lang="ts">
	import { EvaluatedAssemblyComponentTreeViewModel } from '$lib/components/ComponentSelectDialog/EvaluatedTreeView';

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
	{#each components as component, i}
		<div
			class={"component" + (selectedComponent === component ? ' selected' : '')}
			role="button"
            tabindex="0"
			onkeydown={() => {}}
			onclick={() => selectedComponent = component}>
			{component.name}
		</div>
	{/each}
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

	.component {
		cursor: pointer;
		border-bottom: 1px solid var(--mdc-theme-on-surface);
		padding: 8px;
	}

	.component.selected {
		color: var(--mdc-theme-primary);
	}
</style>
