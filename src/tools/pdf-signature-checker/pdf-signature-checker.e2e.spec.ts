import { expect, test } from '@playwright/test';

test.describe('Tool - Pdf signature checker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pdf-signature-checker');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'PDF signature checker', exact: true })).toBeVisible();
    await expect(page).toHaveTitle('TAMES - TOOLS');
  });
});
