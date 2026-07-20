import { expect, test } from "@playwright/test";

test("the exported contact shell works across desktop, mobile, and not-found routes", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          Reflect.set(window, "__copiedEmail", value);
        },
      },
    });
  });

  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Justin Pan" })).toBeVisible();

  const header = page.getByRole("banner");
  await expect(header.getByRole("link", { name: "Email Justin" })).toHaveAttribute(
    "href",
    "mailto:justin.pan688@gmail.com",
  );
  for (const name of ["GitHub profile", "LinkedIn profile"]) {
    const profileLink = header.getByRole("link", { name });
    await expect(profileLink).toHaveAttribute("target", "_blank");
    await expect(profileLink).toHaveAttribute("rel", "noreferrer noopener");
  }

  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied");
  await expect
    .poll(() => page.evaluate(() => Reflect.get(window, "__copiedEmail")))
    .toBe("justin.pan688@gmail.com");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();

  const dialog = page.getByRole("dialog", { name: "Navigation" });
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 10; index += 1) {
    await page.keyboard.press("Tab");
    await expect
      .poll(() => dialog.evaluate((element) => element.contains(document.activeElement)))
      .toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  await page.getByRole("button", { name: "Open navigation" }).click();
  await dialog.getByRole("link", { name: "Contact" }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#contact$/);

  await page.goto("/404.html");
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
  await expect(page.getByText("This page is not part of the portfolio")).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute(
    "href",
    "/",
  );
});
