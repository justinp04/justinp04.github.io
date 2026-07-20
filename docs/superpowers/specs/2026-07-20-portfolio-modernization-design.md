# Portfolio Modernization Design

Date: 20 July 2026

Status: Approved for implementation planning

## Purpose

Rebuild Justin Pan's outdated static portfolio as a maintainable TypeScript and React application using Next.js, Shadcn, Tailwind CSS, and local MDX. The result must present Justin as a product-minded Full-Stack Software Engineer, prioritize evidence for hiring managers and technical interviewers, remain useful to recruiters and prospective clients, and deploy through the repository's existing Netlify continuous-deployment connection.

This is a platform migration and design implementation. It is not a comprehensive copywriting engagement. The initial pages must use only facts supplied during discovery, with hidden source comments describing content Justin can expand later.

## Goals

- Replace raw HTML and CSS with a typed, component-based React application at the repository root.
- Make Project Case Studies the primary evidence path while keeping résumé and contact actions persistently available.
- Provide crawlable static HTML and route-specific metadata for the homepage, Project Index, and case studies.
- Give project content a single, typed source that can be maintained through MDX.
- Implement the approved dark SaaS visual direction without code-themed decoration.
- Keep the site fast, accessible, responsive, and straightforward to deploy on Netlify.
- Preserve honest boundaries between production work, pilot validation, deployed prototypes, and proofs of concept.

## Non-goals

- Writing complete technical narratives for every case study.
- A blog, article system, CMS, database, authentication, contact form, or server API.
- Light-mode support or a theme toggle.
- Reusing the abandoned nested `portfolio/` HeroUI rewrite.
- Preserving the `/priv/` Valentine mini-site.
- Automatically pushing, merging, or deploying the implementation branch.

## Architecture

Use the Next.js App Router with `output: "export"`. The build must emit static HTML, CSS, and JavaScript into `out`, which Netlify serves without a production Node.js runtime. The rationale and constraints are recorded in [ADR 0001](../../adr/0001-use-nextjs-static-export.md).

Use:

- TypeScript with strict checking
- React through the Next.js App Router
- Shadcn components, customized rather than presented with default demo styling
- Tailwind CSS and semantic design tokens
- Local MDX for Project Case Study bodies
- npm with a committed lockfile
- An active-LTS Node version pinned in repository configuration

Server Components are the default. Client Components are limited to the mobile navigation, copy-email behavior, and restrained motion. The static site must not use Server Actions, request-time route handlers, cookies, authentication, or other server-only Next.js features.

## Routes

- `/` — professional positioning, proof points, featured projects, experience, about, education, and contact
- `/projects/` — complete Project Index
- `/projects/chasecrm/` — ChaseCRM Project Case Study
- `/projects/macromunch/` — MacroMunch Project Case Study
- `/projects/sean-dunn-real-estate/` — Sean Dunn Real Estate Project Case Study
- Static branded not-found page
- `/justin-pan-resume.pdf` — reserved résumé location; intentionally absent on the isolated branch until Justin supplies the updated document

Use trailing-slash output so each route maps cleanly to a static directory on Netlify.

## Content model and data flow

Each project has typed metadata and an MDX body. A build-time registry validates the content and supplies every downstream consumer:

```text
Typed project metadata + MDX body
                ↓
       Build-time project registry
                ↓
Homepage previews · Project Index · case-study routes · route metadata
```

Required metadata includes a unique slug, name, concise description, timeframe, project status, ownership model, featured order, tags, and external links when available. Validation must reject duplicate slugs or missing required data during development or build.

The MDX body renders only confirmed information. Hidden MDX comments prompt later additions such as screenshots, architecture detail, technical decisions, measured outcomes, and lessons learned. Prompts and unfinished sections must never appear in the visitor-facing output.

Global professional content, experience, education, navigation, contact details, and profile links live in typed TypeScript content modules rather than being duplicated inside components.

## Page and component boundaries

- `SiteHeader` — brand, navigation, contact, résumé, and accessible mobile menu
- `Hero` — professional positioning and primary route into project evidence
- `ProofPoints` — concise, supportable professional evidence
- `ProjectCard` — shared project summary presentation
- `FeaturedProjects` — homepage selection using the shared registry
- `ProjectIndex` — complete project collection using the same registry
- `ExperienceTimeline` — named employers, titles, dates, and concise outcomes
- `AboutSummary` — professional narrative, Perth location, and education
- `ContactPanel` — direct email, copy-email, GitHub, and LinkedIn actions
- `CaseStudyLayout` — common project header, metadata, content width, and navigation
- `ProjectMediaPlaceholder` — intentional visual treatment until real screenshots exist
- `SiteFooter` — compact repeated contact and profile access

