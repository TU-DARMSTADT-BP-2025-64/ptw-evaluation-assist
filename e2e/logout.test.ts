import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test('Session-Cookie wird nach Logout entfernt', async ({ page }) => {
	// Login durchführen
	await page.goto('/');
	await page.locator('.configuration-button').click();
	await page.locator('input[type="password"]').fill(process.env.DEV_ADMIN_PASSWORD || '');
	await page.locator('button:has-text("Login")').click();
	await page.waitForURL(/\/configuration$/, { timeout: 10000 });

	// Cookies nach Login prüfen
	let cookies = await page.context().cookies();
	let sessionCookie = cookies.find(cookie => cookie.name === 'session');
	expect(sessionCookie).toBeDefined();

	// Logout-Button lokalisieren und klicken
	const logoutButton = page.locator('#logoutButton');
	await page.waitForTimeout(500);
	await expect(logoutButton).toBeVisible();

	await logoutButton.click();

	// Auf Weiterleitung zur Startseite warten
	await page.waitForURL('/', { timeout: 10000 });

	// Cookies nach Logout prüfen
	cookies = await page.context().cookies();
	sessionCookie = cookies.find(cookie => cookie.name === 'session');
	expect(sessionCookie).toBeUndefined();
});

test('Korrekte umleitung auf / nach Logout', async ({ page }) => {
	// Login durchführen
	await page.goto('/');
	const baseUrl = new URL(page.url()).origin;
	await page.locator('.configuration-button').click();
	await page.locator('input[type="password"]').fill(process.env.DEV_ADMIN_PASSWORD || '');
	await page.locator('button:has-text("Login")').click();

	// Auf Weiterleitung zu /configuration warten
	await page.waitForURL(/\/configuration$/, { timeout: 10000 });

	// Sicherstellen, dass die URL korrekt ist
	expect(page.url()).toMatch(/\/configuration$/);

	// Logout durchführen
	const logoutButton = page.locator('#logoutButton');
	await page.waitForTimeout(500);
	await expect(logoutButton).toBeVisible();
	await logoutButton.click();

	// Auf Weiterleitung zur Startseite warten
	await page.waitForURL(baseUrl, { timeout: 500 });

	// Sicherstellen, dass der Benutzer auf der Startseite ist
	expect(page.url()).toBe(baseUrl + '/');
});


test('Nach Logout /configuration nicht mehr aufrufbar', async ({ page }) => {
// Login durchführen
	await page.goto('/');
	const baseUrl = new URL(page.url()).origin;
	await page.locator('.configuration-button').click();
	await page.locator('input[type="password"]').fill(process.env.DEV_ADMIN_PASSWORD || '');
	await page.locator('button:has-text("Login")').click();

	// Auf Weiterleitung zu /configuration warten
	await page.waitForURL(/\/configuration$/, { timeout: 10000 });

	// Logout durchführen
	const logoutButton = page.locator('#logoutButton');
	await page.waitForTimeout(500);
	await expect(logoutButton).toBeVisible();
	await logoutButton.click();

	// Versuchen, /configuration aufzurufen
	await page.goto('/configuration', { waitUntil: 'load', timeout: 5000 }).catch(() => {});

	// Überprüfen, dass der Benutzer zur Startseite umgeleitet wird
	await expect(page).toHaveURL(baseUrl + '/');
});


