import test, { expect } from '@playwright/test';

test('evaluation can be finished', async ({ page }) => {
	await page.goto('/assistant');
    await page.waitForTimeout(1000);
    await page.locator('#product-table-row-0').first().click();
    await page.waitForTimeout(1000);

	await page.locator('#start-evaluation-button').first().click();

	await page.locator('#wear-threshold-1').first().click();

	await expect(page.locator('#finish-evaluation-button')).toBeVisible();

	// CHeck if  for download event
	
});
