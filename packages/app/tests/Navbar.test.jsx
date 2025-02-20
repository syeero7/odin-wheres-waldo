import { vi, expect, it, describe } from "vitest";
import { screen, render } from "@testing-library/react";
import { useLocation, MemoryRouter } from "react-router-dom";
import Navbar from "../src/components/Navbar";

vi.mock("react-router-dom", async (importOriginal) => {
  const originalModule = await importOriginal();
  return { ...originalModule, useLocation: vi.fn() };
});

const renderComponent = (pathname = "/") => {
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <Navbar />
    </MemoryRouter>
  );
};

const mockUseLocationReturnValue = (currentPath = "", previousPath = null) => {
  vi.mocked(useLocation).mockReturnValue({
    pathname: `/${currentPath}`,
    state: previousPath ? { from: `/${previousPath}` } : null,
  });
};

const getLinkElements = () => {
  const backLink = screen.queryByTestId("back-link");
  const highScoreLink = screen.queryByRole("link", { name: /score/i });
  return { backLink, highScoreLink };
};

describe("Navbar component", () => {
  it("doesn't render back nav link for pathname: '/'", () => {
    mockUseLocationReturnValue();
    renderComponent();
    const { backLink, highScoreLink } = getLinkElements();
    expect(backLink).not.toBeInTheDocument();
    expect(highScoreLink).toBeInTheDocument();
  });

  it("renders both nav links for pathname: '/puzzles/:puzzleId'", () => {
    const CURRENT_PATHNAME = "puzzles/5";
    mockUseLocationReturnValue(CURRENT_PATHNAME, "/");
    renderComponent(CURRENT_PATHNAME);

    const { backLink, highScoreLink } = getLinkElements();
    expect(backLink).toBeInTheDocument();
    expect(highScoreLink).toBeInTheDocument();
  });

  it("doesn't render high scores nav link for pathname: '/scores'", () => {
    const CURRENT_PATHNAME = "scores";
    mockUseLocationReturnValue(CURRENT_PATHNAME, "puzzles/5");
    renderComponent(CURRENT_PATHNAME);

    const { backLink, highScoreLink } = getLinkElements();
    expect(backLink).toBeInTheDocument();
    expect(highScoreLink).not.toBeInTheDocument();
  });
});
