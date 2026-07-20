import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const RESUME_PATH = "/justin-pan-resume.pdf";
const RESUME_WARNING =
  "WARNING: /justin-pan-resume.pdf is intentionally absent until Justin supplies the updated résumé.";

const exportRoot = path.resolve(process.argv[2] ?? "out");
const failures = [];
let encounteredResume = false;

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectHtmlFiles(target);
      }

      return entry.isFile() && entry.name.endsWith(".html") ? [target] : [];
    }),
  );

  return files.flat();
}

async function targetExists(target) {
  try {
    return (await stat(target)).isFile();
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

for (const htmlFile of await collectHtmlFiles(exportRoot)) {
  const html = await readFile(htmlFile, "utf8");

  for (const match of html.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)) {
    const href = match[1];

    if (href.startsWith("#") || /^(?:mailto:|tel:|https?:)/i.test(href)) {
      continue;
    }

    const normalizedHref = href.split(/[?#]/, 1)[0];

    if (normalizedHref === RESUME_PATH) {
      encounteredResume = true;
      continue;
    }

    const resolvedTarget = normalizedHref.startsWith("/")
      ? path.resolve(exportRoot, `.${normalizedHref}`)
      : path.resolve(path.dirname(htmlFile), normalizedHref);
    const target = normalizedHref.endsWith("/")
      ? path.join(resolvedTarget, "index.html")
      : resolvedTarget;
    const relativeTarget = path.relative(exportRoot, target);

    if (
      relativeTarget === ".." ||
      relativeTarget.startsWith(`..${path.sep}`) ||
      path.isAbsolute(relativeTarget)
    ) {
      failures.push(
        `${path.relative(exportRoot, htmlFile)}: target outside export root ${href}`,
      );
      continue;
    }

    if (!(await targetExists(target))) {
      failures.push(`${path.relative(exportRoot, htmlFile)}: missing target ${href}`);
    }
  }
}

if (encounteredResume) {
  console.log(RESUME_WARNING);
}

for (const failure of failures) {
  console.error(failure);
}

if (failures.length > 0) {
  process.exitCode = 1;
}
