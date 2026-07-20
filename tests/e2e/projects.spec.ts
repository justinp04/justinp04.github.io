import { expect, test } from "@playwright/test";

test("features ChaseCRM on the homepage", async ({ page }) => {
  await page.goto("/");

  const featuredProjects = page.getByRole("region", {
    name: "Featured projects",
  });
  await expect(
    featuredProjects.getByRole("heading", { level: 3, name: "ChaseCRM" }),
  ).toBeVisible();
  await expect(
    featuredProjects.getByRole("link", {
      name: "Read the ChaseCRM case study",
    }),
  ).toHaveAttribute("href", "/projects/chasecrm/");
});

test("publishes ChaseCRM in the Project Index", async ({ page }) => {
  await page.goto("/projects/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Project Index" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 3, name: "ChaseCRM" }),
  ).toBeVisible();
});

test("publishes the ChaseCRM case study without author prompts", async ({
  page,
}) => {
  await page.goto("/projects/chasecrm/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    page.getByRole("heading", { level: 1, name: "ChaseCRM" }),
  ).toBeVisible();

  for (const section of ["Context", "What it does", "Ownership", "Current evidence"]) {
    await expect(page.getByRole("heading", { level: 2, name: section })).toBeVisible();
  }

  await expect(page).toHaveTitle(/ChaseCRM/);
  await expect(page.locator("body")).not.toContainText(/Author prompt:/i);
  await expect(page.locator("body")).not.toContainText(
    /screenshots with all pilot data removed/i,
  );

  const placeholder = page.locator("[data-project-media-placeholder]");
  await expect(placeholder).toHaveAttribute("aria-hidden", "true");
  await expect(placeholder.getByText("Product media coming later")).toBeVisible();
  await expect(placeholder.locator("img")).toHaveCount(0);
});
