import test, { expect } from '@playwright/test';

test('evaluation can be finished', async ({ page }) => {
	await page.goto('/assistant');
    await page.waitForTimeout(1000);
    await page.locator('#product-table-row-0').first().click();
    await page.waitForTimeout(1000);

	await page.locator('#start-evaluation-button').first().click();

	await page.locator('#wear-threshold-1').first().click();

	await expect(page.locator('#finish-evaluation-button')).toBeVisible();
});

test('PDF is being created and downloaded', async ({ page }) => {
	await page.goto('/assistant');
	await page.waitForTimeout(1000);
	await page.locator('#product-table-row-0').first().click();
	await page.waitForTimeout(1000);

	await page.locator('#start-evaluation-button').first().click();

	await page.locator('#wear-threshold-1').first().click();

	await page.locator('#finish-evaluation-button').first().click();

	const downloadEvent= page.waitForEvent('download');

	await page.locator('#pdf-creation').first().click();

	await downloadEvent;

	await expect(page.locator('#pdf-creation')).toBeVisible();
})
