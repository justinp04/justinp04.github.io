import Link from "next/link";
import type { ReactNode } from "react";

import { ProjectMediaPlaceholder } from "@/components/projects/project-media-placeholder";
import { projects, type ProjectRecord } from "@/lib/projects/registry";

interface CaseStudyLayoutProps {
  project: ProjectRecord;
  children: ReactNode;
}

export function CaseStudyLayout({ project, children }: CaseStudyLayoutProps) {
  const currentIndex = projects.findIndex(({ slug }) => slug === project.slug);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : undefined;

  return (
    <article>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link className="hover:text-foreground" href="/projects/">
              Project Index
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {project.name}
          </li>
        </ol>
      </nav>

      <header className="pt-10 sm:pt-14">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-semibold text-primary">
            {project.status}
          </span>
          <span className="text-muted">{project.timeframe}</span>
        </div>
        <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
          {project.name}
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-9 text-muted">
          {project.description}
        </p>
        <dl className="mt-8 grid max-w-3xl gap-6 border-y border-border py-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Ownership
            </dt>
            <dd className="mt-2 leading-7 text-foreground">{project.ownership}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Focus
            </dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        {project.links.length > 0 ? (
          <ul aria-label={`${project.name} external links`} className="mt-6 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <a
                  className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                  href={link.href}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mt-12 sm:mt-16">
        <ProjectMediaPlaceholder projectName={project.name} />
      </div>

      <div className="project-prose mx-auto mt-14 max-w-3xl sm:mt-20">{children}</div>

      <nav
        aria-label="Project navigation"
        className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
      >
        {previousProject ? (
          <Link
            className="rounded-xl border border-border bg-surface p-5 hover:border-primary/60"
            href={`/projects/${previousProject.slug}/`}
          >
            <span className="block text-sm text-muted">Previous project</span>
            <span className="mt-1 block font-semibold">{previousProject.name}</span>
          </Link>
        ) : (
          <Link
            className="rounded-xl border border-border bg-surface p-5 hover:border-primary/60"
            href="/projects/"
          >
            <span className="block text-sm text-muted">Explore more work</span>
            <span className="mt-1 block font-semibold">Return to Project Index</span>
          </Link>
        )}
        {nextProject ? (
          <Link
            className="rounded-xl border border-border bg-surface p-5 sm:text-right hover:border-primary/60"
            href={`/projects/${nextProject.slug}/`}
          >
            <span className="block text-sm text-muted">Next project</span>
            <span className="mt-1 block font-semibold">{nextProject.name}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
