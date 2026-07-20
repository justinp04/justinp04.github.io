import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, test } from "vitest";

const checker = path.resolve("scripts/check-internal-links.mjs");
const fixtures: string[] = [];

async function createFixture(files: Record<string, string>) {
  const root = await mkdtemp(path.join(tmpdir(), "portfolio-export-links-"));
  fixtures.push(root);

  await Promise.all(
    Object.entries(files).map(async ([relativePath, contents]) => {
      const target = path.join(root, relativePath);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, contents);
    }),
  );

  return root;
}

function runChecker(root: string) {
  try {
    const stdout = execFileSync(process.execPath, [checker, root], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });

    return { exitCode: 0, stderr: "", stdout };
  } catch (error) {
    const failure = error as { status?: number; stderr?: string; stdout?: string };

    return {
      exitCode: failure.status ?? 1,
      stderr: failure.stderr ?? "",
      stdout: failure.stdout ?? "",
    };
  }
}

afterEach(async () => {
  await Promise.all(
    fixtures.splice(0).map((fixture) => rm(fixture, { recursive: true })),
  );
});

describe("internal link checker", () => {
  test("rejects a broken relative target while allowing the résumé exception", async () => {
    const root = await createFixture({
      "index.html": `
        <a href="valid.html">Valid</a>
        <a href="missing.html">Missing</a>
        <a href="/justin-pan-resume.pdf">Résumé</a>
      `,
      "valid.html": "<h1>Valid</h1>",
    });

    const result = runChecker(root);

    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain("missing.html");
    expect(result.stderr).not.toContain("justin-pan-resume.pdf");
    expect(result.stdout).toContain(
      "WARNING: /justin-pan-resume.pdf is intentionally absent until Justin supplies the updated résumé.",
    );
  });

  test("normalizes query strings and hashes before checking targets", async () => {
    const root = await createFixture({
      "index.html": `
        <a href="valid.html?source=portfolio">Query</a>
        <a href="valid.html#details">Hash</a>
        <a href="valid.html?source=portfolio#details">Both</a>
      `,
      "valid.html": "<h1>Valid</h1>",
    });

    const result = runChecker(root);

    expect(result).toEqual({ exitCode: 0, stderr: "", stdout: "" });
  });

  test("resolves query-only hrefs to the current HTML document", async () => {
    const root = await createFixture({
      "index.html": `
        <a href="?source=portfolio">Query</a>
        <a href="?source=portfolio#contact">Query and hash</a>
      `,
    });

    const result = runChecker(root);

    expect(result).toEqual({ exitCode: 0, stderr: "", stdout: "" });
  });

  test("ignores external, contact, telephone, and fragment-only hrefs", async () => {
    const root = await createFixture({
      "index.html": `
        <a href="https://example.com">HTTPS</a>
        <a href="http://example.com">HTTP</a>
        <a href="mailto:justin@example.com">Email</a>
        <a href="tel:+61000000000">Telephone</a>
        <a href="#contact">Contact section</a>
      `,
    });

    const result = runChecker(root);

    expect(result).toEqual({ exitCode: 0, stderr: "", stdout: "" });
  });

  test("maps root, slash routes, assets, and document-relative routes", async () => {
    const root = await createFixture({
      "index.html": `
        <a href="/">Home</a>
        <a href="/projects/">Projects</a>
        <link href="/styles.css" rel="stylesheet">
      `,
      "projects/index.html": "<h1>Projects</h1>",
      "projects/chasecrm/index.html":
        '<a href="../macromunch/">MacroMunch</a>',
      "projects/macromunch/index.html": "<h1>MacroMunch</h1>",
      "styles.css": "body { color: black; }",
    });

    const result = runChecker(root);

    expect(result).toEqual({ exitCode: 0, stderr: "", stdout: "" });
  });

  test("rejects traversal to an existing target outside the export root", async () => {
    const root = await createFixture({ "index.html": "<h1>Home</h1>" });
    const outsideFile = path.join(
      path.dirname(root),
      `${path.basename(root)}-outside.txt`,
    );
    fixtures.push(outsideFile);
    await writeFile(outsideFile, "secret");
    await writeFile(
      path.join(root, "index.html"),
      `<a href="../${path.basename(outsideFile)}">Outside</a>`,
    );

    const result = runChecker(root);

    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain("outside export root");
    expect(result.stderr).toContain(path.basename(outsideFile));
  });

  test("rejects an in-root symlink to an existing target outside the export root", async () => {
    const root = await createFixture({
      "index.html": `
        <a href="valid.html">Valid</a>
        <a href="/escape.txt">Escape</a>
      `,
      "valid.html": "<h1>Valid</h1>",
    });
    const outsideFile = path.join(
      path.dirname(root),
      `${path.basename(root)}-outside.txt`,
    );
    fixtures.push(outsideFile);
    await writeFile(outsideFile, "secret");
    await symlink(outsideFile, path.join(root, "escape.txt"));

    const result = runChecker(root);

    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain("outside export root");
    expect(result.stderr).toContain("escape.txt");
    expect(result.stderr).not.toContain("valid.html");
  });

  test("reports a broken in-root symlink as a missing target", async () => {
    const root = await createFixture({
      "index.html": '<a href="broken.txt">Broken</a>',
    });
    await symlink(
      path.join(path.dirname(root), `${path.basename(root)}-missing.txt`),
      path.join(root, "broken.txt"),
    );

    const result = runChecker(root);

    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain("missing target broken.txt");
    expect(result.stderr).not.toContain("ENOENT");
  });

  test("aggregates every missing target before exiting", async () => {
    const root = await createFixture({
      "index.html": `
        <a href="first-missing.html">First</a>
        <a href="second-missing.html">Second</a>
      `,
    });

    const result = runChecker(root);

    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain("first-missing.html");
    expect(result.stderr).toContain("second-missing.html");
    expect(result.stderr.match(/missing target/g)).toHaveLength(2);
  });

  test("prints the exact résumé warning once per execution", async () => {
    const root = await createFixture({
      "index.html": `
        <a href="/justin-pan-resume.pdf">Résumé</a>
        <a href="/justin-pan-resume.pdf#download">Download résumé</a>
      `,
      "projects/index.html":
        '<a href="/justin-pan-resume.pdf?source=projects">Résumé</a>',
    });

    const result = runChecker(root);
    const warning =
      "WARNING: /justin-pan-resume.pdf is intentionally absent until Justin supplies the updated résumé.";

    expect(result.exitCode).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout.trim().split("\n")).toEqual([warning]);
  });
});
