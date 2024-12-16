<script lang="ts">
     import { createEventDispatcher } from 'svelte';

    export let open: boolean;
    let currentPassword = '';
    let newPassword = '';
    let confirmPassword = '';
const dispatch = createEventDispatcher();

    // Funktion zum Schließen des Dialogs
    function closeDialog() {
        open = false;
        dispatch('close');
    }

    // Funktion zum Ändern des Passworts
    function changePassword() {
        if (newPassword !== confirmPassword) {
            alert('Das neue Passwort und die Bestätigung stimmen nicht überein.');
            return;
        }

        console.log('Passwort ändern:', { currentPassword, newPassword });

        // Dialog schließen nach erfolgreicher Änderung
        closeDialog();
    }
</script>

{#if open}
    <div class="dialog-backdrop">
        <div class="dialog">
            <h2>Passwort ändern</h2>

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

            <div class="button-group">
                <button type="button" on:click={closeDialog}>Abbrechen</button>
                <button type="submit">Passwort ändern</button>
            </div>
        </form>
    </div>
</div>
{/if}

<style>
.dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.dialog {
    background: white;
    border-radius: 8px;
    border: 2px solid rgba(255, 0, 0, 0.748);
    padding: 24px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    margin-top: 0;
}

.form-group {
    margin-bottom: 16px;
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

.button-group {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

button {
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button[type="button"] {
    background: #ccc;
    color: black;
}

button[type="submit"] {
    background: red;
    color: white;
}

button:hover {
    opacity: 0.9;
}

</style>