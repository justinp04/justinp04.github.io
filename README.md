# Justin Pan Portfolio

## 1. Purpose and architecture

This repository publishes Justin Pan's professional portfolio for hiring managers, technical interviewers, prospective clients, and collaborators. It uses the Next.js App Router, strict TypeScript, local MDX, `output: "export"`, and trailing-slash routes. The production artifact is the static `out/` directory, so Netlify does not require a production Node.js runtime.

## 2. Prerequisites and installation

Use Node.js 24.18.0 and npm. Install the committed dependency graph with:

```bash
npm install
```

Use `npm ci` when a clean, lockfile-exact installation is required.

## 3. Development and verification commands

- `npm run dev` starts the local Next.js development server.
- `npm run test` runs the unit and component Vitest suite.
- `npm run build` creates the production static export in `out/`.
- `npm run verify` runs linting, strict type checking, unit/component tests, the build, export checks, the internal-link crawl, and all Playwright tests in that order.
- `npm run lighthouse` audits the built homepage and ChaseCRM Project Case Study against the configured Lighthouse thresholds.

## 4. Project authoring contract

Each Project Case Study is a paired `content/projects/<slug>/metadata.ts` and `content/projects/<slug>/body.mdx`. Import both files into the explicit source list in `lib/projects/registry.ts`; files do not enter the portfolio through automatic discovery.

Metadata validation requires a kebab-case `slug`, non-empty `name`, `description`, `timeframe`, `status`, and `ownership`, a positive integer `featuredOrder`, at least one non-empty `tag`, and optional links containing a non-empty label and valid absolute URL. Project slugs must be unique. Invalid metadata, duplicate slugs, or MDX compilation errors fail verification.

## 5. Author prompts

JSX comments in `body.mdx`, such as `{/* Author prompt: ... */}`, are private authoring prompts. Keep them as comments and never turn them into visible portfolio copy.

## 6. Screenshots and alt text

Add future case-study screenshots under `public/projects/<slug>/`. Use only approved, public-safe images with private or pilot data removed. When real media is available, remove the corresponding visual placeholder and render the image with concise, meaningful alt text describing the evidence it provides; do not expose filenames or use generic text such as "screenshot."

## 7. Résumé placeholder

`public/justin-pan-resume.pdf` is intentionally absent until Justin supplies the updated résumé. The link checker allows only this missing target and prints an explicit warning. To publish the document, add the PDF at that exact path; existing résumé links do not need to change.

## 8. Netlify deploy-preview gate

The repository's Netlify connection should run `npm run build` with Node.js 24.18.0 and publish `out/`. Use a repository-based deploy preview for final acceptance. On that preview, confirm an arbitrary unknown URL serves the branded not-found page, keyboard-check the mobile menu, verify all three Project Case Studies and the profile/contact actions, and run Lighthouse against `/` and `/projects/chasecrm/`. Both pages must score at least 0.90 performance, 0.95 accessibility, and 0.95 SEO.

## 9. Release boundary

Do not push, merge, or deploy without Justin's explicit request. Local verification does not replace the human-authorized Netlify deploy-preview gate.
