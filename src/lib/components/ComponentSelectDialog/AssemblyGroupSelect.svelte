<script lang="ts">
	import IconButton from '@smui/icon-button';
    import AssemblyGroupSelect from './AssemblyGroupSelect.svelte';
	import { EvaluatedAssemblyGroupTreeViewModel } from './EvaluatedTreeView.svelte';

	let { assemblyGroup = $bindable() }: { assemblyGroup: EvaluatedAssemblyGroupTreeViewModel } = $props();

	console.log(assemblyGroup);

	let expanded = $state(false);
</script>

<div>
	<div class="assembly-group">
		<input type="checkbox" class="component-select-checkbox" checked={assemblyGroup.evaluate} onchange={(e) => assemblyGroup.setEvaluate((e.target! as any).checked as boolean)} />
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
                            <input type="checkbox" class="component-select-checkbox"  checked={assemblyGroup.children[i].evaluate} onchange={(e) => group.setEvaluate((e.target! as any).checked)} />
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
