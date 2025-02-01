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
        console.log('File selected', event)
        if (!event.target) return;

		const target = event.target as HTMLInputElement;

		if (target.files && target.files.length > 0) {
			const file = target.files[0];

            console.log('File', file);

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

        target.value = '';
	}

    function deleteImage(event: MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        selectedImage = undefined;
        wearThreshold.image = undefined;
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
            <div class="image-delete-button">
                <i class="material-icons " onclick={deleteImage} role="button" tabindex=0 onkeydown={() => {}}>delete</i>
            </div>
			<img src={selectedImage} alt="Bild" style="width: 120px; height: 80px; border-radius: 4px; object-fit: contain" />
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
		width: 120px;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgb(var(--mdc-theme-background-rgb));
		border-radius: 4px;
		cursor: pointer;
        position: relative;
        border: 1px solid rgb(var(--mdc-theme-background-rgb));
	}

	.threshold-image:hover {
		background-color: rgb(var(--mdc-theme-background-rgb) + 10);
	}

    .image-delete-button {
        position: absolute;
        display: none;
        top: 4px;
        right: 4px;
        z-index: 2;
        width: 24px;
        height: 24px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: var(--mdc-theme-surface)
    }

    .image-delete-button i {
        font-size: 16px;
        color: var(--mdc-theme-text-primary-on-background);
    }

    .threshold-image:hover .image-delete-button {
        display: flex;
    }
</style>
