"use client";

import { BriefcaseBusiness, Mail, UserRound } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactPanelProps {
  email: string;
  github: string;
  linkedin: string;
}

export function ContactPanel({
  email,
  github,
  linkedin,
}: ContactPanelProps) {
  const [status, setStatus] = useState("");

  async function copyEmail() {
    if (!navigator.clipboard?.writeText) {
      setStatus("Copy unavailable — use the email link");
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setStatus("Email copied");
    } catch {
      setStatus("Copy unavailable — use the email link");
    }
  }

  return (
    <section
      aria-labelledby="contact-heading"
      className="overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-2xl shadow-black/20 sm:p-10 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10"
      id="contact"
    >
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Contact
        </p>
        <h2 className="text-3xl font-semibold tracking-tight" id="contact-heading">
          Let&apos;s talk about useful software.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Email is the most direct way to reach me. You can also find my work and
          professional profile below.
        </p>
      </div>
      <div className="mt-7 flex flex-wrap content-start gap-3 lg:mt-0 lg:max-w-sm lg:justify-end">
        <a className={buttonVariants()} href={`mailto:${email}`}>
          <Mail aria-hidden="true" className="size-4" />
          Email Justin
        </a>
        <Button onClick={copyEmail} variant="outline">
          Copy email
        </Button>
        <a
          aria-label="GitHub profile"
          className={cn(buttonVariants({ variant: "outline" }))}
          href={github}
          rel="noreferrer noopener"
          target="_blank"
        >
          <UserRound aria-hidden="true" className="size-4" />
          GitHub
        </a>
        <a
          aria-label="LinkedIn profile"
          className={cn(buttonVariants({ variant: "outline" }))}
          href={linkedin}
          rel="noreferrer noopener"
          target="_blank"
        >
          <BriefcaseBusiness aria-hidden="true" className="size-4" />
          LinkedIn
        </a>
      </div>
      <p
        aria-live="polite"
        className="mt-4 min-h-6 text-sm text-primary lg:col-span-2"
        role="status"
      >
        {status}
      </p>
    </section>
  );
}
