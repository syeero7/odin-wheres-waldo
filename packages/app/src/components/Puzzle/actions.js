import { redirect } from "react-router-dom";
import {
  startPuzzle,
  checkCharacterPosition,
  addHighScore,
} from "../../utils/api";

export const start = async () => {
  const response = await startPuzzle();
  return response.json();
};

export const check = async ({ request, params }) => {
  const { puzzleId } = params;
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  const response = await checkCharacterPosition({ ...body, puzzleId });
  return response.json();
};

export const save = async ({ request, params }) => {
  const { puzzleId } = params;
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  await addHighScore({ ...body, puzzleId });
  return redirect(`/high-scores/${puzzleId}`);
};
