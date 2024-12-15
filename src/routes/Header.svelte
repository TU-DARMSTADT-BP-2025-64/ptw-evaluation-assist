<script lang="ts">
	import logo from '$lib/images/ptw-logo.png';
	import logoDark from '$lib/images/ptw-logo_Dark.png';
	import IconButton from '@smui/icon-button';
	import { HeaderService } from './HeaderService.svelte';
	import { afterNavigate } from '$app/navigation';
	import{onMount} from 'svelte';
	import Ripple from '@smui/ripple';

	import PasswordChangeDialog from '$lib/PasswordChangeDialog.svelte';

    let passwordChangeDialogOpen = false;

	let currentPath = '';
	let isDarkMode = false;
	let fontSize = 'medium';
	let showSettings = false;
	
	
	afterNavigate(() => {
		currentPath = window.location.pathname;
	});

	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		document.body.classList.toggle('dark', isDarkMode);
	}
		// einstellungsbutton
		function toggleSettings() {
		showSettings=!showSettings;
		console.log('Settings toggled', showSettings);
	}
//Schriftgröße ändern und speichern
	function changeFontSize(size: string){
		fontSize=size;
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
		console.log('Schriftgröße geladen:', fontSize);
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
			<IconButton
				style={currentPath === '/' ? 'display: none' : 'display: inline'}
				class="material-icons"
				onclick={() => window.history.back()}>arrow_back</IconButton
			>
			<p>
				{HeaderService.Instance.getTitle()}
			</p>
		</div>
		<div class="actions">
			<IconButton class="material-icons" onclick={() => toggleDarkMode()}>dark_mode</IconButton>
			<IconButton class="material-icons">language</IconButton>
			<IconButton 
		class="material-icons" 
		onclick={() => toggleSettings()}
	>settings</IconButton>
	</div>
	</div>

</header>


{#if showSettings}
	<div class="settings-menu {fontSize}">
		<h2>Einstellungen</h2>
		<p>Schriftgröße:</p>
		
	<div class="font-size-buttons">
		<button onclick={() => changeFontSize('small')}>Klein</button>
		<button onclick={() => changeFontSize('medium')}>Mittel</button>
		<button onclick={() => changeFontSize('large')}>Groß</button>
	</div>

<!-- Passwort ändern -->
<p>Passwort:</p>
<button onclick={() => openPasswordChangeDialog()}>Passwort ändern</button>
</div>
{/if}

<!-- Passwort ändern Dialog -->
{#if passwordChangeDialogOpen}
<PasswordChangeDialog
bind:open={passwordChangeDialogOpen}
on:close={() => (passwordChangeDialogOpen = false)}

/>
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
		border-right: 0px solid var(--mdc-theme-primary);
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
	.settings-menu {
		position: absolute;
		display:block;
		top: 50px;
		right: 20px;
		background: white;
		padding: 16px;
		border: 2px solid red;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		z-index: 10;

	}

	/* Schriftgrößenklassen */
	.font-size-buttons button {
		margin-right: 8px;
		padding: 8px 12px;
		font-size: 1rem;
		cursor: pointer;
	}
	.password-change-button {
        margin-top: 16px;
    }

    .password-change-button button {
        padding: 8px 12px;
        font-size: 1rem;
        cursor: pointer;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
    }

    .password-change-button button:hover {
        opacity: 0.9;
    }

</style>
