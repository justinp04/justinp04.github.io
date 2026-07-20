import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";

const navigation = [
  { label: "Projects", href: "/projects/" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const profiles = {
  email: "justin.pan688@gmail.com",
  github: "https://github.com/justinp04",
  linkedin: "https://www.linkedin.com/in/justin-pan-055b0122b/",
  resume: "/justin-pan-resume.pdf",
};

describe("SiteHeader", () => {
  it("exposes navigation and professional actions on desktop and mobile", () => {
    render(<SiteHeader navigation={navigation} profiles={profiles} />);

    for (const name of [
      "Projects",
      "Experience",
      "About",
      "Contact",
      "Résumé",
      "Email Justin",
      "GitHub profile",
      "LinkedIn profile",
    ]) {
      expect(screen.getAllByRole("link", { name }).length).toBeGreaterThan(0);
    }

    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));

    expect(screen.getByRole("dialog", { name: "Navigation" })).toBeInTheDocument();
  });
});
