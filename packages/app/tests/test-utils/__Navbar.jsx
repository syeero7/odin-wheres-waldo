/* eslint-disable react-refresh/only-export-components */

import { screen, render } from "@testing-library/react";
import { createRoutesStub } from "react-router-dom";
import Navbar from "../../src/components/Navbar";

export const renderComponent = (currentPath = "/") => {
  const Stub = createRoutesStub([
    {
      Component: Navbar,
      children: [
        { path: "/", Component: PuzzleList },
        { path: "/puzzle/:puzzleId", Component: Puzzle },
        { path: "/high-scores/:puzzleId", Component: HighScores },
      ],
    },
  ]);
  render(<Stub initialEntries={[currentPath]} />);
};

export const getNavigationLinks = () => {
  const backLink = screen.queryByTestId("back-link");
  const highScoreLink = screen.queryByRole("link", { name: /score/i });

  return { backLink, highScoreLink };
};

function PuzzleList() {
  return <div>PuzzleList</div>;
}

function Puzzle() {
  return <div>Puzzle</div>;
}

function HighScores() {
  return <div>HighScores</div>;
}
