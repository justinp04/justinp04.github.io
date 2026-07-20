import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("Next.js export configuration", () => {
  it("builds trailing-slash static output with MDX enabled", () => {
    expect(nextConfig.output).toBe("export");
    expect(nextConfig.trailingSlash).toBe(true);
    expect(nextConfig.pageExtensions).toContain("mdx");
  });
});
