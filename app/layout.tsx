import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { navigation, profiles } from "@/content/site";

import "./globals.css";

export const metadata: Metadata = {
  title: "Justin Pan — Full-Stack Software Engineer",
  description:
    "Product-minded Full-Stack Software Engineer in Perth, Western Australia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <SkipLink />
        <SiteHeader navigation={navigation} profiles={profiles} />
        {children}
        <SiteFooter profiles={profiles} />
      </body>
    </html>
  );
}
