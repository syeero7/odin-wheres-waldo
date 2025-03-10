import { getHighScores } from "../../utils/api";
import { validatePuzzleId } from "../../utils/puzzleUtils";

export const loader = async ({ params }) => {
  const { puzzleId } = params;
  validatePuzzleId(puzzleId);

  const response = await getHighScores(puzzleId);
  return response.json();
};
