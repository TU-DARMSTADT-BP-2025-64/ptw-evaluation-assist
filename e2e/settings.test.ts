import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test('Schriftgroeße in Einstellungen ändern, ändert Schriftgroeße auf HTML Element ', async ({
	page
}) => {
	// Gehe zur Startseite
	await page.goto('/');

	await page.locator('#settingsButton').click();

	await page.locator('#smallFontSizeButton').click();

	await expect(page.locator('html').first()).toHaveAttribute('style', 'font-size: 12px;');
});
