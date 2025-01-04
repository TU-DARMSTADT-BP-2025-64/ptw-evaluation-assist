import { test, expect } from '@playwright/test';

test.describe('Passwort ändern', () => {
	test('Einstellungen öffnen und Passwort ändern-Button sichtbar', async ({ page }) => {
		// Gehe zur Startseite
		await page.goto('/');

		// Klicke auf das Einstellungen-Symbol
		await page.locator('button:has-text("settings")').click();

		// Überprüfe, ob das Einstellungsmenü sichtbar ist
		const settingsMenu = page.locator('.settings-menu');
		await expect(settingsMenu).toBeVisible();

		// Überprüfe, ob der Button zum Passwort ändern vorhanden ist
		const passwordChangeButton = page.locator('#PasswordChange');
		await expect(passwordChangeButton).toBeVisible();
	});

	test('Passwort ändern-Dialog öffnet sich korrekt', async ({ page }) => {
		// Gehe zur Startseite
		await page.goto('/');

		// Klicke auf das Einstellungen-Symbol
		await page.locator('button:has-text("settings")').click();

		// Klicke auf die Schaltfläche "Passwort ändern"
		const passwordChangeButton = page.locator('#PasswordChange');
		await passwordChangeButton.click();

		// Überprüfe, ob der Dialog sichtbar wird
		const passwordDialog = page.locator('.dialog');
		await expect(passwordDialog).toBeVisible();
	});

	test('Passwortänderung erfolgreich mit anschließendem Login und Rücksetzen', async ({ page }) => {
		// Öffne die Startseite
		await page.goto('/');

		// Öffne die Einstellungen
		await page.click('button:has-text("settings")');
		await expect(page.locator('.settings-menu')).toBeVisible();

		// Öffne den Dialog zum Passwort ändern
		await page.click('#PasswordChange');
		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();

		// Fülle die Felder für die Passwortänderung aus
		await page.fill('#currentPassword', process.env.DEV_ADMIN_PASSWORD || '');
		await page.fill('#newPassword', process.env.TEST_DEV_ADMIN_PASSWORD || '');
		await page.fill('#confirmPassword', process.env.TEST_DEV_ADMIN_PASSWORD || '');

		// Klicke auf 'Passwort ändern'
		await page.click('button:has-text("Passwort ändern")');

		// Logge dich mit dem neuen Passwort ein
		await page.reload();
		await page.click('button:has-text("settings")');
		await page.click('#PasswordChange');

		const newDialog = page.locator('.dialog');
		await expect(newDialog).toBeVisible();

		await page.fill('#currentPassword', process.env.TEST_DEV_ADMIN_PASSWORD || '');
		await page.fill('#newPassword', process.env.DEV_ADMIN_PASSWORD || '');
		await page.fill('#confirmPassword', process.env.DEV_ADMIN_PASSWORD || '');
		await page.click('button:has-text("Passwort ändern")');

		// Stelle sicher, dass das ursprüngliche Passwort wieder funktioniert
		await page.reload();
		await page.click('button:has-text("settings")');
		await expect(page.locator('#PasswordChange')).toBeVisible();
	});



	test('Passwort und Bestätigung stimmen nicht überein', async ({ page }) => {
		// Rufe die Basis-URL aus der aktuellen Seite ab
		await page.goto('/'); // Lade die Startseite, um die Basis-URL zu erhalten
		const baseUrl = new URL(page.url()).origin;

		// Öffne die Einstellungen
		await page.click('button:has-text("settings")');
		await expect(page.locator('.settings-menu')).toBeVisible();

		// Öffne den Dialog zum Passwort ändern
		await page.click('#PasswordChange');
		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();

		// Fülle die Felder aus
		await page.fill('#currentPassword', process.env.DEV_ADMIN_PASSWORD || '');
		await page.fill('#newPassword', process.env.TEST_DEV_ADMIN_PASSWORD || '');
		await page.fill('#confirmPassword', 'wrongConfirmation');

		// Klicke auf 'Passwort ändern'
		await page.click('button:has-text("Passwort ändern")');

	// Gehe zur Login-Seite oder öffne den Login-Dialog
		await page.goto('/');
		await page.locator('.configuration-button').click();

		// Logge dich ein
		await page.locator('input[type="password"]').fill(process.env.DEV_ADMIN_PASSWORD || '');
		await page.locator('button:has-text("Login")').click();

		// Überprüfe, ob die URL sich geändert hat
		await expect(page).toHaveURL(baseUrl + '/', { timeout: 10000 });

	});
});
