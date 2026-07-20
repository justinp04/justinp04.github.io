import type { ProjectMetadata } from "@/lib/projects/schema";

export const chasecrmMetadata = {
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
} satisfies ProjectMetadata;
