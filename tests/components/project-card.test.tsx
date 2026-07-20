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

describe("ProjectCard", () => {
  it("presents ChaseCRM evidence and a descriptive case-study link", () => {
    render(<ProjectCard emphasis="primary" project={chasecrmProject} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "ChaseCRM" }),
    ).toBeInTheDocument();
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
});
