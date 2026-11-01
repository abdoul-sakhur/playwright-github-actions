// spec: specs/pim-employes.md
// seed: seed.spec.ts

import { expect, test } from '@playwright/test';

test.describe('PIM - Employés', () => {
  test('Ajouter un employé', async ({ page }) => {
    const firstName = 'Copilot';
    const lastName = `Pim${Date.now()}`;
    const baseUrl = 'https://opensource-demo.orangehrmlive.com';

    await page.goto(`${baseUrl}/web/index.php/auth/login`);
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/web/index.php/dashboard/index');

    await page.goto(`${baseUrl}/web/index.php/pim/viewEmployeeList`);
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();

    await page.locator('input[name="firstName"]').fill(firstName);
    await page.locator('input[name="lastName"]').fill(lastName);
    await expect(page.locator('input[name="firstName"]')).toHaveValue(firstName);
    await expect(page.locator('input[name="lastName"]')).toHaveValue(lastName);

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Successfully Saved')).toBeVisible({ timeout: 15000 });
  });
});
