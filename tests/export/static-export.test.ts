import { stat } from "node:fs/promises";

import { describe, expect, test } from "vitest";

const expected = [
  "out/index.html",
  "out/404.html",
  "out/projects/index.html",
  "out/projects/chasecrm/index.html",
  "out/projects/macromunch/index.html",
  "out/projects/sean-dunn-real-estate/index.html",
];

describe("static export", () => {
  test.each(expected)("emits a non-empty %s", async (file) => {
    const fileStat = await stat(file);

    expect(fileStat.isFile()).toBe(true);
    expect(fileStat.size).toBeGreaterThan(0);
  });
});
