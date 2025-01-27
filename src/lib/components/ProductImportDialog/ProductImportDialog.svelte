<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button from '@smui/button';
	import { ProductImporter } from './ProductImporter';

	let { open = $bindable() } = $props();
	let selectedFile = $state('');
	let fileInput: HTMLInputElement | null = $state(null);

	function importProduct() {
		console.log('Importing products');
	}

	function closeDialog() {
		open = false;
	}

	function openFileSelect() {
		fileInput?.click();
	}

	function selectFile() {
		const file = fileInput?.files?.[0];

        if (!file || !file.name.endsWith('.xlsm')) {
            return;
        }
		console.log(file);

		const reader = new FileReader();

		reader.onload = function (e) {
            if (!e.target || !e.target.result) {
                console.error('No file content');
                return;
            }
			const data = new Uint8Array(e.target.result as ArrayBuffer);

			const importedProduct = ProductImporter.getProductTreeViewFromXlsx(data);
		};

        reader.readAsArrayBuffer(file);
	}
</script>

<Dialog bind:open class="dialog">
	<Title>Produkt importieren</Title>
	<Content>
		<Button onclick={openFileSelect}>Datei auswählen</Button>
		<input style="display: none" onchange={selectFile} type="file" bind:this={fileInput} />
	</Content>
	<Actions>
		<Button type="button" class="default-button" onclick={closeDialog}>Abbrechen</Button>
		<Button type="submit" onclick={importProduct}>Importieren</Button>
	</Actions>
</Dialog>
