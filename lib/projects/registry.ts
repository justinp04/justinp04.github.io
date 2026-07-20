import type { ComponentType } from "react";

import { chasecrmMetadata } from "@/content/projects/chasecrm/metadata";
import { macromunchMetadata } from "@/content/projects/macromunch/metadata";
import {
  projectMetadataSchema,
  type ProjectMetadata,
} from "@/lib/projects/schema";
import ChaseCrmBody from "../../content/projects/chasecrm/body.mdx";
import MacroMunchBody from "../../content/projects/macromunch/body.mdx";

interface ProjectSource {
  metadata: unknown;
  Body: ComponentType;
}

export interface ProjectRecord extends ProjectMetadata {
  Body: ComponentType;
}

export function buildProjectRegistry(
  sources: readonly ProjectSource[],
): ProjectRecord[] {
  const seenSlugs = new Set<string>();

  return sources
    .map(({ metadata, Body }) => {
      const parsedMetadata = projectMetadataSchema.parse(metadata);

      if (seenSlugs.has(parsedMetadata.slug)) {
        throw new Error(`Duplicate project slug: ${parsedMetadata.slug}`);
      }

      seenSlugs.add(parsedMetadata.slug);
      return { ...parsedMetadata, Body };
    })
    .sort((left, right) => left.featuredOrder - right.featuredOrder);
}

export const projects = buildProjectRegistry([
  { metadata: chasecrmMetadata, Body: ChaseCrmBody },
  { metadata: macromunchMetadata, Body: MacroMunchBody },
]);

export const featuredProjects = projects;

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return projects.find((project) => project.slug === slug);
}
