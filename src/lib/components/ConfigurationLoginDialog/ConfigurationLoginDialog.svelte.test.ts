
import {render, screen} from '@testing-library/svelte';
import { expect, test } from 'vitest';
import ConfigurationLoginDialog from './ConfigurationLoginDialog.svelte';

test('LoginDialog', () => {

    render(ConfigurationLoginDialog, {
        props: {
            open: true
        }
    });

    const title = screen.getByTestId('dialog-title');
    expect(title.textContent).toEqual('Login Konfiguration');
});