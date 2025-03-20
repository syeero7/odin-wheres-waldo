import { redirect } from "react-router-dom";
import { addHighScore } from "../../utils/api";

export const saveHighScore = async ({ request, params }) => {
  const { puzzleId } = params;
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  await addHighScore({ ...body, puzzleId });
  return redirect(`/high-scores/${puzzleId}`);
};
