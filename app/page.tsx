import { Reveal } from "@/components/motion/reveal";
import { AboutSummary } from "@/components/sections/about-summary";
import { ContactPanel } from "@/components/sections/contact-panel";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { ProofPoints } from "@/components/sections/proof-points";
import {
  about,
  education,
  experienceEntries,
  hero,
  profiles,
  proofPoints,
} from "@/content/site";
import { featuredProjects } from "@/lib/projects/registry";

export default function Home() {
  return (
    <main
      className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8"
      id="main-content"
    >
      <Reveal>
        <Hero content={hero} />
      </Reveal>
      <Reveal>
        <ProofPoints items={proofPoints} />
      </Reveal>
      <Reveal>
        <FeaturedProjects projects={featuredProjects} />
      </Reveal>
      <Reveal>
        <ExperienceTimeline entries={experienceEntries} />
      </Reveal>
      <Reveal>
        <AboutSummary
          education={education}
          location={about.location}
          narrative={about.narrative}
        />
      </Reveal>
      <Reveal className="pt-12 sm:pt-20">
        <ContactPanel
          email={profiles.email}
          github={profiles.github}
          linkedin={profiles.linkedin}
        />
      </Reveal>
    </main>
  );
}
