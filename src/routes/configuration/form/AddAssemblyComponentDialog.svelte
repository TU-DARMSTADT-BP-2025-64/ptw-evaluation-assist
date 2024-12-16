<script lang="ts">
	import Dialog, { Title, Content } from '@smui/dialog';
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import { AssemblyComponentTreeViewModel, PredefinedComponentCategory } from '$lib/models/assembly-component.model';
    import Select, { Option } from '@smui/select';

	let {
		open = $bindable(),
		onSave
	}: { open: boolean; onSave: (group: AssemblyComponentTreeViewModel) => void } = $props();

	let name = $state('');
    let componentCategory = $state(PredefinedComponentCategory.Elektronisches_Bauteile);
	let invalidName = $state(false);


    let predefinedCategories = Object.keys(PredefinedComponentCategory);

	function saveNewComponent() {
		if (!name || name.trim() === '') {
			invalidName = true;
			return;
		}

		const component = new AssemblyComponentTreeViewModel();
		component.name = name;
		onSave(component);
		name = '';
		open = false;
	}

	function cancel() {
		name = '';
		open = false;
	}
</script>

<Dialog bind:open>
	<Title><span data-testid="dialog-title">Neue Komponente</span></Title>
	<Content>
		<Textfield
			required
			invalid={invalidName}
			style="width: 100%;"
			bind:value={name}
			onkeydown={(e) => e.key === 'Enter' && saveNewComponent()}
			label="Name"
		></Textfield>


        
		<Select style="margin-top: 18px" bind:value={componentCategory} label="Kategorie_Maschinenelement">
			<Option/>
			{#each predefinedCategories as category}
				<Option value={category}>{category}</Option>
			{/each}
		</Select>
	</Content>
	<div class="actions">
		<Button class="cancel-button" onclick={() => cancel()}>Abbrechen</Button>
		<Button onclick={() => saveNewComponent()}>Speichern</Button>
	</div>
</Dialog>

<style>
	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		margin: 8px 8px 8px 0;
	}
</style>
