export interface NavigationItem {
  label: string;
  href: string;
}

export interface ProfessionalProfiles {
  email: string;
  github: string;
  linkedin: string;
  resume: string;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  summary: string;
  primaryAction: NavigationItem;
  secondaryAction: NavigationItem;
}

export interface ProofPoint {
  value: string;
  label: string;
}
