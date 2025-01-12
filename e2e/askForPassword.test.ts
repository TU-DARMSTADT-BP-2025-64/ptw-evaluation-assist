import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Konfiguration Zugriff', () => {
	test('Benutzer wird nach Login und erneutem Zugriff auf Konfiguration nicht erneut nach Passwort gefragt', async ({ page }) => {
		// Gehe zur Startseite
		await page.goto('/');

		// Öffne den Login-Dialog
		await page.locator('.configuration-button').click();

		// Fülle das Passwort aus und logge dich ein
		await page.locator('input[type="password"]').fill(process.env.DEV_ADMIN_PASSWORD || '');
		await page.locator('button:has-text("Login")').click();

		// Überprüfe, ob zur Seite /configuration weitergeleitet wurde
		await expect(page).toHaveURL(/\/configuration$/, { timeout: 10000 });

		// Gehe zur Startseite
		await page.goto('/');

		// Öffne den Login-Dialog
		await page.locator('.configuration-button').click();

		// Überprüfe, ob zur Seite /configuration weitergeleitet wurde
		await expect(page).toHaveURL(/\/configuration$/, { timeout: 10000 });
	});

	test('Benutzer wird nach Passwort gefragt, wenn kein Cookie gesetzt ist', async ({ page }) => {
		// Gehe zur Startseite
		await page.goto('/');

		// Klicke auf den Konfiguration-Button
		await page.click('.configuration-button');

		// Überprüfe, dass der Login-Dialog angezeigt wird
		const loginDialog = page.locator('.login-dialog');
		await expect(loginDialog).toBeVisible();

		// Überprüfe, dass die URL nicht "/configuration" ist
		await expect(page).not.toHaveURL('/configuration');
	});
});
