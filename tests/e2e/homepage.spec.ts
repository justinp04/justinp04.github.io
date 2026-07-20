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

test("renders the complete experience, education, and homepage anchor narrative", async ({
  page,
}) => {
  await page.goto("/");

  const experience = page.getByRole("region", {
    name: "Professional engineering, from internships to product delivery.",
  });
  for (const employer of [
    "Clew, formerly CGR",
    "AngloGold Ashanti",
    "Curtin University with KK Women's and Children's Hospital",
    "Jason Windows",
  ]) {
    await expect(experience.getByRole("heading", { level: 3, name: employer })).toBeVisible();
  }

  const about = page.getByRole("region", { name: "Product-minded from idea to delivery." });
  await expect(about.getByRole("heading", { name: "Bachelor of Computing" })).toBeVisible();
  await expect(about.getByText("Major in Software Engineering")).toBeVisible();
  await expect(about.getByText("Curtin University · Completed 2024")).toBeVisible();

  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  for (const anchor of ["Experience", "About", "Contact"]) {
    await navigation.getByRole("link", { name: anchor, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${anchor.toLowerCase()}$`));
    await expect(page.locator(`#${anchor.toLowerCase()}`)).toBeInViewport();
  }
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
