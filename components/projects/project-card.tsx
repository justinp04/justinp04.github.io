import type { ProjectRecord } from "@/lib/projects/registry";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectRecord;
  emphasis?: "primary" | "standard";
  headingLevel?: 2 | 3;
}

export function ProjectCard({
  project,
  emphasis = "standard",
  headingLevel = 3,
}: ProjectCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-surface p-6 sm:p-8",
        emphasis === "primary" &&
          "bg-[linear-gradient(145deg,var(--surface-raised),var(--surface))] shadow-[0_24px_80px_oklch(0.05_0.02_180_/_0.35)] md:p-10",
      )}
    >
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-semibold text-primary">
          {project.status}
        </span>
        <span className="text-muted">{project.timeframe}</span>
      </div>
      <Heading className="mt-6 text-3xl font-semibold tracking-tight">
        {project.name}
      </Heading>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        {project.description}
      </p>
      <p className="mt-5 text-sm leading-6 text-foreground">
        {project.ownership}
      </p>
      <ul aria-label={`${project.name} technologies and focus areas`} className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            className="rounded-full border border-border bg-background/40 px-3 py-1 text-sm text-muted"
            key={tag}
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8">
        <a
          className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
          href={`/projects/${project.slug}/`}
        >
          Read the {project.name} case study
        </a>
        {project.links.map((link) => (
          <a
            className="text-sm font-semibold text-muted underline decoration-border underline-offset-4 hover:text-foreground"
            href={link.href}
            key={`${link.href}-${link.label}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
