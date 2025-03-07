import { expect, it, describe } from "vitest";
import { renderComponent, getNavigationLinks } from "./test-utils/__Navbar";

describe("Navbar component", () => {
  it("renders only the high score link on the root route", () => {
    renderComponent();
    const { backLink, highScoreLink } = getNavigationLinks();

    expect(backLink).not.toBeInTheDocument();
    expect(highScoreLink).toBeInTheDocument();
  });

  it("renders both back and high score links with correct puzzleId", async () => {
    renderComponent("/puzzle/5");
    const { backLink, highScoreLink } = getNavigationLinks();

    expect(backLink).toBeInTheDocument();
    expect(highScoreLink).toBeInTheDocument();
    expect(highScoreLink).toHaveAttribute("href", "/high-scores/5");
  });

  it("renders only back link pointing to puzzle page on high scores page", () => {
    renderComponent("/high-scores/2");
    const { backLink, highScoreLink } = getNavigationLinks();

    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/puzzle/2");
    expect(highScoreLink).not.toBeInTheDocument();
  });
});
