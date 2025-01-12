<script lang="ts">
	import Dialog, { Title, Content } from '@smui/dialog';
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import { goto, invalidateAll } from '$app/navigation';

	let password = $state('');
	let invalidPassword = $state(false);
	let { open = $bindable() } = $props();

	async function login() {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: 'admin', password }),
		});

		if (response.ok) {
			open = false;
			await invalidateAll(); // Invalide alle Daten, um `page.data` zu aktualisieren
			goto('/configuration');
		} else {
			invalidPassword = true;
		}
	}

	function cancel() {
		open = false;
	}
</script>

<Dialog bind:open class="login-dialog">
	<Title>Login Konfiguration</Title>
	<Content>
		<Textfield
			required
			invalid={invalidPassword}
			style="width: 100%;"
			bind:value={password}
			onkeydown={(e) => e.key === 'Enter' && login()}
			type="password"
			label="Password"
		></Textfield>
	</Content>
	<div class="actions">
		<Button class="cancel-button" onclick={() => cancel()}>Abbrechen</Button>
		<Button onclick={() => login()}>Login</Button>
	</div>
</Dialog>

<style>
    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin: 8px 8px 8px 0;
    }

    :global(.color-unset) {
        color: var(--mdc-theme-on-surface) !important;
    }
</style>
