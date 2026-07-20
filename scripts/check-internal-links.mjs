import { lstat, readFile, readdir, realpath, stat } from "node:fs/promises";
import path from "node:path";

const RESUME_PATH = "/justin-pan-resume.pdf";
const RESUME_WARNING =
  "WARNING: /justin-pan-resume.pdf is intentionally absent until Justin supplies the updated résumé.";

const exportRoot = path.resolve(process.argv[2] ?? "out");
const canonicalExportRoot = await realpath(exportRoot);
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

function isOutsideRoot(root, target) {
  const relativeTarget = path.relative(root, target);

  return (
    relativeTarget === ".." ||
    relativeTarget.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativeTarget)
  );
}

async function canonicalExistingFile(target) {
  try {
    const canonicalTarget = await realpath(target);

    return (await stat(canonicalTarget)).isFile() ? canonicalTarget : undefined;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      ["ELOOP", "ENOENT", "ENOTDIR"].includes(error.code)
    ) {
      return undefined;
    }

    throw error;
  }
}

async function targetExists(target) {
  try {
    await lstat(target);
    return true;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      ["ENOENT", "ENOTDIR"].includes(error.code)
    ) {
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

    const resolvedTarget =
      normalizedHref === ""
        ? htmlFile
        : normalizedHref.startsWith("/")
          ? path.resolve(exportRoot, `.${normalizedHref}`)
          : path.resolve(path.dirname(htmlFile), normalizedHref);
    const target = normalizedHref.endsWith("/")
      ? path.join(resolvedTarget, "index.html")
      : resolvedTarget;

    if (isOutsideRoot(exportRoot, target)) {
      failures.push(
        `${path.relative(exportRoot, htmlFile)}: target outside export root ${href}`,
      );
      continue;
    }

    const canonicalTarget = await canonicalExistingFile(target);

    if (!canonicalTarget) {
      if (
        normalizedHref === RESUME_PATH &&
        !(await targetExists(target))
      ) {
        encounteredResume = true;
        continue;
      }

      failures.push(`${path.relative(exportRoot, htmlFile)}: missing target ${href}`);
      continue;
    }

    if (isOutsideRoot(canonicalExportRoot, canonicalTarget)) {
      failures.push(
        `${path.relative(exportRoot, htmlFile)}: target outside export root ${href}`,
      );
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
