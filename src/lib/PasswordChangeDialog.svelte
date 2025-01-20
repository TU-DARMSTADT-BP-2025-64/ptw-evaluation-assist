<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Snackbar, { Label, Actions as SnackbarActions } from '@smui/snackbar';
    import IconButton from '@smui/icon-button';
    import Button from '@smui/button';
    import Textfield from '@smui/textfield';

    export let open: boolean;
    let currentPassword = '';
    let newPassword = '';
    let confirmPassword = '';
    const dispatch = createEventDispatcher();

    let snackbarSuccess: Snackbar;
    let snackbarWarning: Snackbar;
    let snackbarError: Snackbar;

    // Funktion zum Schließen des Dialogs
    function closeDialog() {
			snackbarSuccess.close();
			snackbarWarning.close();
      snackbarError.close();
			open = false;
			dispatch('close');
    }

    // Funktion zum Ändern des Passworts
		async function changePassword() {
			if (newPassword !== confirmPassword) {
				// Snackbar zurücksetzen und öffnen
				snackbarWarning.close();
				setTimeout(() => snackbarWarning.open(), 10);
				return;
			}

			try {
				const response = await fetch('/api/change-password', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						currentPassword,
						newPassword,
					}),
				});

				const data = await response.json();

				if (response.ok) {
					// Snackbar zurücksetzen und öffnen
					snackbarSuccess.close();
					setTimeout(() => snackbarSuccess.open(), 10);

					// Dialog schließen nach erfolgreicher Änderung
					setTimeout(() => closeDialog(), 500);
				} else if (data.message.includes('Das aktuelle Passwort ist falsch')) {
					// Snackbar zurücksetzen und öffnen
            snackbarError.close();
					setTimeout(() => snackbarError.open(), 10);
				} else {
					// Snackbar zurücksetzen und öffnen
					snackbarWarning.close();
					setTimeout(() => snackbarWarning.open(), 10);
				}
			} catch (error) {
				console.error('Fehler beim Ändern des Passworts:', error);

				// Snackbar zurücksetzen und öffnen
				snackbarWarning.close();
				setTimeout(() => snackbarWarning.open(), 10);
			}
		}

</script>

<!-- SMUI Dialog -->
<Dialog bind:open={open} class="dialog">
    <Title>Passwort ändern</Title>
    <Content>
        <form class="form-group" on:submit|preventDefault={changePassword}>
            <Textfield 
                bind:value={currentPassword}
                variant="filled"
                type="password"
                label="Aktuelles Passwort"
            />
            <Textfield 
                bind:value={newPassword}
                variant="filled"
                type="password"
                label="Neues Passwort"
            />
            <Textfield 
                bind:value={confirmPassword}
                variant="filled"
                type="password"
                label="Passwort bestätigen"
            />
        </form>
    </Content>
    <Actions>
        <Button class="default-button" onclick={closeDialog}>Abbrechen</Button>
        <Button onclick={changePassword}>Passwort ändern</Button>
    </Actions>
</Dialog>

<!-- Success Snackbar -->
<Snackbar bind:this={snackbarSuccess} class="snackbar-success">
    <Label>Passwort erfolgreich geändert!</Label>
    <SnackbarActions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </SnackbarActions>
</Snackbar>

<!-- Warning Snackbar -->
<Snackbar bind:this={snackbarWarning} class="snackbar-warning">
    <Label>Das neue Passwort und die Bestätigung stimmen nicht überein.</Label>
    <SnackbarActions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </SnackbarActions>
</Snackbar>

<!-- Invalid Old Password Snackbar -->
<Snackbar bind:this={snackbarError} class="snackbar-error">
    <Label>Das aktuelle Passwort ist falsch!</Label>
    <SnackbarActions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </SnackbarActions>
</Snackbar>

<style>

    :global(.form-group .mdc-text-field) {
        margin-bottom: 1.2rem;
    }

</style>
