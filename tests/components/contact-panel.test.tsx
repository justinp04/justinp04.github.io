import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContactPanel } from "@/components/sections/contact-panel";

const contact = {
  email: "justin.pan688@gmail.com",
  github: "https://github.com/justinp04",
  linkedin: "https://www.linkedin.com/in/justin-pan-055b0122b/",
};

afterEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: undefined,
  });
});

describe("ContactPanel", () => {
  it("always exposes a direct email fallback", () => {
    render(<ContactPanel {...contact} />);

    expect(screen.getByRole("link", { name: "Email Justin" })).toHaveAttribute(
      "href",
      "mailto:justin.pan688@gmail.com",
    );
  });

  it("copies the email address and announces success when Clipboard is available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    render(<ContactPanel {...contact} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy email" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("justin.pan688@gmail.com");
      expect(screen.getByText("Email copied")).toBeInTheDocument();
    });
  });

  it("keeps direct email available and announces when copying is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    render(<ContactPanel {...contact} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy email" }));

    expect(screen.getByRole("link", { name: "Email Justin" })).toHaveAttribute(
      "href",
      "mailto:justin.pan688@gmail.com",
    );
    expect(
      await screen.findByText("Copy unavailable — use the email link"),
    ).toBeInTheDocument();
  });
});
