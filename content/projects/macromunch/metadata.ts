import type { ProjectMetadata } from "@/lib/projects/schema";

export const macromunchMetadata = {
  slug: "macromunch",
  name: "MacroMunch",
  description:
    "A video-to-recipe nutrition prototype that turned short-form cooking content into reproducible recipes with trackable nutrition information.",
  timeframe: "2024",
  status: "Deployed prototype — now offline",
  ownership: "Shared product and delivery ownership with one other developer",
  featuredOrder: 2,
  tags: ["Computer vision", "Nutrition", "Prototype"],
  links: [],
} satisfies ProjectMetadata;
