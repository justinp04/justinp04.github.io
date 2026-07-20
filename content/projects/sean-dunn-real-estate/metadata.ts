import type { ProjectMetadata } from "@/lib/projects/schema";

export const seanDunnRealEstateMetadata = {
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
} satisfies ProjectMetadata;
