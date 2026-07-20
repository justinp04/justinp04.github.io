import type {
  HeroContent,
  NavigationItem,
  ProfessionalProfiles,
  ProofPoint,
} from "@/lib/content/types";

export const navigation = [
  { label: "Projects", href: "/projects/" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const satisfies readonly NavigationItem[];

export const profiles = {
  email: "justin.pan688@gmail.com",
  github: "https://github.com/justinp04",
  linkedin: "https://www.linkedin.com/in/justin-pan-055b0122b/",
  resume: "/justin-pan-resume.pdf",
} as const satisfies ProfessionalProfiles;

export const hero = {
  eyebrow: "Full-Stack Software Engineer · Perth, Western Australia",
  heading: "I turn ambiguous ideas into useful, shipped products.",
  summary:
    "I connect product needs, technical decisions, and end-to-end delivery across professional software, independent products, and client work.",
  primaryAction: { label: "Explore project work", href: "/projects/" },
  secondaryAction: { label: "Contact Justin", href: "/#contact" },
} as const satisfies HeroContent;

export const proofPoints = [
  {
    value: "3 years",
    label: "Professional engineering across full-time and internship roles",
  },
  {
    value: "≈67%",
    label:
      "One Clew page improved from approximately 5.5 seconds to 1.8 seconds",
  },
  {
    value: "End to end",
    label:
      "Product direction, implementation, deployment, and ongoing delivery",
  },
] as const satisfies readonly ProofPoint[];
