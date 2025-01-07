import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Login Funktionalität', () => {
	test('Erfolgreicher Login navigiert zu /configuration', async ({ page }) => {
		// Gehe zur Startseite
		await page.goto('/');

		// Öffne den Login-Dialog
		await page.locator('.configuration-button').click();

		// Fülle das Passwort aus und logge dich ein
		await page.locator('input[type="password"]').fill(process.env.DEV_ADMIN_PASSWORD || '');
		await page.locator('button:has-text("Login")').click();

		// Überprüfe, ob zur Seite /configuration weitergeleitet wurde
		await expect(page).toHaveURL(/\/configuration$/, { timeout: 10000 });
	});

	test('Falsches Passwort zeigt Fehlermeldung an', async ({ page }) => {
		// Gehe zur Startseite
		await page.goto('/');

		// Öffne den Login-Dialog
		await page.locator('.configuration-button').click();

		// Fülle ein falsches Passwort aus und versuche, dich einzuloggen
		await page.locator('input[type="password"]').fill('wrongPassword');
		await page.locator('button:has-text("Login")').click();

		// Überprüfe, ob eine Fehlermeldung angezeigt wird
		const errorMessage = await page.locator('.mdc-text-field--invalid');
		await expect(errorMessage).toBeVisible();
	});

	test('Keine Passworteingabe zeigt Fehlermeldung an', async ({ page }) => {
		// Gehe zur Startseite
		await page.goto('/');

		// Öffne den Login-Dialog
		await page.locator('.configuration-button').click();

		// Fülle ein falsches Passwort aus und versuche, dich einzuloggen
		await page.locator('input[type="password"]').fill('');
		await page.locator('button:has-text("Login")').click();

		// Überprüfe, ob eine Fehlermeldung angezeigt wird
		const errorMessage = await page.locator('.mdc-text-field--invalid');
		await expect(errorMessage).toBeVisible();
	});

	test('Login-Dialog wird angezeigt, wenn die Konfiguration aufgerufen wird', async ({ page }) => {
		// Gehe zur Startseite
		await page.goto('/');

		// Öffne den Login-Dialog
		await page.locator('.configuration-button').click();

		// Überprüfe, ob der Login-Dialog sichtbar ist
		const loginDialog = await page.locator('.login-dialog');
		await expect(loginDialog).toBeVisible();
	});
});

test.describe('Login Cookie Test', () => {
	test('Beim Login wird ein sicherer Cookie gesetzt', async ({ page, context }) => {
		// Gehe zur Login-Seite oder öffne den Login-Dialog
		await page.goto('/');
		await page.locator('.configuration-button').click();

		// Logge dich ein
		await page.locator('input[type="password"]').fill(process.env.DEV_ADMIN_PASSWORD || '');
		await page.locator('button:has-text("Login")').click();

		// Überprüfe, ob die URL sich geändert hat
		await expect(page).toHaveURL(/\/configuration$/, { timeout: 10000 });

		// Hole alle Cookies
		const cookies = await context.cookies();

		// Finde das `session`-Cookie
		const sessionCookie = cookies.find((cookie) => cookie.name === 'session');

		// Überprüfe, ob das Cookie gesetzt wurde
		expect(sessionCookie).toBeDefined();

		// Überprüfe, ob das Cookie sicher ist
		expect(sessionCookie?.httpOnly).toBe(true); // HttpOnly ist gesetzt
		expect(sessionCookie?.secure).toBe(true); // Secure ist gesetzt
		expect(sessionCookie?.sameSite).toBe('Strict'); // SameSite=Strict ist gesetzt

		// Überprüfe die Lebensdauer des Cookies
		expect(sessionCookie?.expires).toBeGreaterThan(Date.now() / 1000); // Cookie hat ein Ablaufdatum in der Zukunft
	});

	test('Benutzer ohne Cookie wird zur Startseite umgeleitet', async ({ page }) => {
		// Versuche, direkt zu /configuration zu navigieren
		await page.goto('/configuration');

		// Überprüfe, ob der Benutzer auf die Startseite umgeleitet wurde
		await expect(page).toHaveURL('/');
	});

	test('Benutzer mit ungültigem Cookie wird zur Startseite umgeleitet', async ({
		page,
		context
	}) => {
		// Rufe die Basis-URL aus der aktuellen Seite ab
		await page.goto('/'); // Lade die Startseite, um die Basis-URL zu erhalten
		const baseUrl = new URL(page.url()).origin;

		// Setze ein ungültiges Cookie
		await context.addCookies([
			{
				name: 'session',
				value: 'randomInvalidValue',
				domain: new URL(baseUrl).hostname,
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'Strict'
			}
		]);

		// Versuche, direkt zu /configuration zu navigieren
		await page.goto('/configuration');

		// Überprüfe, ob der Benutzer auf die Startseite umgeleitet wurde
		await expect(page).toHaveURL('/');
	});
});
