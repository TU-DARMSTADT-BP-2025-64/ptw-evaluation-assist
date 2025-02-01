<script lang="ts">
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import {
		WearThresholdTypeTranslation,
		type WearThresholdTreeViewModel
	} from '$lib/models/wear-threshold.model';
	import { ThresholdStrategyTreeViewModel } from '$lib/models/threshold-strategy.model';
	import imageCompression from 'browser-image-compression';
	import Snackbar, { Label, Actions as SnackbarActions } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';

	let {
		wearThreshold = $bindable(),
		strategies
	}: { wearThreshold: WearThresholdTreeViewModel; strategies: ThresholdStrategyTreeViewModel[] } =
		$props();

	let imageInput: HTMLInputElement | null = $state(null);
	let selectedImage: string | undefined = $state(wearThreshold.image);

	let snackbarError: Snackbar | null = $state(null);
	let errorMessage: string | null = $state(null);

	async function fileSelected(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			const file = target.files[0];

			const options = {
				maxWidthOrHeight: 256,
				useWebWorker: true
			};
			try {
				const compressedFile = await imageCompression(file, options);
				// convert to base64
				selectedImage = (await blobToBase64(compressedFile)) as string;
                wearThreshold.image = selectedImage;
				console.log('Selected image', selectedImage.length);
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'The file given is not an image') {
						snackbarError?.forceOpen();
						errorMessage = 'Die hochgeladene Datei ist kein Bild!';
					}
				}
			}
		}
	}

	function blobToBase64(blob: Blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
		});
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
				<Option value={strat.name}>{strat.name}</Option>
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

	<div
		class="threshold-image"
		onclick={() => imageInput?.click()}
		role="button"
		tabindex="0"
		onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && imageInput?.click()}>
		{#if selectedImage}
			<img src={selectedImage} alt="Bild" style="width: 80px; height: 80px; border-radius: 4px" />
		{:else}
			<i class="material-icons">photo_camera</i>
		{/if}
	</div>

	<input type="file" style="display: none" bind:this={imageInput} onchange={fileSelected} />
</div>

<Snackbar bind:this={snackbarError} class="snackbar-error">
	<Label>Die hochgeladenen Datei ist kein Bild!</Label>
	<SnackbarActions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</SnackbarActions>
</Snackbar>

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

	.threshold-image {
		width: 80px;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f5f5f5;
		border-radius: 4px;
		border: 1px solid #e0e0e0;
		cursor: pointer;
	}

	.threshold-image:hover {
		background-color: #e0e0e0;
	}
</style>
