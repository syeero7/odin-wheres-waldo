import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  TOKEN,
  SELECTED_PUZZLE,
  initializeMocks,
  renderComponent,
  getPropertyValue,
  openCharacterMenu,
  getPreparedPuzzleImg,
  mockFetchResolvedValue,
  startPuzzle,
} from "./test-utils/__Puzzle";

initializeMocks();

describe("Puzzle component", () => {
  beforeEach(() => {
    window.sessionStorage.setItem("Token", JSON.stringify(TOKEN));
  });

  afterEach(() => {
    window.sessionStorage.clear();
    vi.unstubAllGlobals();
  });

  it("removes start button when clicked", async () => {
    const user = userEvent.setup();
    mockFetchResolvedValue(TOKEN);
    renderComponent();
    const button = screen.queryByRole("button", { name: /start/i });

    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(button).not.toBeInTheDocument();
  });

  it("renders the puzzle image and all related character images", () => {
    renderComponent();

    expect(getPreparedPuzzleImg()).toHaveAttribute("src", SELECTED_PUZZLE.src);
    SELECTED_PUZZLE.characters.forEach(({ name, src }) => {
      expect(screen.getByRole("img", { name })).toHaveAttribute("src", src);
    });
  });

  it("renders the character selection menu after clicking on the puzzle image", async () => {
    const user = userEvent.setup();
    mockFetchResolvedValue(TOKEN);
    renderComponent();
    await startPuzzle(user);
    await openCharacterMenu(user);

    SELECTED_PUZZLE.characters.forEach(({ name }) => {
      expect(screen.getByRole("button", { name })).toBeInTheDocument();
    });
  });

  it("renders a marker at the correct position after locating a character", async () => {
    const CHARACTER_POSITION = { x: 10, y: 34 };
    const mockData = {
      ...TOKEN,
      isCorrect: true,
      character: { id: 1, ...CHARACTER_POSITION },
      isPuzzleCompleted: false,
    };
    const user = userEvent.setup();
    mockFetchResolvedValue(mockData);
    renderComponent();
    await startPuzzle(user);
    const { selectCharacter } = await openCharacterMenu(user);
    await selectCharacter();
    const marker = await screen.findByTestId("marker");

    expect(marker).toBeInTheDocument();
    expect(getPropertyValue(marker, "left")).toBe(`${CHARACTER_POSITION.x}px`);
    expect(getPropertyValue(marker, "top")).toBe(`${CHARACTER_POSITION.y}px`);
  });

  it("renders result after completing puzzle", async () => {
    const mockData = {
      ...TOKEN,
      isCorrect: true,
      character: { id: 1, x: 1, y: 3 },
      isPuzzleCompleted: true,
      score: { isHighestScore: true, time: 30 },
    };
    const user = userEvent.setup();
    mockFetchResolvedValue(mockData);
    renderComponent();
    await startPuzzle(user);
    const { selectCharacter } = await openCharacterMenu(user);
    await selectCharacter();

    expect(screen.getByText(/30/)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
  });
});
