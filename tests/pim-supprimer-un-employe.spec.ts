// spec: specs/pim-employes.md
// seed: seed.spec.ts

import { expect, test } from '@playwright/test';

async function loginAsAdmin(page: Parameters<typeof test>[0]['page']) {
  await page.goto('/web/index.php/auth/login');
  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/web/index.php/dashboard/index');
}

async function openEmployeeList(page: Parameters<typeof test>[0]['page']) {
  await page.goto('/web/index.php/pim/viewEmployeeList');
  await page.waitForURL('**/web/index.php/pim/viewEmployeeList');
  await expect(page.getByPlaceholder('Type for hints...').first()).toBeVisible({ timeout: 20000 });
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible({ timeout: 20000 });
}

async function createEmployee(page: Parameters<typeof test>[0]['page'], firstName: string, lastName: string) {
  await openEmployeeList(page);
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('heading', { name: 'Add Employee' })).toBeVisible({ timeout: 20000 });
  await page.locator('input[name="firstName"]').fill(firstName);
  await page.locator('input[name="lastName"]').fill(lastName);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Successfully Saved')).toBeVisible({ timeout: 20000 });
}

test.describe('PIM - Employés', () => {
  test('Supprimer un employé', async ({ page }) => {
    const firstName = 'Copilot';
    const lastName = `Delete${Date.now()}`;

    await loginAsAdmin(page);
    await createEmployee(page, firstName, lastName);

    await openEmployeeList(page);
    const employeeName = page.getByPlaceholder('Type for hints...').first();
    await employeeName.fill(`${firstName} ${lastName}`);
    await page.getByRole('button', { name: 'Search' }).click();

    const employeeRow = page.locator('.oxd-table-card, .oxd-table-row').filter({ hasText: firstName }).filter({ hasText: lastName });
    await expect(employeeRow.first()).toBeVisible({ timeout: 20000 });

    await employeeRow.first().locator('button').last().click();
    await expect(page.getByRole('dialog')).toContainText('Are you Sure?');
    await page.getByRole('button', { name: /Yes, Delete/ }).click();

    await expect(page.getByText('Successfully Deleted')).toBeVisible({ timeout: 20000 });

    await openEmployeeList(page);
    await employeeName.fill(`${firstName} ${lastName}`);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('No Records Found')).toBeVisible({ timeout: 20000 });
  });
});
