<script lang="ts">
    import Textfield from '@smui/textfield';
    import Button from '@smui/button';
    import IconButton from '@smui/icon-button';
    import { Icon } from '@smui/common';
    import {v4 as uuidv4} from 'uuid';
	import type { ThresholdStrategyTreeViewModel } from '$lib/models/threshold-strategy.model';
	import type { ProductTreeViewModel } from '$lib/models/product.model';

    let {strategies = $bindable(), product}: {strategies : ThresholdStrategyTreeViewModel[], product: ProductTreeViewModel} = $props();

    function addStrategy() {
        strategies.push({
            id: uuidv4(),
            name: '',
            priority: strategies.length + 1,
            product: product
        });
    }

    function removeStrategy(index: number) {
        strategies.splice(index, 1);
    }

    function moveUp(index: number) {
        if (index === 0) return;

        const strategy = strategies[index];

        strategy.priority = strategy.priority - 1;

        strategies[index] = strategies[index - 1];
        strategies[index - 1] = strategy;

        strategies[index].priority = strategies[index].priority + 1;
    }

    function moveDown(index: number) {
        if (index === strategies.length - 1) return;

        const strategy = strategies[index];

        strategy.priority = strategy.priority + 1;
        
        strategies[index] = strategies[index + 1];
        strategies[index + 1] = strategy;

        strategies[index].priority = strategies[index].priority - 1;
    }


</script>

{#each strategies as strategy, index}
    <div style="display: flex; margin-top: 12px;">

        <IconButton class="material-icons" disabled={index === 0} onclick={() => moveUp(index)}>
            keyboard_arrow_up
        </IconButton>
        <IconButton class="material-icons" disabled={index === strategies.length - 1} onclick={() => moveDown(index)}>
            keyboard_arrow_down
        </IconButton>

        <Textfield style="width: 200px" label="Name" bind:value={strategies[index].name} />

        <IconButton class="material-icons" onclick={() => removeStrategy(index)}> 
            delete
        </IconButton>
    </div>
{/each}

<div style="display: flex; margin-top: 12px;">
    <Button onclick={addStrategy}> 
        <Icon class="material-icons">add</Icon>
        Strategie hinzufügen
    </Button>        
</div>




