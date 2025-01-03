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

	console.log('Nach Login URL:', page.url());

	// Cookies nach Login prüfen
	let cookies = await page.context().cookies();
	console.log('Cookies nach Login:', cookies);
	let sessionCookie = cookies.find(cookie => cookie.name === 'session');
	expect(sessionCookie).toBeDefined();

	// Logout-Button lokalisieren und klicken
	const logoutButton = page.locator('#logoutButton');
	await page.waitForTimeout(500);
	await expect(logoutButton).toBeVisible();
	console.log('Logout-Button gefunden.');

	await logoutButton.click();

	// Auf Weiterleitung zur Startseite warten
	await page.waitForURL('/', { timeout: 10000 });

	// Cookies nach Logout prüfen
	cookies = await page.context().cookies();
	console.log('Cookies nach Logout:', cookies);
	sessionCookie = cookies.find(cookie => cookie.name === 'session');
	expect(sessionCookie).toBeUndefined();
});
