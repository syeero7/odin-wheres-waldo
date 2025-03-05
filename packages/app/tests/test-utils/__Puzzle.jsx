import { vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router-dom";

import Puzzle from "../../src/components/Puzzle";
import usePuzzleImages from "../../src/hooks/usePuzzleImages";
import { images } from "../../src/utils/images";

export const initializeMocks = () => {
  vi.mock("../../src/hooks/usePuzzleImages", { default: vi.fn() });
  vi.mocked(usePuzzleImages).mockReturnValue(images);
};

const PUZZLE_ID = 3;
const PUZZLE_IMAGE_SIZE = { width: 1365, height: 768 };
export const TOKEN = { token: "token" };
export const SELECTED_PUZZLE = images.find((img) => img.id === PUZZLE_ID);

export const renderComponent = (action = null, isStartAction = false) => {
  const Stub = createRoutesStub([
    {
      path: "puzzle/:puzzleId",
      Component: Puzzle,
      children: [
        {
          path: "check",
          action() {
            return isStartAction ? null : action;
          },
        },
        {
          path: "start",
          action() {
            return isStartAction ? action : null;
          },
        },
      ],
    },
  ]);

  render(<Stub initialEntries={[`/puzzle/${PUZZLE_ID}`]} />);
};

export const getPreparedPuzzleImg = () => {
  const { width, height } = PUZZLE_IMAGE_SIZE;
  const image = screen.getByRole("img", { name: /puzzle/i });

  Object.defineProperties(image, {
    naturalHeight: { value: height },
    naturalWidth: { value: width },
    getBoundingClientRect: { value: vi.fn(() => ({ width, height })) },
  });

  return image;
};

export const openCharacterMenu = async () => {
  const user = userEvent.setup();
  await user.click(getPreparedPuzzleImg());
  const selectCharacter = async () => {
    await user.click(screen.getByRole("button", { name: /waldo/i }));
  };
  return { selectCharacter };
};

export const getPropertyValue = (element, propertyName) => {
  const computedStyles = window.getComputedStyle(element);
  const property = computedStyles[propertyName];
  return computedStyles.getPropertyValue(property.slice(4, -1));
};
