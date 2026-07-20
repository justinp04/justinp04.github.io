import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
} satisfies NextConfig;

export default createMDX({})(nextConfig);
