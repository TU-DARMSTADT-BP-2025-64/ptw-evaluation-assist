import test, { expect } from '@playwright/test';

test('assistant page shows start test products', async ({ page }) => {
    await page.goto('/assistant');
    
    await expect(await page.locator('.mdc-data-table__row').all()).toHaveLength(2);
});


test('open product selection after click on row', async ({ page }) => {
    await page.goto('/assistant');

    console.log(await page.locator('.start_assistant_0').first().innerText());

    await page.locator('.start_assistant_0').first().click();
    await page.waitForTimeout(1000);


    await expect(page.url()).toContain('/assistant/product-selection');
});