Component APIs must accept domain content rather than import page-specific data implicitly. Shadcn primitives provide accessible behavior; portfolio components own composition, content semantics, and visual identity.

## Homepage information hierarchy

1. Persistent header with Projects, Experience, About, Contact, and Résumé
2. Hero identifying Justin as a Full-Stack Software Engineer in Perth
3. Primary statement: Justin turns ambiguous ideas into useful, shipped products
4. Primary action to explore project work, with contact as a secondary action
5. Concise proof points, including three years of professional engineering and one accurately scoped performance result
6. Three featured project previews, with ChaseCRM receiving the strongest visual emphasis
7. Experience Timeline
8. About and Bachelor of Computing education summary
9. Contact panel and footer

The homepage previews all three launch projects. `/projects/` remains the expandable canonical index for future projects.

## Confirmed project content

### ChaseCRM

- Active since February 2026 and still ongoing
- Independently created and entirely owned by Justin as the sole developer
- A real-estate CRM that centralizes incoming leads and guides and automates prioritized follow-up
- Serves as both a system of record and a system of action
- Currently in limited access with pilot real-estate agents
- Pilot validation is qualitative: sustained weekly usage, fewer missed follow-ups, and clearer daily priorities
- Case-study source comments must request architecture details, technical decisions, screenshots with pilot data removed, measured usage, and future product direction

### MacroMunch

- Built in 2024 by Justin and one other developer with shared responsibility across the application and deployment
- A video-to-recipe nutrition product that transformed short-form cooking content without written recipes into reproducible recipes with trackable nutrition information
- Used computer vision as part of the workflow
- Reached a technically functional public deployment at `macromunch.app`, which is now offline
- Demonstrated feasibility but had no user adoption
- Must be described as a deployed prototype, not an active or validated product
- Case-study source comments must request architecture, model workflow, division of decisions, screenshots or archived media, technical limitations, and lessons learned

### Sean Dunn Real Estate

- Live at `https://www.seandunnrealestate.com/`
- A conversion-focused client site for real-estate agent Sean Dunn
- Uses a property-estimate call to action, testimonials, and direct contact to generate enquiries
- Justin solely owned requirements discovery, design, implementation, deployment, maintenance, and SEO
- The case-study emphasis is full-lifecycle client delivery rather than technical complexity
- Case-study source comments must request agreed success criteria, design rationale, traffic or enquiry evidence, screenshots, and maintenance learnings

## Confirmed experience and education content

### Clew, formerly CGR

- Full-Stack Software Engineer from 5 March 2025 to present
- Collaborates with product and customer-success teams on roadmap features and timely resolution of user issues
- Modernized legacy Ruby-rendered interfaces with React, improving delivery speed, load speed, performance, and user experience
- One accurately scoped page-load result improved from approximately 5.5 seconds to 1.8 seconds, about a 67% reduction
- Introduced AI-assisted generation and maintenance of Playwright regression tests, reducing manual test-authoring effort and making regression coverage faster to expand
- No private B2B artifact is expected to be linked publicly

### AngloGold Ashanti

- Software Engineer Intern from April through December 2024
- Built a TypeScript and SPFx document-management solution for the Greenfields team
- Addressed document relationship discovery across a complex SharePoint hierarchy four to six levels deep
- Reduced multi-tab navigation and administrative effort while improving organization
- Reached internal production use; four users were known to adopt it within a team of roughly 12 to 16 before Justin left

### Curtin University with KK Women's and Children's Hospital

- Software Engineering Intern from January through February 2024 in Singapore
- Worked with the head of radiology and another intern to establish requirements for a frontend research proof of concept
- Built a Three.js viewer that loaded 3D anatomical models constructed from CT, MRI, and similar imaging
- Intended to help patients without medical training understand scans during consultations where medical literacy and language differences could impede communication
- Accepted as a proof of concept by Curtin and hospital stakeholders
- Ran locally, had no backend, and was not deployed

### Jason Windows

- Software Engineering Intern from October through December 2023 in Welshpool, Perth
- Worked with another intern on a Power Apps inventory-scanning proof of concept that fit the company's existing Microsoft suite
- Allowed warehouse staff to scan parts entering inventory and parts being used
- Intended to reduce manual end-of-day stocktake effort and improve visibility of stock levels and wastage
- Was usable as a proof of concept, but Justin had no visibility into post-internship deployment or measured outcomes

### Education

- Bachelor of Computing, majoring in Software Engineering
- Curtin University
- Completed in 2024

## Contact and professional profiles

- Public location: Perth, Western Australia
- Public email: `justin.pan688@gmail.com`
- GitHub: `https://github.com/justinp04`
- LinkedIn: `https://www.linkedin.com/in/justin-pan-055b0122b/`
- Facebook is excluded
- No contact form
- Contact affordances include an email link, copy-email control, and LinkedIn
- Work arrangement is intentionally omitted because Justin is open to onsite, hybrid, and remote work

