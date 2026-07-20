import { z } from "zod";

export const projectMetadataSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  description: z.string().min(1),
  timeframe: z.string().min(1),
  status: z.string().min(1),
  ownership: z.string().min(1),
  featuredOrder: z.number().int().positive(),
  tags: z.array(z.string().min(1)).min(1),
  links: z
    .array(z.object({ label: z.string().min(1), href: z.string().url() }))
    .default([]),
});

export type ProjectMetadata = z.infer<typeof projectMetadataSchema>;
