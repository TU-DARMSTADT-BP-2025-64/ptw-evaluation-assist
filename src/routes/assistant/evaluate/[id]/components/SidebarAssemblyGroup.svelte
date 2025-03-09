<script lang="ts">
	import type {
		EvaluatedAssemblyComponentTreeViewModel,
		EvaluatedAssemblyGroupTreeViewModel
	} from '$lib/components/ComponentSelectDialog/EvaluatedTreeView.svelte';
	import SidebarAssemblyGroup from './SidebarAssemblyGroup.svelte';
	import IconButton from '@smui/icon-button';

	let {
		assemblyGroup,
		selectedComponent = $bindable(),
        level = 0
	}: {
		assemblyGroup: EvaluatedAssemblyGroupTreeViewModel;
		selectedComponent: EvaluatedAssemblyComponentTreeViewModel | null;
        level: number;
	} = $props();

	let enabledChildren = $derived.by(() => {
		return assemblyGroup.children.filter(child => child.evaluate);
	});
</script>

<div>
	<div
        style="padding-left: {level * 12}px;"
		class="assembly-group"
		onclick={() => (assemblyGroup.expanded = !assemblyGroup.expanded)}
		role="button"
		tabindex="0"
        title="{assemblyGroup.name}"
		onkeydown={() => {}}>
		<i class="material-icons">
			{assemblyGroup.expanded ? 'expand_less' : 'expand_more'}
		</i>
		<div>
			{assemblyGroup.name}
		</div>
	</div>

	<div class="assembly-group-children">
		{#if assemblyGroup.expanded}
			{#each enabledChildren as child, i}
				{#if child.type === 'assembly-group'}
					<SidebarAssemblyGroup
                        level={level + 1}
						assemblyGroup={assemblyGroup.children[i] as EvaluatedAssemblyGroupTreeViewModel}
						bind:selectedComponent />
				{:else}
					<div
						class={'component' + (selectedComponent === child ? ' selected' : '')}
                        style="padding-left: {(level + 1) * 12}px;"
						role="button"
						tabindex="0"
						onkeydown={() => {}}
						onclick={() => (selectedComponent = child as EvaluatedAssemblyComponentTreeViewModel)}>
						<div
							class={'icon-container' +
								((child as EvaluatedAssemblyComponentTreeViewModel).hasBeenEvaluated()
									? ' show'
									: '')}>
							<i
								class={'material-icons icon' +
									((child as EvaluatedAssemblyComponentTreeViewModel).finishedEvaluation
										? ' finished'
										: ' skipped')}>
								{(child as EvaluatedAssemblyComponentTreeViewModel).finishedEvaluation
									? 'check'
									: 'skip_next'}
							</i>
						</div>

						<span>{child.name}</span>
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>

<style>
	.assembly-group {
		display: flex;
		align-items: center;
        padding: 8px;
		border-bottom: 1px solid var(--mdc-theme-on-surface);
        cursor: pointer;
	}

    .assembly-group-children {
        display: flex;
        flex-direction: column;
    }

	.component {
		cursor: pointer;
		display: flex;
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
