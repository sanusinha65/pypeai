import { test, expect } from "@playwright/test";
test("homepage has title and loads correctly", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/Pype AI/);
  await expect(
    page.locator("text=Build, Evaluate and Improve Prompts")
  ).toBeVisible();

  const iframe = page.locator("iframe");
  await expect(iframe).toBeVisible();
  await expect(
    page.locator(
      "text=Helping individuals and teams at the world's best companies"
    )
  ).toBeVisible();

  await expect(page.locator("text=Team Collaboration")).toBeVisible();
  await expect(page.locator("text=Effortless deployment")).toBeVisible();
  await expect(page.locator("text=Monitor deployed prompts")).toBeVisible();
  await expect(
    page.locator("text=Accelerated prompt development")
  ).toBeVisible();
  await expect(
    page.locator("text=Evaluate and Auto Optimize prompts")
  ).toBeVisible();
  await expect(page.locator("text=No expertise required")).toBeVisible();
  await expect(page.locator("text=Check Products")).toBeVisible();
});
