"use client";

import { BriefcaseBusiness, FileText, Mail, Menu, UserRound } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type {
  NavigationItem,
  ProfessionalProfiles,
} from "@/lib/content/types";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  navigation: readonly NavigationItem[];
  profiles: ProfessionalProfiles;
}

export function MobileNavigation({
  navigation,
  profiles,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const closeNavigation = () => setOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button aria-label="Open navigation" size="icon" variant="outline">
            <Menu aria-hidden="true" className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav aria-label="Mobile navigation" className="mt-8 flex flex-col gap-2">
            {navigation.map((item) => (
              <a
                className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface-raised"
                href={item.href}
                key={item.href}
                onClick={closeNavigation}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto grid gap-2 border-t border-border pt-6">
            <a
              className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
              href={`mailto:${profiles.email}`}
              onClick={closeNavigation}
            >
              <Mail aria-hidden="true" className="size-4" />
              Email Justin
            </a>
            <a
              aria-label="GitHub profile"
              className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
              href={profiles.github}
              onClick={closeNavigation}
              rel="noreferrer noopener"
              target="_blank"
            >
              <UserRound aria-hidden="true" className="size-4" />
              GitHub
            </a>
            <a
              aria-label="LinkedIn profile"
              className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
              href={profiles.linkedin}
              onClick={closeNavigation}
              rel="noreferrer noopener"
              target="_blank"
            >
              <BriefcaseBusiness aria-hidden="true" className="size-4" />
              LinkedIn
            </a>
            <a
              className={cn(buttonVariants(), "justify-start")}
              href={profiles.resume}
              onClick={closeNavigation}
            >
              <FileText aria-hidden="true" className="size-4" />
              Résumé
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
