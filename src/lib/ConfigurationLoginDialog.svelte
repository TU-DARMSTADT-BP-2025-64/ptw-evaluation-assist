<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import { goto } from '$app/navigation';

	let password = $state('');
    let invalidPassword = $state(false);
	let { open = $bindable() } = $props();

    $effect(() => {
        if (open) {
            password = '';
        }
    });

    function cancel() {
        open = false;
    }

    function login() {
        if (password === 'admin') {
            open = false;
            goto('/configuration');
        } else {
            invalidPassword = true;
        }
    }
</script>

<Dialog bind:open class="login-dialog">
	<Title>Login Konfiguration</Title>
	<Content>
		<Textfield required invalid={invalidPassword} style="width: 100%;" bind:value={password} type="password" label="Password"></Textfield>
	</Content>
	<div class="actions">
		<Button class="color-unset" onclick={() =>cancel()}>Cancel</Button>
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