## Visual system

Implement the approved evidence-led dark SaaS direction:

- Near-black slate page background with layered dark surfaces
- Mint or emerald accent used selectively for primary actions, focus, and status
- Geist Sans typography with plainspoken headings
- No monospace treatment, terminal syntax, code jokes, or niche software decoration
- Wide content container, constrained reading widths, generous section gaps, and spacious cards
- Strongest visual emphasis on ChaseCRM, with balanced secondary project cards
- Semantic CSS variables compatible with customized Shadcn components
- Dark-only presentation with no theme toggle

Real product screenshots are not available at implementation time. Use intentional abstract placeholders that cannot be mistaken for product imagery, plus source comments identifying the future asset location and required alt-text update.

## Motion and responsive behavior

Use subtle section entrance transitions, hover feedback, and orientation-preserving route interaction only. Do not implement typewriter text, cursor effects, scroll hijacking, or continuously animated backgrounds. Respect `prefers-reduced-motion` by disabling or simplifying nonessential movement.

Layouts must remain coherent from small mobile screens through wide desktops. Mobile navigation must be keyboard operable, trap focus appropriately when open, close predictably, and preserve access to contact and résumé actions.

## Accessibility

- Semantic landmarks and correct heading order
- Skip link to main content
- Fully keyboard-operable navigation and controls
- Visible, high-contrast focus states
- WCAG AA color contrast at minimum
- Descriptive link and button names
- Decorative visuals hidden from assistive technology
- Meaningful alt text when real project media is added
- Automated accessibility tests on representative pages

## Failure handling and build validation

- Invalid project metadata, duplicate slugs, MDX compilation failures, TypeScript errors, lint errors, and unexpected broken internal links fail verification
- Unknown routes render a branded static not-found page
- Missing project media renders the intentional placeholder without layout shift
- Copy-email uses the Clipboard API when available and exposes a direct-email fallback
- External links use safe target and relationship attributes where applicable
- The intentionally absent résumé PDF is the single temporary link-check exception and must be called out in verification output and the README

## Testing and quality gates

Provide one project verification command that runs static analysis, tests, and the production build.

Coverage includes:

- Unit tests for project-registry validation, sorting, and content helpers
- Component tests for navigation, project cards, and contact controls
- Playwright tests for desktop and mobile navigation, homepage project links, the Project Index, all case-study routes, email behavior, professional profile links, and the not-found page
- Automated accessibility assertions on representative routes
- A production static-export smoke test confirming expected files in `out`
- Netlify deploy-preview verification before merge
- Lighthouse targets of at least 90 for performance and 95 for accessibility and SEO on the homepage and one representative case study

## Migration and deployment

Implementation remains on `portfolio-modernization` until Justin explicitly requests a push or merge.

The migration will:

- Scaffold the Next.js application at the repository root
- Replace the legacy `index.html` and `styles.css`
- Remove the approved `/priv/` mini-site
- Remove unused legacy images and icons after verifying they have no new consumer
- Remove the obsolete GitHub Pages `CNAME`; Netlify remains responsible for the custom domain
- Leave the stashed `revamp` work intact and exclude the local nested `portfolio/` remnant from the new application
- Add `netlify.toml` with `npm run build` and `out` as the publish directory
- Replace template documentation with repository-specific development, content-authoring, testing, résumé, screenshot, and Netlify instructions

## Git hygiene

The root `.gitignore` must exclude dependencies, `.next`, `out`, coverage, Playwright reports and test results, `.netlify`, local environment files except an intentional example file, logs, generated TypeScript state, OS metadata, visual-companion artifacts, and the obsolete local nested `portfolio/` directory.

Do not ignore source assets, MDX content, the future résumé PDF, configuration, tests, or lockfiles. Before every commit, inspect staged files to prevent generated output or local secrets from entering the repository.

## Acceptance criteria

- The root application installs reproducibly and passes the single verification command.
- The static export contains the homepage, Project Index, all three case studies, and the not-found page.
- All rendered claims stay within the confirmed facts in this document.
- Hidden prompts exist for deferred case-study copy and screenshots without appearing in rendered output.
- The approved dark SaaS direction and spacious information hierarchy are implemented responsively.
- Contact, GitHub, and LinkedIn actions work; the temporary résumé exception is explicit.
- No blog, form backend, light mode, `/priv/` route, HeroUI code, or nested rewrite code enters the application.
- Netlify can deploy the generated `out` directory through repository-based continuous deployment.
- Generated, local, secret, and obsolete files remain excluded from Git.
