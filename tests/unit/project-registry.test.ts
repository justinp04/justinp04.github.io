import type { ComponentType } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/content/projects/chasecrm/body.mdx", () => ({
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
    const { name: _name, ...missingName } = chasecrmMetadata;

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

  it("returns a matching project and leaves unknown slugs unresolved", () => {
    expect(projects).toContainEqual(
      expect.objectContaining({ slug: "chasecrm", name: "ChaseCRM" }),
    );
    expect(getProjectBySlug("chasecrm")).toEqual(
      expect.objectContaining({ slug: "chasecrm", name: "ChaseCRM" }),
    );
    expect(getProjectBySlug("unknown-project")).toBeUndefined();
  });
});
