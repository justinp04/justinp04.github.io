import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectRecord } from "@/lib/projects/registry";

const chasecrmProject = {
  slug: "chasecrm",
  name: "ChaseCRM",
  description:
    "A real-estate CRM that centralizes incoming leads and guides and automates prioritized follow-up.",
  timeframe: "February 2026 — present",
  status: "Limited access",
  ownership: "Independently created and entirely owned as sole developer",
  featuredOrder: 1,
  tags: ["Product engineering", "Real estate", "CRM"],
  links: [],
  Body: () => null,
} satisfies ProjectRecord;

const seanDunnRealEstateProject = {
  slug: "sean-dunn-real-estate",
  name: "Sean Dunn Real Estate",
  description:
    "A live, conversion-focused client site using property-estimate, testimonial, and direct-contact paths to generate enquiries.",
  timeframe: "Live client engagement",
  status: "Live client site",
  ownership:
    "Sole ownership of discovery, requirements, design, implementation, deployment, maintenance, and SEO",
  featuredOrder: 3,
  tags: ["Client delivery", "Real estate", "SEO"],
  links: [
    {
      label: "Visit the live Sean Dunn Real Estate site",
      href: "https://www.seandunnrealestate.com/",
    },
  ],
  Body: () => null,
} satisfies ProjectRecord;

describe("ProjectCard", () => {
  it("uses a level-three heading by default beneath a section heading", () => {
    render(<ProjectCard emphasis="primary" project={chasecrmProject} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "ChaseCRM" }),
    ).toBeInTheDocument();
  });

  it("uses an explicit level-two heading in the Project Index", () => {
    render(<ProjectCard headingLevel={2} project={chasecrmProject} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "ChaseCRM" }),
    ).toBeInTheDocument();
  });

  it("presents ChaseCRM evidence and a descriptive case-study link", () => {
    render(<ProjectCard emphasis="primary" project={chasecrmProject} />);

    expect(screen.getByText("Limited access")).toBeInTheDocument();
    expect(
      screen.getByText("Independently created and entirely owned as sole developer"),
    ).toBeInTheDocument();

    for (const tag of ["Product engineering", "Real estate", "CRM"]) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }

    expect(
      screen.getByRole("link", { name: "Read the ChaseCRM case study" }),
    ).toHaveAttribute("href", "/projects/chasecrm/");
  });

  it("renders a safe external project link", () => {
    render(<ProjectCard project={seanDunnRealEstateProject} />);

    const liveSiteLink = screen.getByRole("link", {
      name: "Visit the live Sean Dunn Real Estate site",
    });

    expect(liveSiteLink).toHaveAttribute(
      "href",
      "https://www.seandunnrealestate.com/",
    );
    expect(liveSiteLink).toHaveAttribute("target", "_blank");
    expect(liveSiteLink.getAttribute("rel")?.split(/\s+/)).toEqual(
      expect.arrayContaining(["noopener", "noreferrer"]),
    );
  });
});
