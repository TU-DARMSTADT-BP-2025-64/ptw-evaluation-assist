<script lang="ts">
    import { EvaluatedAssemblyComponentTreeViewModel, EvaluatedWearCriterionTreeViewModel } from '$lib/components/ComponentSelectDialog/EvaluatedTreeView';
    import Ripple from '@smui/ripple';
    let {
        wearCriterion = $bindable(),
    }: {
        wearCriterion: EvaluatedWearCriterionTreeViewModel;    
    } = $props();


</script>

<div class="wear-criterion">
    <div class="wear-criterion-label">{wearCriterion.label}</div>

    <div class="wear-thresholds">
        {#each wearCriterion.wearThresholds as threshold, i}
            <div class="wear-threshold mdc-elevation--z2" use:Ripple={{ surface: true }}>
                <div class="threshold-label">{threshold.label}</div>
            </div>
        {/each}
    </div>
</div>

<style>

	.wear-criterion-label {
		font-size: 1rem;
		font-weight: 600;
	}

	.wear-thresholds {
		margin-top: 12px;
		padding: 2px;
		display: grid;
		grid-template-columns: repeat(3, minmax(100px, 1fr));
		gap: 1rem;
	}

	.wear-threshold {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		height: 60px;
		cursor: pointer;
		background-color: var(--mdc-theme-surface);
	}

    :global(.wear-threshold.selected) {
        background-color: var(--mdc-theme-primary);
        color: var(--mdc-theme-on-primary);
    }

</style>

