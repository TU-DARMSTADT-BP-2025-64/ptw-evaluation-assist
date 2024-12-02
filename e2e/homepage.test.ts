import { expect, test } from '@playwright/test';

test('home page header title is Startseite', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('header .title')).toHaveText('Startseite');
});


test('clicking Neuen Befund starten navigates to /assistant', async ({ page }) => {
	await page.goto('/');
	await page.locator('.assistant-button').click();
	await expect(page.locator('header .title')).toHaveText('Assistent');
	await expect(page.url()).toContain('/assistant');
});

test('clicking Konfiguration opens login dialog', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('.login-dialog')).not.toBeVisible();
	await page.locator('.configuration-button').click();
	await expect(page.locator('.login-dialog')).toBeVisible();
});