import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function expectRevealToSettle(reveal: Locator) {
  await reveal.scrollIntoViewIfNeeded();
  await expect(reveal).toHaveAttribute("data-visible", "true");
  await expect
    .poll(() =>
      reveal.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          opacity: style.opacity,
          transform: style.transform,
        };
      }),
    )
    .toEqual({ opacity: "1", transform: "none" });
}

test("homepage has no WCAG A or AA accessibility violations", async ({ page }) => {
  await page.goto("/");

  const reveals = page.locator(".reveal");
  for (let index = 0; index < (await reveals.count()); index += 1) {
    await expectRevealToSettle(reveals.nth(index));
  }

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});
