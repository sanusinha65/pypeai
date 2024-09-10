import { test, expect } from "@playwright/test";
test("productpage has title and loads correctly", async ({ page }) => {
  await page.goto("http://localhost:3000/products");
  await expect(page).toHaveTitle("Products | Pype AI");
  await expect(page.locator("text=Our Products")).toBeVisible();
});
