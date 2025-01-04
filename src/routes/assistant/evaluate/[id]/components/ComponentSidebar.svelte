<script lang="ts">
	import { EvaluatedAssemblyComponentTreeViewModel } from '$lib/components/ComponentSelectDialog/SelectableTreeView';

	let {
		components,
		oncomponentselected
	}: {
		components: EvaluatedAssemblyComponentTreeViewModel[];
		oncomponentselected: (component: EvaluatedAssemblyComponentTreeViewModel) => void;
	} = $props();
</script>

<div class="sidebar">
	<div class="title">Komponenten</div>
	{#each components as component, i}
		<div
			class="component"
			role="button"
            tabindex="0"
			onkeydown={() => {}}
			onclick={() => oncomponentselected(component)}>
			{component.name}
		</div>
	{/each}
</div>

<style>
	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.title {
		font-weight: bold;
	}

	.component {
		cursor: pointer;
		border-bottom: 1px solid var(--mdc-on-surface);
		border-top: 1px solid var(--mdc-on-surface);
	}
</style>
