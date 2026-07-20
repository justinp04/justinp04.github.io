import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { HeroContent } from "@/lib/content/types";
import { cn } from "@/lib/utils";

interface HeroProps {
  content: HeroContent;
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="py-14 sm:py-20 lg:py-28">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
        {content.eyebrow}
      </p>
      <h1 className="mt-5 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-8xl">
        <span className="sr-only">Justin Pan — </span>
        {content.heading}
      </h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
        {content.summary}
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <a className={buttonVariants()} href={content.primaryAction.href}>
          {content.primaryAction.label}
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
        <a
          className={cn(buttonVariants({ variant: "outline" }))}
          href={content.secondaryAction.href}
        >
          {content.secondaryAction.label}
          <ArrowDownRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </section>
  );
}
