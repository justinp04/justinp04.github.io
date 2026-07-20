import Link from "next/link";

import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectRecord } from "@/lib/projects/registry";

interface FeaturedProjectsProps {
  projects: readonly ProjectRecord[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="py-14 sm:py-20"
      id="projects"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
        Product evidence
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
        <h2
          className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl"
          id="featured-projects-heading"
        >
          Featured projects
        </h2>
        <Link
          className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
          href="/projects/"
        >
          View the Project Index
        </Link>
      </div>
      <div className="mt-10 grid gap-6 lg:mt-14">
        {projects.map((project, index) => (
          <ProjectCard
            emphasis={index === 0 ? "primary" : "standard"}
            key={project.slug}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
