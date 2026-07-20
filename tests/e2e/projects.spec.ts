import { expect, test } from "@playwright/test";

test("features ChaseCRM and MacroMunch on the homepage in order", async ({
  page,
}) => {
  await page.goto("/");

  const featuredProjects = page.getByRole("region", {
    name: "Featured projects",
  });
  await expect(featuredProjects.getByRole("heading", { level: 3 })).toHaveText([
    "ChaseCRM",
    "MacroMunch",
  ]);
  await expect(
    featuredProjects.getByRole("link", {
      name: "Read the ChaseCRM case study",
    }),
  ).toHaveAttribute("href", "/projects/chasecrm/");
  await expect(
    featuredProjects.getByRole("link", {
      name: "Read the MacroMunch case study",
    }),
  ).toHaveAttribute("href", "/projects/macromunch/");
});

test("publishes ChaseCRM and MacroMunch in the Project Index in order", async ({
  page,
}) => {
  await page.goto("/projects/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Project Index" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 3 })).toHaveText([
    "ChaseCRM",
    "MacroMunch",
  ]);
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

test("publishes the MacroMunch evidence journey without author prompts", async ({
  page,
}) => {
  await page.goto("/projects/macromunch/");

  await expect(
    page.getByRole("heading", { level: 1, name: "MacroMunch" }),
  ).toBeVisible();
  await expect(page).toHaveTitle(/MacroMunch/);
  await expect(
    page.getByText("Deployed prototype — now offline", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/no user adoption/)).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/Author prompt:/i);
  await expect(page.locator("body")).not.toContainText(/archived media/i);
});
