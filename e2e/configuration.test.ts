import test, { expect, Page } from '@playwright/test';

test('Show all products on configuration page', async ({ page }) => {
    await loginForConfiguration(page);
    await expect(await page.locator('.mdc-data-table__row').all()).toHaveLength(2);
});

test('Clicking add product button opens product form', async ({ page }) => {
    await loginForConfiguration(page);
    await page.locator('#add-product-button').click();
    await expect(page.locator('.product-form')).toBeVisible();
});


async function loginForConfiguration(page: Page) {
	await page.goto('/');
	await page.locator('.configuration-button').click();

	// Logge dich ein
	await page.locator('input[type="password"]').fill(process.env.DEV_ADMIN_PASSWORD || '');
	await page.locator('button:has-text("Login")').click();

	// Überprüfe, ob die URL sich geändert hat
	await expect(page).toHaveURL(/\/configuration$/, { timeout: 10000 });
}


