import type { Education, ExperienceEntry } from "@/lib/content/types";

export const experienceEntries = [
  {
    employer: "Clew, formerly CGR",
    role: "Full-Stack Software Engineer",
    start: "5 March 2025",
    end: "present",
    outcomes: [
      "Collaborates with product and customer-success teams on roadmap features and timely resolution of user issues.",
      "Modernizes legacy Ruby-rendered interfaces with React to improve delivery speed, load speed, performance, and user experience.",
      "Improved one scoped page from approximately 5.5 seconds to 1.8 seconds, about a 67% reduction.",
      "Introduced AI-assisted generation and maintenance of Playwright regression tests, reducing manual test-authoring effort and making coverage faster to expand.",
    ],
  },
  {
    employer: "AngloGold Ashanti",
    role: "Software Engineer Intern",
    start: "April",
    end: "December 2024",
    outcomes: [
      "Built a TypeScript and SPFx document-management solution for the Greenfields team's SharePoint hierarchy, which was four to six levels deep.",
      "Reduced multi-tab navigation and administrative effort while improving document organization and relationship discovery.",
      "Reached internal production; four users were known to adopt it within a team of roughly 12 to 16 before Justin left.",
    ],
  },
  {
    employer: "Curtin University with KK Women's and Children's Hospital",
    role: "Software Engineering Intern",
    start: "January",
    end: "February 2024",
    location: "Singapore",
    outcomes: [
      "Worked with the head of radiology and another intern to establish requirements for a frontend research proof of concept.",
      "Built a local Three.js anatomical viewer for 3D models constructed from CT, MRI, and similar imaging.",
      "Supported patient consultations across differences in medical knowledge and language; Curtin and hospital stakeholders accepted the proof of concept.",
      "The viewer had no backend and was not deployed.",
    ],
  },
  {
    employer: "Jason Windows",
    role: "Software Engineering Intern",
    start: "October",
    end: "December 2023",
    location: "Welshpool, Perth",
    outcomes: [
      "Built a usable Power Apps inventory-scanning proof of concept with another intern, fitting the company's existing Microsoft suite.",
      "Allowed warehouse staff to scan parts entering inventory and parts being used.",
      "Aimed to reduce manual end-of-day stocktake effort and improve visibility of stock levels and wastage.",
      "Post-internship deployment and measured outcomes are unknown.",
    ],
  },
] as const satisfies readonly ExperienceEntry[];

export const education = {
  degree: "Bachelor of Computing",
  major: "Software Engineering",
  institution: "Curtin University",
  completed: "2024",
} as const satisfies Education;
