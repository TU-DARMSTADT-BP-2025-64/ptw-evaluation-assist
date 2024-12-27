import test, { expect } from '@playwright/test';

test('assistant page shows start test products', async ({ page }) => {
    await page.goto('/assistant');
    
    await expect(await page.locator('.mdc-data-table__row').all()).toHaveLength(2);
});