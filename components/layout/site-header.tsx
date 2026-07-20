import { BriefcaseBusiness, FileText, Mail, UserRound } from "lucide-react";
import Link from "next/link";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { buttonVariants } from "@/components/ui/button";
import type {
  NavigationItem,
  ProfessionalProfiles,
} from "@/lib/content/types";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  navigation: readonly NavigationItem[];
  profiles: ProfessionalProfiles;
}

export function SiteHeader({ navigation, profiles }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link className="shrink-0 text-base font-semibold tracking-tight" href="/">
          Justin Pan
        </Link>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navigation.map((item) => (
            <a
              className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-1 md:flex">
          <a
            aria-label="Email Justin"
            className={buttonVariants({ size: "icon", variant: "ghost" })}
            href={`mailto:${profiles.email}`}
          >
            <Mail aria-hidden="true" className="size-4" />
          </a>
          <a
            aria-label="GitHub profile"
            className={buttonVariants({ size: "icon", variant: "ghost" })}
            href={profiles.github}
            rel="noreferrer noopener"
            target="_blank"
          >
            <UserRound aria-hidden="true" className="size-4" />
          </a>
          <a
            aria-label="LinkedIn profile"
            className={buttonVariants({ size: "icon", variant: "ghost" })}
            href={profiles.linkedin}
            rel="noreferrer noopener"
            target="_blank"
          >
            <BriefcaseBusiness aria-hidden="true" className="size-4" />
          </a>
          <a
            className={cn(buttonVariants({ size: "sm" }), "ml-2")}
            href={profiles.resume}
          >
            <FileText aria-hidden="true" className="size-4" />
            Résumé
          </a>
        </div>
        <div className="ml-auto md:hidden">
          <MobileNavigation navigation={navigation} profiles={profiles} />
        </div>
      </div>
    </header>
  );
}
