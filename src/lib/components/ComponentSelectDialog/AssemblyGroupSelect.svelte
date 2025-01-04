<script lang="ts">
	import type { AssemblyGroupTreeViewModel } from '$lib/models/assembly-group.model';
	import IconButton from '@smui/icon-button';
    import AssemblyGroupSelect from './AssemblyGroupSelect.svelte';
	import { EvaluatedAssemblyGroupTreeViewModel } from './SelectableTreeView';

	let { assemblyGroup = $bindable() }: { assemblyGroup: EvaluatedAssemblyGroupTreeViewModel } = $props();

	console.log(assemblyGroup);

	let expanded = $state(false);
</script>

<div>
	<div class="assembly-group">
		<input type="checkbox" bind:checked={assemblyGroup.evaluate} />
		<IconButton onclick={() => (expanded = !expanded)} class="material-icons">
			{expanded ? 'expand_less' : 'expand_more'}
		</IconButton>
		<div>
			{assemblyGroup.name}
		</div>
	</div>

	<div class="assembly-group-children">
        {#if expanded}
            {#each assemblyGroup.children as group, i}
                    {#if group.type === 'assembly-group'}
                        <AssemblyGroupSelect bind:assemblyGroup={assemblyGroup.children[i] as EvaluatedAssemblyGroupTreeViewModel} />
                    {:else}
                        <div class="assembly-group">
                            <input type="checkbox" bind:checked={assemblyGroup.children[i].evaluate} />
                            <div>
                                {assemblyGroup.children[i].name}
                            </div>
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
		gap: 8px;
	}

    .assembly-group-children {
        margin-left: 16px;
    }
</style>
