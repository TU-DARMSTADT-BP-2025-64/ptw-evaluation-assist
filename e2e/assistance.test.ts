import test, { expect } from '@playwright/test';

test('assistant page shows start test products', async ({ page }) => {
    await page.goto('/assistant');
    
    await expect(await page.locator('.mdc-data-table__row').all()).toHaveLength(2);
});


test('open product evaluation after click on row', async ({ page }) => {
    await page.goto('/assistant');
    await page.waitForTimeout(1000);
    await page.locator('#product-table-row-0').first().click();
    await page.waitForTimeout(1000);


    await expect(page.url()).toContain('/assistant/evaluate/1');
});


