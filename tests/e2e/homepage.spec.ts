import { expect, test } from "@playwright/test";

test("publishes professional positioning, scoped proof, and homepage actions", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "I turn ambiguous ideas into useful, shipped products.",
  );

  const proof = page.getByRole("region", { name: "Delivery grounded in real outcomes." });
  await expect(proof.getByText("3 years")).toBeVisible();
  await expect(proof.getByText("≈67%")).toBeVisible();
  await expect(
    proof.getByText(
      "One Clew page improved from approximately 5.5 seconds to 1.8 seconds",
    ),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Explore project work" }),
  ).toHaveAttribute("href", "/projects/");
  await expect(page.getByRole("link", { name: "Contact Justin" })).toHaveAttribute(
    "href",
    "/#contact",
  );
});

test("renders reveal content without nonessential motion when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const reveal = page.locator(".reveal").first();
  await expect(reveal).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const motion = await reveal.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      opacity: style.opacity,
      transform: style.transform,
      transitionDuration: style.transitionDuration,
    };
  });

  expect(motion).toEqual({
    opacity: "1",
    transform: "none",
    transitionDuration: "0s",
  });
});
