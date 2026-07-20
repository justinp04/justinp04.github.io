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

export interface ExperienceEntry {
  employer: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  outcomes: readonly string[];
}

export interface Education {
  degree: string;
  major: string;
  institution: string;
  completed: string;
}
