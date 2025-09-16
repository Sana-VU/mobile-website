import { test, expect } from "@playwright/test";

test("homepage has title and navigation", async ({ page }) => {
  await page.goto("/");

  // Title
  await expect(page).toHaveTitle(/WhatMobile/);

  // Navigation
  await expect(page.getByText("Home")).toBeVisible();
  await expect(page.getByText("Brands")).toBeVisible();
  await expect(page.getByText("Compare")).toBeVisible();
  await expect(page.getByText("Search")).toBeVisible();
});
