import { expect, test } from "@playwright/test";

test("the exported not-found page keeps branded recovery and direct contact paths", async ({
  page,
}) => {
  await page.goto("/404.html");

  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
  await expect(page.getByText("Justin Pan", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute(
    "href",
    "/",
  );

  await expect(page.getByRole("link", { name: "Email Justin" }).first()).toHaveAttribute(
    "href",
    "mailto:justin.pan688@gmail.com",
  );
  await expect(page.getByRole("link", { name: "GitHub profile" }).first()).toHaveAttribute(
    "href",
    "https://github.com/justinp04",
  );
  await expect(
    page.getByRole("link", { name: "LinkedIn profile" }).first(),
  ).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/justin-pan-055b0122b/",
  );
});
