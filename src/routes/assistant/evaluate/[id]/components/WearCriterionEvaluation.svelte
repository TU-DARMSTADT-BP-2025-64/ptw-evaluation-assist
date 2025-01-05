<script lang="ts">
	import {
		EvaluatedAssemblyComponentTreeViewModel,
		EvaluatedWearCriterionTreeViewModel,

		EvaluatedWearThresholdTreeViewModel

	} from '$lib/components/ComponentSelectDialog/EvaluatedTreeView.svelte';
	import Ripple from '@smui/ripple';
	let {
		wearCriterion = $bindable(),
		onSelectionChanged,
	}: {
		wearCriterion: EvaluatedWearCriterionTreeViewModel;
		onSelectionChanged: (wearCriterion: EvaluatedWearCriterionTreeViewModel) => void;
	} = $props();


	let selectedThreshold: EvaluatedWearThresholdTreeViewModel | null = $state(null);

	let evaluatedThresholds = $derived.by(() => {
		return wearCriterion.wearThresholds.filter((threshold) => threshold.canBeEvaluated());
	});


	function toggleSelected(threshold: EvaluatedWearThresholdTreeViewModel): void {
		if (selectedThreshold?.id === threshold.id) {
			selectedThreshold = null;
		} else {
			selectedThreshold = threshold;
		}

		wearCriterion.selectedThreshold = selectedThreshold;

		onSelectionChanged(wearCriterion);
    }
</script>

<div class="wear-criterion">
	<div class="wear-criterion-label">{wearCriterion.label}</div>

	<div class="wear-thresholds">
		{#each evaluatedThresholds as threshold, i}
			<div
				class={'wear-threshold mdc-elevation--z2' + (selectedThreshold?.id === threshold.id ? ' selected' : '')}
				use:Ripple={{ surface: true }}
				role="button"
				tabindex="0"
				onkeydown="{(e) => e.key === 'Enter' && toggleSelected(wearCriterion.wearThresholds[i])}"
				onclick={() => toggleSelected(wearCriterion.wearThresholds[i])}>
				<div class="threshold-label">{threshold.label}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.wear-criterion-label {
		font-size: 1.5rem;
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
		background-color: var(--mdc-theme-primary) !important;
		color: var(--mdc-theme-on-primary);
	}
</style>
