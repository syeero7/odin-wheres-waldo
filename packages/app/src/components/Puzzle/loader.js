import { validatePuzzleId } from "../../utils/puzzleUtils";

export const loader = ({ params }) => {
  validatePuzzleId(params.puzzleId);

  return { status: 200, ok: true };
};
