import type { Education } from "@/lib/content/types";

interface AboutSummaryProps {
  narrative: string;
  location: string;
  education: Education;
}

export function AboutSummary({ narrative, location, education }: AboutSummaryProps) {
  return (
    <section
      aria-labelledby="about-heading"
      className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-12"
      id="about"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          About
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl" id="about-heading">
          Product-minded from idea to delivery.
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{narrative}</p>
        <p className="mt-5 text-base font-medium text-foreground">Based in {location}.</p>
      </div>
      <div className="rounded-2xl border border-border bg-surface-raised p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
          Education
        </p>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight">
          {education.degree}
        </h3>
        <p className="mt-2 text-base text-muted">Major in {education.major}</p>
        <p className="mt-6 text-sm leading-6 text-muted">
          {education.institution} · Completed {education.completed}
        </p>
      </div>
    </section>
  );
}
