<script lang="ts">
    import Textfield from '@smui/textfield';
    import Select, { Option } from '@smui/select';
	import { WearThresholdFixStrategy, WearThresholdFixStrategyTranslation, WearThresholdTypeTranslation, type WearThresholdTreeViewModel } from '$lib/models/wear-threshold.model';
	import { Strategies } from '$lib/models/assembly-component.model';

    let {wearThreshold = $bindable()}: {wearThreshold: WearThresholdTreeViewModel} = $props();

    const strategies = Object.keys(WearThresholdFixStrategy);

    function getStrategyTranslation(strategy: string): string {
        return WearThresholdFixStrategyTranslation[strategy];
    }
</script>

<div class="threshold">
    <div class="threshold-type">{WearThresholdTypeTranslation[wearThreshold.type]}</div>
    <div class="threshold-value">
        <Textfield bind:value={wearThreshold.label} label="Grenzwert"></Textfield>
    </div>
    <div class="threshold-strategy">
        <Select style="margin-top: 18px" bind:value={wearThreshold.fixStrategy} label="Strategie">
            {#each strategies as strat}
                <Option value={strat}>{getStrategyTranslation(strat)}</Option>
            {/each}
        </Select>
    </div>
    <div class="threshold-measures">
        <Textfield
            textarea
            bind:value={wearThreshold.measures}
            label="Maßnahmen"
            input$rows={2}
            input$resizable={true}>
        </Textfield>
    </div>
</div>

<style>
    .threshold {
        display: flex;
        align-items: flex-end;
        gap: 8px;
    }

    .threshold-type {
        font-weight: bold;
        width: 200px;
    }

    .threshold-value {
        flex: 1;
    }

    .threshold-strategy {
        width: 200px;
    }

    .threshold-measures {
        flex: 2;
    }


</style>