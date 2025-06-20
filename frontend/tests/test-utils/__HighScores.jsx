import { render } from "@testing-library/react";
import { createRoutesStub } from "react-router-dom";
import HighScores from "../../src/components/HighScores";

export const renderComponent = (
  emptyScores = false,
  currentPath = "/high-scores/1"
) => {
  const puzzleId = Number(currentPath.slice(-1));
  const Stub = createRoutesStub([
    {
      path: "/high-scores/:puzzleId",
      Component: HighScores,
      loader() {
        return {
          scores: emptyScores
            ? []
            : [
                {
                  id: 1,
                  name: "test",
                  time: 169,
                  puzzleId,
                },
                {
                  id: 2,
                  name: "test2",
                  time: 26,
                  puzzleId,
                },
              ],
        };
      },
    },
  ]);

  render(<Stub initialEntries={[currentPath]} />);
};
