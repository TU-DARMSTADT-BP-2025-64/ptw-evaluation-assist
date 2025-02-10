<script lang="ts">
	import Ripple from '@smui/ripple';
	import { HeaderService } from './HeaderService.svelte';
	import ConfigurationLoginDialog from '$lib/components/ConfigurationLoginDialog/ConfigurationLoginDialog.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let configurationLoginDialogOpen = false;

	HeaderService.Instance.setTitle('Startseite');

	// Öffne die Konfiguration oder zeige den Login-Dialog
	function openConfiguration() {
		page.subscribe(($page) => {
			if ($page.data?.isLoggedIn) {
				goto('/configuration'); // Benutzer ist eingeloggt, weiterleiten
			} else {
				configurationLoginDialogOpen = true; // Login-Dialog öffnen
			}
		})();
	}
</script>

<svelte:head>
	<title>Homepage</title>
	<meta name="description" content="PTW evaluation assist" />
</svelte:head>

<section style="max-width: 60%; width: 100%;">
	<a href="/assistant">
		<div class="assistant-button card-btn mdc-elevation--z2" use:Ripple={{ surface: true }}>
			<div class="icon">
				<i class="material-icons">manage_search</i>
			</div>
			<div class="label">Neuen Befund starten</div>
		</div>
	</a>

	<div
		class="configuration-button card-btn mdc-elevation--z2"
		use:Ripple={{ surface: true }}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && openConfiguration()}
		onclick={openConfiguration}
	>
		<div class="icon">
			<i class="material-icons">settings</i>
		</div>
		<div class="label">Konfiguration</div>
	</div>

	<ConfigurationLoginDialog bind:open={configurationLoginDialogOpen}></ConfigurationLoginDialog>
</section>

<style>
    section {
        padding-top: 24px;
    }

    .card-btn {
        display: flex;
        border-radius: 8px;
        background: var(--mdc-theme-surface);
        padding: 12px;
        align-items: center;
        cursor: pointer;
        margin: 32px 0;
    }

    .card-btn .icon i {
        font-size: 60px;
        height: 60px;
        width: 60px;
        color: #b81018;
    }

    .card-btn .label {
        font-size: 2rem;
        margin-left: 28px;
    }
</style>
