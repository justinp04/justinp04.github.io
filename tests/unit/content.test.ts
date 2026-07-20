import { describe, expect, it } from "vitest";

import {
  education,
  experienceEntries,
  hero,
  navigation,
  profiles,
  proofPoints,
} from "@/content/site";

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

describe("approved experience and education content", () => {
  it("publishes the complete employer, role, and date chronology", () => {
    expect(experienceEntries.map(({ employer, role, start, end }) => ({
      employer,
      role,
      start,
      end,
    }))).toEqual([
      {
        employer: "Clew, formerly CGR",
        role: "Full-Stack Software Engineer",
        start: "5 March 2025",
        end: "present",
      },
      {
        employer: "AngloGold Ashanti",
        role: "Software Engineer Intern",
        start: "April",
        end: "December 2024",
      },
      {
        employer: "Curtin University with KK Women's and Children's Hospital",
        role: "Software Engineering Intern",
        start: "January",
        end: "February 2024",
      },
      {
        employer: "Jason Windows",
        role: "Software Engineering Intern",
        start: "October",
        end: "December 2023",
      },
    ]);
  });

  it("publishes the approved education", () => {
    expect(education).toEqual({
      degree: "Bachelor of Computing",
      major: "Software Engineering",
      institution: "Curtin University",
      completed: "2024",
    });
  });

  it("preserves proof-of-concept and internal-production boundaries", () => {
    const proofOfConceptEmployers = experienceEntries
      .filter(({ outcomes }) => outcomes.some((outcome) => /proof of concept/i.test(outcome)))
      .map(({ employer }) => employer);
    const internalProductionEmployers = experienceEntries
      .filter(({ outcomes }) => outcomes.some((outcome) => /internal production/i.test(outcome)))
      .map(({ employer }) => employer);

    expect(proofOfConceptEmployers).toEqual([
      "Curtin University with KK Women's and Children's Hospital",
      "Jason Windows",
    ]);
    expect(internalProductionEmployers).toEqual(["AngloGold Ashanti"]);
  });
});
