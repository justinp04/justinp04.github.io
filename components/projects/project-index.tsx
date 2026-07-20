import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectRecord } from "@/lib/projects/registry";

interface ProjectIndexProps {
  projects: readonly ProjectRecord[];
}

export function ProjectIndex({ projects }: ProjectIndexProps) {
  return (
    <section aria-labelledby="project-index-heading">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
        Selected work
      </p>
      <h1
        className="mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl"
        id="project-index-heading"
      >
        Project Index
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
        Product and client work, with the context, ownership, and evidence needed
        to understand how each project was delivered.
      </p>
      <div className="mt-12 grid gap-6 lg:mt-16">
        {projects.map((project, index) => (
          <ProjectCard
            emphasis={index === 0 ? "primary" : "standard"}
            headingLevel={2}
            key={project.slug}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
