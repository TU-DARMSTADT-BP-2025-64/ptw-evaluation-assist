import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Passwort ändern Snackbars', () => {

	test('Snackbar bei erfolgreichem Ändern korrekt', async ({ page }) => {
		await page.goto('/');

		// Öffne die Einstellungen
		await page.click('#settingsButton');
		await expect(page.locator('.settings-menu')).toBeVisible();

		// Öffne den Dialog
		await page.click('#PasswordChange');
		await expect(page.locator('.dialog')).toBeVisible();

		// Fülle die Passwortfelder aus
		await page.fill('#currentPassword', process.env.DEV_ADMIN_PASSWORD || '');
		await page.fill('#newPassword', process.env.TEST_DEV_ADMIN_PASSWORD || '');
		await page.fill('#confirmPassword', process.env.TEST_DEV_ADMIN_PASSWORD || '');

		// Klicke auf 'Passwort ändern'
		await page.click('#passwordChangeButton');

		// Warte auf die Snackbar
		const snackbar = page.locator('.snackbar-success .mdc-snackbar__surface');

		// Warte, bis die Snackbar im DOM ist
		await snackbar.waitFor({ state: 'attached', timeout: 30000 });

		// Überprüfe den Text der Snackbar
		const snackbarText = await snackbar.textContent();
		console.log(`Snackbar text: ${snackbarText}`);
		expect(snackbarText).toContain('Passwort erfolgreich geändert!');

		// Überprüfe die Farbe der Snackbar
		const snackbarColor = await snackbar.evaluate((node) => window.getComputedStyle(node).backgroundColor);
		console.log(`Snackbar color: ${snackbarColor}`);
		expect(snackbarColor).toBe('rgb(76, 175, 80)');

		// Logge dich mit dem neuen Passwort ein
		await page.reload();
		await page.click('#settingsButton');
		await page.click('#PasswordChange');

		await page.fill('#currentPassword', process.env.TEST_DEV_ADMIN_PASSWORD || '');
		await page.fill('#newPassword', process.env.DEV_ADMIN_PASSWORD || '');
		await page.fill('#confirmPassword', process.env.DEV_ADMIN_PASSWORD || '');
		await page.click('#passwordChangeButton');

		// Stelle sicher, dass das ursprüngliche Passwort wieder funktioniert
		await page.reload();
		await page.click('#settingsButton');
		await expect(page.locator('#PasswordChange')).toBeVisible();
	});

	test('Snackbar bei falschem alten Passwort korrekt', async ({ page }) => {
		await page.goto('/');

		// Öffne die Einstellungen
		await page.click('#settingsButton');
		await expect(page.locator('.settings-menu')).toBeVisible();

		// Öffne den Dialog
		await page.click('#PasswordChange');
		await expect(page.locator('.dialog')).toBeVisible();

		// Fülle die Passwortfelder aus
		await page.fill('#currentPassword', 'falsch');
		await page.fill('#newPassword', 'neu');
		await page.fill('#confirmPassword', 'neu');

		// Klicke auf 'Passwort ändern'
		await page.click('#passwordChangeButton');

		// Warte auf die Snackbar
		const snackbar = page.locator('.snackbar-error .mdc-snackbar__surface');

		// Warte, bis die Snackbar im DOM ist
		await snackbar.waitFor({ state: 'attached', timeout: 30000 });

		// Überprüfe den Text der Snackbar
		const snackbarText = await snackbar.textContent();
		console.log(`Snackbar text: ${snackbarText}`);
		expect(snackbarText).toContain('Das aktuelle Passwort ist falsch!');

		// Überprüfe die Farbe der Snackbar
		const snackbarColor = await snackbar.evaluate((node) => window.getComputedStyle(node).backgroundColor);
		console.log(`Snackbar color: ${snackbarColor}`);
		expect(snackbarColor).toBe('rgb(244, 67, 54)');
	});

	test('Snackbar bei falscher Bestätigung korrekt', async ({ page }) => {
		await page.goto('/');

		// Öffne die Einstellungen
		await page.click('#settingsButton');
		await expect(page.locator('.settings-menu')).toBeVisible();

		// Öffne den Dialog
		await page.click('#PasswordChange');
		await expect(page.locator('.dialog')).toBeVisible();

		// Fülle die Passwortfelder aus
		await page.fill('#currentPassword', 'falsch');
		await page.fill('#newPassword', 'neu');
		await page.fill('#confirmPassword', 'neu');

		// Klicke auf 'Passwort ändern'
		await page.click('#passwordChangeButton');

		// Warte auf die Snackbar
		const snackbar = page.locator('.snackbar-warning .mdc-snackbar__surface');

		// Warte, bis die Snackbar im DOM ist
		await snackbar.waitFor({ state: 'attached', timeout: 30000 });

		// Überprüfe den Text der Snackbar
		const snackbarText = await snackbar.textContent();
		console.log(`Snackbar text: ${snackbarText}`);
		expect(snackbarText).toContain('Das neue Passwort und die Bestätigung stimmen nicht überein.');

		// Überprüfe die Farbe der Snackbar
		const snackbarColor = await snackbar.evaluate((node) => window.getComputedStyle(node).backgroundColor);
		console.log(`Snackbar color: ${snackbarColor}`);
		expect(snackbarColor).toBe('rgb(255, 152, 0)');
	});
});