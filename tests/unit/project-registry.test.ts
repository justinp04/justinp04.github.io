import type { ComponentType } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/content/projects/chasecrm/body.mdx", () => ({
  default: () => null,
}));

vi.mock("@/content/projects/macromunch/body.mdx", () => ({
  default: () => null,
}));

vi.mock("@/content/projects/sean-dunn-real-estate/body.mdx", () => ({
  default: () => null,
}));

import {
  buildProjectRegistry,
  getProjectBySlug,
  projects,
} from "@/lib/projects/registry";
import type { ProjectMetadata } from "@/lib/projects/schema";

const Body: ComponentType = () => null;

const chasecrmMetadata = {
  slug: "chasecrm",
  name: "ChaseCRM",
  description: "A real-estate CRM for prioritized follow-up.",
  timeframe: "February 2026 — present",
  status: "Limited access",
  ownership: "Independently created and entirely owned as sole developer",
  featuredOrder: 1,
  tags: ["Product engineering", "Real estate", "CRM"],
  links: [],
} satisfies ProjectMetadata;

describe("project registry", () => {
  it("accepts and exposes one valid ChaseCRM source", () => {
    const registry = buildProjectRegistry([{ metadata: chasecrmMetadata, Body }]);

    expect(registry).toHaveLength(1);
    expect(registry[0]).toMatchObject(chasecrmMetadata);
    expect(registry[0]?.Body).toBe(Body);
  });

  it("rejects a source missing its name", () => {
    const missingName: Partial<ProjectMetadata> = { ...chasecrmMetadata };
    delete missingName.name;

    expect(() =>
      buildProjectRegistry([{ metadata: missingName, Body }]),
    ).toThrow();
  });

  it("rejects duplicate slugs", () => {
    expect(() =>
      buildProjectRegistry([
        { metadata: chasecrmMetadata, Body },
        { metadata: chasecrmMetadata, Body },
      ]),
    ).toThrow("Duplicate project slug: chasecrm");
  });

  it.each([
    "javascript:alert('unsafe')",
    "data:text/html,<script>alert('unsafe')</script>",
    "file:///tmp/private-project.html",
  ])("rejects a non-HTTPS project link: %s", (href) => {
    expect(() =>
      buildProjectRegistry([
        {
          metadata: {
            ...chasecrmMetadata,
            links: [{ label: "Unsafe project link", href }],
          },
          Body,
        },
      ]),
    ).toThrow("Project link href must use HTTPS");
  });

  it("accepts an HTTPS project link", () => {
    const href = "https://example.com/project";

    const registry = buildProjectRegistry([
      {
        metadata: {
          ...chasecrmMetadata,
          links: [{ label: "Visit project", href }],
        },
        Body,
      },
    ]);

    expect(registry[0]?.links).toEqual([{ label: "Visit project", href }]);
  });

  it("sorts lower featured orders first without mutating its input", () => {
    const sources = [
      {
        metadata: { ...chasecrmMetadata, slug: "second", featuredOrder: 2 },
        Body,
      },
      { metadata: chasecrmMetadata, Body },
    ];

    const registry = buildProjectRegistry(sources);

    expect(registry.map(({ slug }) => slug)).toEqual(["chasecrm", "second"]);
    expect(sources.map(({ metadata }) => metadata.slug)).toEqual([
      "second",
      "chasecrm",
    ]);
  });

  it("publishes the known projects in featured order", () => {
    expect(projects.map(({ slug }) => slug)).toEqual([
      "chasecrm",
      "macromunch",
      "sean-dunn-real-estate",
    ]);
    expect(getProjectBySlug("chasecrm")).toEqual(
      expect.objectContaining({ slug: "chasecrm", name: "ChaseCRM" }),
    );
    expect(getProjectBySlug("macromunch")).toEqual(
      expect.objectContaining({ slug: "macromunch", name: "MacroMunch" }),
    );
    expect(getProjectBySlug("sean-dunn-real-estate")).toEqual(
      expect.objectContaining({
        slug: "sean-dunn-real-estate",
        name: "Sean Dunn Real Estate",
        status: "Live client site",
        ownership:
          "Sole ownership of discovery, requirements, design, implementation, deployment, maintenance, and SEO",
        featuredOrder: 3,
        links: [
          {
            label: "Visit the live Sean Dunn Real Estate site",
            href: "https://www.seandunnrealestate.com/",
          },
        ],
      }),
    );
    expect(getProjectBySlug("unknown-project")).toBeUndefined();
  });
});
