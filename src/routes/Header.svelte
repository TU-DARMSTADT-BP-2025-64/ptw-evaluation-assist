<script lang="ts">
	import logo from '$lib/images/ptw-logo.png';
	import logoDark from '$lib/images/ptw-logo_Dark.png';
	import IconButton from '@smui/icon-button';
	import { HeaderService } from './HeaderService.svelte';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import SegmentedButton, { Segment } from '@smui/segmented-button';
  	import Button from '@smui/button';
  	import { Label } from '@smui/common';
	import { page } from '$app/stores'; // Zugriff auf globale Daten
	import PasswordChangeDialog from '$lib/components/PasswordChangeDialog/PasswordChangeDialog.svelte';

	let passwordChangeDialogOpen = $state(false);
	let isLoggedIn = $state(false);
	let currentPath = '';
	let isDarkMode = $state(false);
	let fontSize = $state('medium');
	let showSettings = $state(false);

	let fontSizeChoices = ['small', 'medium', 'large'];

	// Aktualisiere `isLoggedIn`, wenn `page.data.isLoggedIn` sich ändert
	$effect(() => {
		isLoggedIn = $page.data?.isLoggedIn || false;
	});

	afterNavigate(() => {
		currentPath = window.location.pathname;
	});

	$effect(() => {
		const lightStylesheet = document.getElementById('theme-stylesheet') as any;
		const darkStylesheet = document.getElementById('dark-theme-stylesheet') as any;

		if (isDarkMode) {
			lightStylesheet.media = 'not all';
			darkStylesheet.media = 'all';

			localStorage.setItem('theme', 'dark');
		} else {
			lightStylesheet.media = 'all';
			darkStylesheet.media = 'not all';
			localStorage.setItem('theme', 'light');
		}
		document.body.classList.toggle('dark', isDarkMode);
	});

	$effect(() => {
		console.log('Fontsize', fontSize);
		if (fontSize === 'small') {
			document.documentElement.style.fontSize = '12px';	
		} else if (fontSize === 'large') {
			document.documentElement.style.fontSize = '20px';	
		} else {
			document.documentElement.style.fontSize = 'unset';	
		}
	})

	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
	}
	// einstellungsbutton
	function toggleSettings() {
		showSettings = !showSettings;
	}
	//Schriftgröße ändern und speichern
	function changeFontSize(size: string) {
		fontSize = size;
		document.body.classList.remove('small', 'medium', 'large');
		document.body.classList.add(size);
		saveFontSize(size);
	}
	//Schriftgröße laden
	function loadFontSize() {
		const savedFontSize = localStorage.getItem('fontSize');
		if (savedFontSize) {
			fontSize = savedFontSize;
			document.body.classList.add(savedFontSize);
		}
	}
	//Schriftgröße speichern
	function saveFontSize(size: string) {
		localStorage.setItem('fontSize', size);
	}
	onMount(() => {
		loadFontSize();
	});

	// Schriftgröße beim Mounten laden
	onMount(() => {
		loadFontSize();
	});

	function openPasswordChangeDialog() {
		passwordChangeDialogOpen = true;
	}

	async function logout() {
		try {
			const response = await fetch('/api/logout', {
				method: 'POST'
			});
			if (response.ok) {
				window.location.href = '/'; // Weiterleitung zur Startseite
			} else {
				console.error('Logout fehlgeschlagen:', await response.text());
			}
		} catch (err) {
			console.error('Fehler beim Logout:', err);
		}
	}
</script>

<header>
	<a href="/">
		<div class="logo">
			<img src={isDarkMode ? logoDark : logo} alt="PTW Logo" />
		</div>
	</a>

	<div class="triangle"></div>
	<div class="toolbar">
		<div class="title">
			<p class="title-text">
				{HeaderService.Instance.getTitle()}
			</p>
		</div>
		<div class="actions">
			<IconButton class="material-icons" onclick={() => toggleDarkMode()}>dark_mode</IconButton>
			<IconButton id="settingsButton" class="material-icons" onclick={() => toggleSettings()}>settings</IconButton>
			{#if $page.data.isLoggedIn}
				<IconButton id="logoutButton" class="material-icons" onclick={logout}>logout</IconButton>
			{/if}
		</div>
	</div>
</header>
{#if showSettings}
	<div
		id="settingsMenuBackground"
		class="settings-menu-background"
		role="button"
		onkeypress={() => {}}
		tabindex="0"
		onclick={() => toggleSettings()}>
	</div>
	<div class="settings-menu mdc-elevation--z4">
		<h2>Einstellungen</h2>
		<p style="margin-bottom: -2px" class="settings-section">Schriftgröße</p>

		<SegmentedButton segments={fontSizeChoices} singleSelect bind:selected={fontSize}>
			{#snippet segment(segment)}
			  <Segment {segment} id={segment + 'FontSizeButton'}>
				<Label>{segment}</Label>
			  </Segment>
			{/snippet}
		  </SegmentedButton>

		

		<!-- Passwort ändern -->
		<p class="settings-section">Benutzer</p>
		<Button variant="raised" id="PasswordChange" onclick={() => openPasswordChangeDialog()}>Passwort ändern</Button>
	</div>
{/if}

<!-- Passwort ändern Dialog -->
{#if passwordChangeDialogOpen}
	<PasswordChangeDialog
		bind:open={passwordChangeDialogOpen}/>
{/if}

<style>
	header {
		display: flex;
		height: 80px;
		align-items: center;
	}

	.logo {
		height: 64px;
		margin-left: 1rem;
	}
	.logo img {
		height: 100%;
	}

	.triangle {
		margin-left: -16px;
		width: 0;
		height: 0;
		border-left: 24px solid transparent;
		border-right: 0 solid var(--mdc-theme-primary);
		border-bottom: 80px solid var(--mdc-theme-primary);
	}

	.toolbar {
		height: 80px;
		width: 100%;
		background-color: var(--mdc-theme-primary);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 32px;
	}

	.toolbar .actions {
		color: var(--mdc-theme-on-primary);
		display: flex;
		gap: 24px;
	}

	.toolbar .title {
		padding-left: 8px;
		color: var(--mdc-theme-on-primary);
		font-size: 1.5rem;
		font-weight: 600;
		display: flex;
		align-items: center;
	}
	/*Schriftgrößenkontrollen*/

	.settings-menu-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
	.settings-menu {
		position: absolute;
		display: block;
		top: 50px;
		right: 20px;
		background: var(--mdc-theme-surface);
		padding: 16px;
		border-radius: 8px;
		z-index: 3;
	}

	.settings-menu h2 {
		margin: 0;
	}

	.settings-section {
		font-weight: bold;
		margin-top: 16px;
		margin-bottom: 12px;
	}

</style>
