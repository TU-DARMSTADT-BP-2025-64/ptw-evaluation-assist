<script lang="ts">
	import { AssemblyGroupTreeViewModel } from '$lib/models/assembly-group.model';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	let image: File|null=null;
	let {
		open = $bindable(),
		onSave
	}: { open: boolean; onSave: (group: AssemblyGroupTreeViewModel) => void } = $props();

	let name = $state('');
	let invalidName = $state(false);

	function saveNewGroup() {
		if (!name || name.trim() === '') {
			invalidName = true;
			return;
		}

		const group = new AssemblyGroupTreeViewModel();
		group.name = name;
        onSave(group);
        name = '';
        open = false;
	}

	function cancel() {
        name = '';
		open = false;
	}
</script>

<Dialog bind:open>
	<Title><span data-testid="dialog-title">Neue Baugruppe</span></Title>
	<Content>
		<Textfield
			required
			invalid={invalidName}
			style="width: 100%;"
			bind:value={name}
			onkeydown={(e: { key: string; }) => e.key === 'Enter' && saveNewGroup()}
			label="Name"
		></Textfield>
	</Content>
	<div class="actions">
		<Button class="cancel-button" onclick={() => cancel()}>Abbrechen</Button>
		<Button onclick={() => saveNewGroup()}>Speichern</Button>
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