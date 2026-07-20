import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";

async function resolvedTokenColor(page: Page, token: string) {
  return page.evaluate((tokenName) => {
    const probe = document.createElement("span");
    probe.style.color = `var(${tokenName})`;
    document.body.append(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  }, token);
}

async function expectPrimaryAnchorColors(
  page: Page,
  locator: Locator,
  label: string,
) {
  const [actual, primary, primaryForeground] = await Promise.all([
    locator.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        backgroundColor: style.backgroundColor,
        color: style.color,
      };
    }),
    resolvedTokenColor(page, "--primary"),
    resolvedTokenColor(page, "--primary-foreground"),
  ]);

  expect.soft(actual.backgroundColor, `${label} background`).toBe(primary);
  expect.soft(actual.color, `${label} foreground`).toBe(primaryForeground);
}

async function expectHomepageRevealsToSettle(page: Page) {
  const reveals = page.locator(".reveal");

  for (let index = 0; index < (await reveals.count()); index += 1) {
    const reveal = reveals.nth(index);
    await reveal.scrollIntoViewIfNeeded();
    await expect(reveal).toHaveAttribute("data-visible", "true");
    await expect
      .poll(() =>
        reveal.evaluate((element) => {
          const style = getComputedStyle(element);
          return { opacity: style.opacity, transform: style.transform };
        }),
      )
      .toEqual({ opacity: "1", transform: "none" });
  }
}

async function expectNoColorContrastViolations(
  page: Page,
  label: string,
  include?: string,
) {
  const builder = new AxeBuilder({ page }).withRules(["color-contrast"]);
  const results = await (include ? builder.include(include) : builder).analyze();

  expect.soft(results.violations, `${label} color contrast`).toEqual([]);
}

async function expectNoNonessentialMotion(locator: Locator, label: string) {
  const motion = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      animationDuration: style.animationDuration,
      animationName: style.animationName,
      transitionDuration: style.transitionDuration,
    };
  });

  expect.soft(motion.animationName, `${label} animation name`).toBe("none");
  expect.soft(motion.animationDuration, `${label} animation duration`).toBe("0s");
  expect.soft(motion.transitionDuration, `${label} transition duration`).toBe("0s");
}

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

test("primary anchor surfaces retain an AA dark foreground through the generated CSS cascade", async ({
  page,
}) => {
  await page.goto("/");

  const main = page.getByRole("main");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await skipLink.focus();
  await expect(skipLink).toBeFocused();

  await expectPrimaryAnchorColors(
    page,
    main.getByRole("link", { name: "Email Justin" }),
    "primary contact email",
  );
  await expectPrimaryAnchorColors(
    page,
    page.getByRole("banner").getByRole("link", { name: "Résumé" }),
    "desktop résumé",
  );
  await expectPrimaryAnchorColors(page, skipLink, "focused skip link");
  await expectHomepageRevealsToSettle(page);
  await expectNoColorContrastViolations(page, "desktop homepage");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();

  const dialog = page.getByRole("dialog", { name: "Navigation" });
  await expectPrimaryAnchorColors(
    page,
    dialog.getByRole("link", { name: "Résumé" }),
    "mobile résumé",
  );
  await expectNoColorContrastViolations(
    page,
    "mobile homepage navigation",
    '[role="dialog"]',
  );

  await page.goto("/404.html");
  await expectPrimaryAnchorColors(
    page,
    page.getByRole("link", { name: "Return home" }),
    "not-found return home",
  );
  await expectNoColorContrastViolations(page, "not-found page");
});

test("mobile navigation removes Sheet motion when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();

  await expectNoNonessentialMotion(
    page.getByRole("dialog", { name: "Navigation" }),
    "Sheet content",
  );
  await expectNoNonessentialMotion(
    page.locator('[data-slot="sheet-overlay"]'),
    "Sheet overlay",
  );
});

test("the focused skip link becomes visible without motion when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await skipLink.focus();

  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await expect
    .poll(async () => (await skipLink.boundingBox())?.y)
    .toBeGreaterThanOrEqual(0);
  await expectNoNonessentialMotion(skipLink, "focused skip link");
});
