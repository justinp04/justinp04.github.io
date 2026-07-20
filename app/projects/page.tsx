import type { Metadata } from "next";

import { ProjectIndex } from "@/components/projects/project-index";
import { projects } from "@/lib/projects/registry";

export const metadata: Metadata = {
  title: "Projects — Justin Pan",
  description:
    "A Project Index of Justin Pan's product engineering and client delivery work.",
};

export default function ProjectsPage() {
  return (
    <main
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      id="main-content"
    >
      <ProjectIndex projects={projects} />
    </main>
  );
}
