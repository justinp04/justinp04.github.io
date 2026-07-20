import type { ProofPoint } from "@/lib/content/types";

interface ProofPointsProps {
  items: readonly ProofPoint[];
}

export function ProofPoints({ items }: ProofPointsProps) {
  return (
    <section aria-labelledby="proof-heading" className="py-10 sm:py-14">
      <div className="mb-7 flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Professional proof
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight" id="proof-heading">
            Delivery grounded in real outcomes.
          </h2>
        </div>
      </div>
      <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
        {items.map((item) => (
          <div className="bg-surface p-6 sm:p-8" key={item.label}>
            <dt className="text-sm leading-6 text-muted">{item.label}</dt>
            <dd className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
