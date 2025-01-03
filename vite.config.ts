import { defineConfig } from 'vitest/config';
import {svelteTesting} from '@testing-library/svelte/vite'
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],
	ssr: {
		noExternal: [
			'@smui/textfield',
			'@smui/dialog',
			'@smui/snackbar',
			'@smui/list',
			'@smui/menu',
			'@smui/select'
		]
	},

	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		server: {
			deps: {
				inline: [/@smui/]
			}
		}

	}
});
