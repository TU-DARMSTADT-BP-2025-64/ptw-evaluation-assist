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

    // Funktion zum Schließen des Dialogs
    function closeDialog() {
        open = false;
        dispatch('close');
    }

    // Funktion zum Ändern des Passworts
    function changePassword() {
        if (newPassword !== confirmPassword) {
            snackbarWarning.open();
            return;
        }

        console.log('Passwort ändern:', { currentPassword, newPassword });

        // Erfolgssnackbar öffnen
        snackbarSuccess.open();

        // Dialog schließen nach erfolgreicher Änderung
        closeDialog();
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
