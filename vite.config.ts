import { defineConfig } from 'vitest/config';
import {svelteTesting} from '@testing-library/svelte/vite'
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],
	
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		server: {
			deps: {
				inline: [/@smui/]
			}
		},
		dangerouslyIgnoreUnhandledErrors: true
	}
});
