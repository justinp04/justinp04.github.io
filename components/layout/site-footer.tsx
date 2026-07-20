import { BriefcaseBusiness, Mail, UserRound } from "lucide-react";

import type { ProfessionalProfiles } from "@/lib/content/types";

interface SiteFooterProps {
  profiles: ProfessionalProfiles;
}

export function SiteFooter({ profiles }: SiteFooterProps) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Justin Pan — Full-Stack Software Engineer in Perth.</p>
        <nav aria-label="Footer contact" className="flex flex-wrap gap-4">
          <a
            className="inline-flex items-center gap-2 hover:text-foreground"
            href={`mailto:${profiles.email}`}
          >
            <Mail aria-hidden="true" className="size-4" />
            Email Justin
          </a>
          <a
            aria-label="GitHub profile"
            className="inline-flex items-center gap-2 hover:text-foreground"
            href={profiles.github}
            rel="noreferrer noopener"
            target="_blank"
          >
            <UserRound aria-hidden="true" className="size-4" />
            GitHub
          </a>
          <a
            aria-label="LinkedIn profile"
            className="inline-flex items-center gap-2 hover:text-foreground"
            href={profiles.linkedin}
            rel="noreferrer noopener"
            target="_blank"
          >
            <BriefcaseBusiness aria-hidden="true" className="size-4" />
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
