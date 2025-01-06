import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview-test',
		port: 4173
	},

	testDir: 'e2e'
});
