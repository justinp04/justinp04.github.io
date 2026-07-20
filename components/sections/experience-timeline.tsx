import type { ExperienceEntry } from "@/lib/content/types";

interface ExperienceTimelineProps {
  entries: readonly ExperienceEntry[];
}

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <section aria-labelledby="experience-heading" className="py-14 sm:py-20" id="experience">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
        Experience Timeline
      </p>
      <h2
        className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl"
        id="experience-heading"
      >
        Professional engineering, from internships to product delivery.
      </h2>
      <ol className="mt-10 grid gap-8 lg:mt-14">
        {entries.map((entry) => (
          <li className="experience-entry" key={`${entry.employer}-${entry.start}`}>
            <article className="grid gap-5 rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-10">
              <div>
                <p className="text-sm font-semibold text-primary">
                  {entry.start} to {entry.end}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  {entry.employer}
                </h3>
                <p className="mt-2 text-base text-muted">{entry.role}</p>
                {entry.location ? (
                  <p className="mt-2 text-sm text-muted">{entry.location}</p>
                ) : null}
              </div>
              <ul className="grid content-start gap-3 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                {entry.outcomes.map((outcome) => (
                  <li className="flex gap-3" key={outcome}>
                    <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
