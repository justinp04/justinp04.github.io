import { ContactPanel } from "@/components/sections/contact-panel";
import { profiles } from "@/content/site";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" id="main-content">
      <section className="max-w-3xl py-10 sm:py-16">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Perth, Western Australia
        </p>
        <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
          Justin Pan
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-muted sm:text-2xl sm:leading-9">
          Full-Stack Software Engineer in Perth, Western Australia.
        </p>
      </section>
      <div className="pt-12 sm:pt-20">
        <ContactPanel
          email={profiles.email}
          github={profiles.github}
          linkedin={profiles.linkedin}
        />
      </div>
    </main>
  );
}
