<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Snackbar, { Label, Actions as SnackbarActions } from '@smui/snackbar';
    import IconButton from '@smui/icon-button';

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

            snackbarSuccess.close();
            snackbarWarning.close();
            snackbarError.close();

			if (newPassword !== confirmPassword) {
				// Snackbar zurücksetzen und öffnen
				snackbarWarning.forceOpen();
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
					snackbarSuccess.forceOpen();
		
					// Dialog schließen nach erfolgreicher Änderung
					setTimeout(() => closeDialog(), 500);
				} else if (data.message.includes('Das aktuelle Passwort ist falsch')) {
					// Snackbar zurücksetzen und öffnen
            
                    snackbarError.forceOpen();
				} else {
					snackbarWarning.forceOpen();					
				}
			} catch (error) {
				console.error('Fehler beim Ändern des Passworts:', error);

				// Snackbar zurücksetzen und öffnen
				snackbarWarning.forceOpen();
			}
		}

</script>

<!-- SMUI Dialog -->
<Dialog bind:open={open} class="dialog">
    <Title>Passwort ändern</Title>
    <Content>
        <form on:submit|preventDefault={changePassword}>
            <div class="form-group">
                <label for="currentPassword">Aktuelles Passwort</label>
                <input
                  id="currentPassword"
                  type="password"
                  bind:value={currentPassword}
                  required
                />
            </div>

            <div class="form-group">
                <label for="newPassword">Neues Passwort</label>
                <input
                  id="newPassword"
                  type="password"
                  bind:value={newPassword}
                  required
                />
            </div>

            <div class="form-group">
                <label for="confirmPassword">Neues Passwort bestätigen</label>
                <input
                  id="confirmPassword"
                  type="password"
                  bind:value={confirmPassword}
                  required
                />
            </div>
        </form>
    </Content>
    <Actions>
        <button type="button" on:click={closeDialog}>Abbrechen</button>
        <button type="submit" on:click={changePassword}>Passwort ändern</button>
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
    .form-group {
        margin-left: 0;
        margin-right: 1rem;
    }

    label {
        display: block;
        margin-bottom: 8px;
    }

    input {
        width: 100%;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        padding: 8px 16px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 8px;
    }

    button:first-child {
        background: #ccc;
        color: black;
    }

    button:last-child {
        background: #007bff;
        color: white;
    }

    button:hover {
        opacity: 0.9;
    }
</style>
