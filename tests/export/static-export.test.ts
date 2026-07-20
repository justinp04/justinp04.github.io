import { readFile, stat } from "node:fs/promises";

import { describe, expect, test } from "vitest";

const expected = [
  "out/index.html",
  "out/404.html",
  "out/projects/index.html",
  "out/projects/chasecrm/index.html",
  "out/projects/macromunch/index.html",
  "out/projects/sean-dunn-real-estate/index.html",
];

const caseStudies = [
  {
    file: "out/projects/chasecrm/index.html",
    deferredPromptPhrases: [
      "screenshots with all pilot data removed",
      "future product direction",
    ],
  },
  {
    file: "out/projects/macromunch/index.html",
    deferredPromptPhrases: [
      "confirmed architecture and model workflow",
      "screenshots or archived media",
      "technical limitations and lessons learned",
    ],
  },
  {
    file: "out/projects/sean-dunn-real-estate/index.html",
    deferredPromptPhrases: [
      "agreed success criteria",
      "traffic or enquiry evidence",
      "maintenance learning",
    ],
  },
] as const;

describe("static export", () => {
  test.each(expected)("emits a non-empty %s", async (file) => {
    const fileStat = await stat(file);

    expect(fileStat.isFile()).toBe(true);
    expect(fileStat.size).toBeGreaterThan(0);
  });

  test.each(caseStudies)(
    "omits author prompts from the raw exported $file source",
    async ({ file, deferredPromptPhrases }) => {
      const html = await readFile(file, "utf8");
      const normalizedHtml = html.toLowerCase();

      expect(html).not.toMatch(/Author prompt:/i);
      for (const phrase of deferredPromptPhrases) {
        expect(normalizedHtml).not.toContain(phrase.toLowerCase());
      }
    },
  );
});
