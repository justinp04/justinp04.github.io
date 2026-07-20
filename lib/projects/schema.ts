import { z } from "zod";

const httpsProjectLinkSchema = z.string().url().refine(
  (href) => {
    try {
      return new URL(href).protocol === "https:";
    } catch {
      return false;
    }
  },
  { message: "Project link href must use HTTPS" },
);

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
    .array(z.object({ label: z.string().min(1), href: httpsProjectLinkSchema }))
    .default([]),
});

export type ProjectMetadata = z.infer<typeof projectMetadataSchema>;
