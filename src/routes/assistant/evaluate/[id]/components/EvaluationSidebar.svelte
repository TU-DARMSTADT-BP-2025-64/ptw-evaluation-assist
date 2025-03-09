<script lang="ts">
	import { EvaluatedAssemblyComponentTreeViewModel, EvaluatedProductTreeViewModel } from '$lib/components/ComponentSelectDialog/EvaluatedTreeView.svelte';
	import SidebarAssemblyGroup from './SidebarAssemblyGroup.svelte';

	let {
		productTreeView,
		selectedComponent = $bindable()
	}: {
		productTreeView: EvaluatedProductTreeViewModel;
		selectedComponent: EvaluatedAssemblyComponentTreeViewModel | null;
		
	} = $props();

	let enabledGroups = $derived.by(() => {
		return productTreeView.assemblyGroups.filter(group => group.evaluate);
	});
</script>

<div class="sidebar">
	<div class="title">Komponenten</div>
	<div class="components-container">
		{#each enabledGroups as group, i}
			<SidebarAssemblyGroup
				level={0}
				assemblyGroup={group}
				bind:selectedComponent={selectedComponent} />
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

	
</style>
