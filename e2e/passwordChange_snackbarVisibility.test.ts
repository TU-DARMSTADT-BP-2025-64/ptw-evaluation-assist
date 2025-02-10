import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Password Change Dialog Snackbar Test', () => {
	test('Warning Snackbar wird bei wiederholtem triggern angezeigt', async ({ page }) => {
		await page.goto('/');

		// Öffne die Einstellungen
		await page.click('#settingsButton');
		await expect(page.locator('.settings-menu')).toBeVisible();

		// Öffne den Dialog
		await page.click('#PasswordChange');
		await expect(page.locator('.dialog')).toBeVisible();

		// Fülle die Passwortfelder aus
		await page.fill('#currentPassword', process.env.DEV_ADMIN_PASSWORD || '');
		await page.fill('#newPassword', 'password123');
		await page.fill('#confirmPassword', '123password');

		// Klicke auf "Passwort ändern", um die Snackbar zu triggern
		await page.click('#passwordChangeButton');

		// Warte auf die Snackbar
		const snackbar = page.locator('.snackbar-warning .mdc-snackbar__surface');

		// Warte, bis die Snackbar im DOM ist
		await snackbar.waitFor({ state: 'attached', timeout: 30000 });

		// Überprüfe den Text der Snackbar
		const snackbarText = await snackbar.textContent();
		expect(snackbarText).toContain('Das neue Passwort und die Bestätigung stimmen nicht überein.');

		// Schließe den Dialog durch Klick auf "Abbrechen"
		await page.click('#closePasswordChangeDialogButton');

		await expect(page.locator('.settings-menu')).toBeVisible();

		// Öffne den Dialog erneut
		await page.click('#PasswordChange');
		await expect(page.locator('.dialog')).toBeVisible();

		// Fülle die Passwortfelder erneut aus
		await page.fill('#currentPassword', process.env.DEV_ADMIN_PASSWORD || '');
		await page.fill('#newPassword', 'password123');
		await page.fill('#confirmPassword', '123password');

		// Klicke auf "Passwort ändern", um die Snackbar erneut zu triggern
		await page.click('#passwordChangeButton');

		// Warte ernaut auf die Snackbar
		const snackbar2 = page.locator('.snackbar-warning .mdc-snackbar__surface');

		// Warte erneut, bis die Snackbar im DOM ist
		await snackbar2.waitFor({ state: 'attached', timeout: 30000 });

		// Überprüfe erneut den Text der Snackbar
		const snackbarText2 = await snackbar.textContent();
		expect(snackbarText2).toContain('Das neue Passwort und die Bestätigung stimmen nicht überein.');
	});

	test('Error Snackbar wird bei wiederholtem triggern angezeigt', async ({ page }) => {
		await page.goto('/');

		// Öffne die Einstellungen
		await page.click('#settingsButton');
		await expect(page.locator('.settings-menu')).toBeVisible();

		// Öffne den Dialog
		await page.click('#PasswordChange');
		await expect(page.locator('.dialog')).toBeVisible();

		// Fülle die Passwortfelder aus
		await page.fill('#currentPassword', 'wrongPassword');
		await page.fill('#newPassword', 'password123');
		await page.fill('#confirmPassword', 'password123');

		// Klicke auf "Passwort ändern", um die Snackbar zu triggern
		await page.click('#passwordChangeButton');

		// Warte auf die Snackbar
		const snackbar = page.locator('.snackbar-error .mdc-snackbar__surface');

		// Warte, bis die Snackbar im DOM ist
		await snackbar.waitFor({ state: 'attached', timeout: 30000 });

		// Überprüfe den Text der Snackbar
		const snackbarText = await snackbar.textContent();
		expect(snackbarText).toContain('Das aktuelle Passwort ist falsch!');

		// Schließe den Dialog durch Klick auf "Abbrechen"
		await page.click('#closePasswordChangeDialogButton');

		await expect(page.locator('.settings-menu')).toBeVisible();

		// Öffne den Dialog erneut
		await page.click('#PasswordChange');
		await expect(page.locator('.dialog')).toBeVisible();

		// Fülle die Passwortfelder erneut aus
		await page.fill('#currentPassword', process.env.DEV_ADMIN_PASSWORD || '');
		await page.fill('#newPassword', 'password123');
		await page.fill('#confirmPassword', '123password');

		// Klicke auf "Passwort ändern", um die Snackbar erneut zu triggern
		await page.click('#passwordChangeButton');

		// Warte ernaut auf die Snackbar
		const snackbar2 = page.locator('.snackbar-error .mdc-snackbar__surface');

		// Warte erneut, bis die Snackbar im DOM ist
		await snackbar2.waitFor({ state: 'attached', timeout: 30000 });

		// Überprüfe erneut den Text der Snackbar
		const snackbarText2 = await snackbar.textContent();
		expect(snackbarText2).toContain('Das aktuelle Passwort ist falsch!');
	});

	test('Success Snackbar wird bei wiederholtem triggern angezeigt', async ({ page }) => {
		await page.goto('/');

		// Öffne die Einstellungen
		await page.click('#settingsButton');
		await expect(page.locator('.settings-menu')).toBeVisible();

		// Öffne den Dialog
		await page.click('#PasswordChange');
		await expect(page.locator('.dialog')).toBeVisible();

		// Fülle die Passwortfelder aus
		await page.fill('#currentPassword', process.env.DEV_ADMIN_PASSWORD || '');
		await page.fill('#currentPassword', process.env.DEV_TEST_ADMIN_PASSWORD || '');
		await page.fill('#currentPassword', process.env.DEV_TEST_ADMIN_PASSWORD || '');

		// Klicke auf "Passwort ändern", um die Snackbar zu triggern
		await page.click('#passwordChangeButton');

		// Warte auf die Snackbar
		const snackbar = page.locator('.snackbar-success .mdc-snackbar__surface');

		// Warte, bis die Snackbar im DOM ist
		await snackbar.waitFor({ state: 'attached', timeout: 30000 });

		// Überprüfe den Text der Snackbar
		const snackbarText = await snackbar.textContent();
		expect(snackbarText).toContain('Passwort erfolgreich geändert!');

		// Schließe den Dialog durch Klick auf "Abbrechen"
		await page.click('#closePasswordChangeDialogButton');

		await expect(page.locator('.settings-menu')).toBeVisible();

		// Öffne den Dialog erneut
		await page.click('#PasswordChange');
		await expect(page.locator('.dialog')).toBeVisible();

		// Fülle die Passwortfelder erneut aus
		await page.fill('#currentPassword', process.env.DEV_TEST_ADMIN_PASSWORD || '');
		await page.fill('#currentPassword', process.env.DEV_ADMIN_PASSWORD || '');
		await page.fill('#currentPassword', process.env.DEV_ADMIN_PASSWORD || '');

		// Klicke auf "Passwort ändern", um die Snackbar erneut zu triggern
		await page.click('#passwordChangeButton');

		// Warte ernaut auf die Snackbar
		const snackbar2 = page.locator('.snackbar-success .mdc-snackbar__surface');

		// Warte erneut, bis die Snackbar im DOM ist
		await snackbar2.waitFor({ state: 'attached', timeout: 30000 });

		// Überprüfe erneut den Text der Snackbar
		const snackbarText2 = await snackbar.textContent();
		expect(snackbarText2).toContain('Passwort erfolgreich geändert!');
	});
});
