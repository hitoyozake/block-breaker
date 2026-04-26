import { test, expect } from '@playwright/test';

test('ゲームが起動してスコア表示がある', async ({ page }) => {
  await page.goto('/');
  const canvas = page.locator('canvas#gameCanvas');
  await expect(canvas).toBeVisible();
});
