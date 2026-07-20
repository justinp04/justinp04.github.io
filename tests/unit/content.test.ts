import { describe, expect, it } from "vitest";

import { hero, navigation, profiles, proofPoints } from "@/content/site";

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectStrings);
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }

  return [];
}

describe("professional homepage content", () => {
  it("publishes the approved role, location, and actions", () => {
    const [role, location] = hero.eyebrow.split(" · ");

    expect(role).toBe("Full-Stack Software Engineer");
    expect(location).toBe("Perth, Western Australia");
    expect(hero.primaryAction.href).toBe("/projects/");
    expect(hero.secondaryAction.href).toBe("/#contact");
  });

  it("keeps the professional-duration and performance proof accurately scoped", () => {
    const professionalDuration = proofPoints.find(
      ({ label }) => label === "Professional engineering across full-time and internship roles",
    );
    const performance = proofPoints.find(({ label }) => label.includes("5.5 seconds"));

    expect(professionalDuration?.value).toBe("3 years");
    expect(performance).toMatchObject({ value: "≈67%" });
    expect(performance?.label).toContain("5.5 seconds");
    expect(performance?.label).toContain("1.8 seconds");
  });

  it("excludes prohibited positioning and unsupported success claims", () => {
    const publicContent = collectStrings({ hero, navigation, profiles, proofPoints }).join(
      " ",
    );

    expect(publicContent).not.toMatch(/Aspiring/i);
    expect(publicContent).not.toMatch(/Facebook/i);
    expect(publicContent).not.toMatch(/general availability/i);
    expect(publicContent).not.toMatch(/user adoption/i);
  });
});
