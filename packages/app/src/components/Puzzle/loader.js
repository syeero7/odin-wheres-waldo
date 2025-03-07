import { validatePuzzleId } from "../../utils/puzzleUtils";

export const loader = async ({ params }) => {
  validatePuzzleId(params.puzzleId);

  return { status: 200, ok: true };
};
