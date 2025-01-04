<script lang="ts">
	import Ripple from '@smui/ripple';

	export let onAddAssemblyGroup: () => void ;

	export let onAddAssemblyComponent: () => void = () => {};

	export let showAddAssemblyComponent: boolean = true;
</script>

<div class="assembly-group-structure-add-button">
	<div class="prefix-block">
		<div class="prefix-block-1">&nbsp;</div>
		<div class="prefix-block-2">&nbsp;</div>
	</div>
	<div class="text-container">
		<div
			class="assembly-group-text"
			use:Ripple={{ surface: true }}
			onclick={onAddAssemblyGroup}
			role="button"
			tabindex="0"
			onkeydown={() => {}}
		>
			<i class="material-icons">add</i>
			Baugruppe
		</div>
		{#if showAddAssemblyComponent}
			<div class="text-divider"></div>
			<div
				class="assembly-component-text"
				use:Ripple={{ surface: true }}
				onclick={onAddAssemblyComponent}
				role="button"
				tabindex="0"
				onkeydown={() => {}}
			>
				<i class="material-icons">add</i>
				Komponente
			</div>
		{/if}
	</div>
</div>

<style>
	.assembly-group-structure-add-button {
		display: flex;
		justify-content: start;
		align-items: stretch;
		width: 100%;
		/* height: 100%; */
	}

	.prefix-block {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 100%;
	}

	.prefix-block-1 {
		border-left: 2px dashed black;
		border-bottom: 2px dashed black;
		border-bottom-left-radius: 4px;
		width: 100%;
		height: 100%;
		margin-left: 2px;
        padding-top: 12px;
	}

	.prefix-block-2 {
		width: 100%;
		height: 100%;
	}

	.text-container {
		display: flex;
		white-space: nowrap;
		align-items: center;
		border: 2px dashed black;
		padding: 0 0.6rem;
		border-radius: 40px;
		cursor: pointer;
		color: var(--mdc-theme-primary);
        margin-top: 12px;
	}

	.assembly-group-text {
		height: 100%;
		display: flex;
		align-items: center;
		padding-right: 8px;
	}

	.assembly-component-text {
		height: 100%;
		display: flex;
		align-items: center;
		padding-left: 8px;
	}

	.text-divider {
		border-left: 2px dashed black;
		margin: 0 1px;
		height: 100%;
	}
    
    
</style>
