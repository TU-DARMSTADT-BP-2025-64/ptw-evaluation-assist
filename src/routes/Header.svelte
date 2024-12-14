<script lang="ts">
	import logo from '$lib/images/ptw-logo.png';
	import logoDark from '$lib/images/ptw-logo_Dark.png';
	import IconButton from '@smui/icon-button';
	import { HeaderService } from './HeaderService.svelte';
	import { afterNavigate } from '$app/navigation';

	// Store to hold the current path
	let currentPath = $state('');
	let isDarkMode = $state(false);

	afterNavigate(() => {
		currentPath = window.location.pathname;
	});

	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		document.body.classList.toggle('dark', isDarkMode);
		
		// einstellungsbutton
		function toggleSettings() {
		alert("Einstellungen öffnen!"); 
	}}
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
</style>
