import { sendResponseWithToken } from "../middleware/sendResponseWithToken.js";
import * as db from "../utils/queries.js";
import { JWT_KEYS } from "../utils/constants.js";
import { createGuessResponse } from "../utils/createGuessResponse.js";

export const getHighScores = async (req, res) => {
  const { puzzleId } = req.params;

  const scores = await db.getHighScores(puzzleId);
  res.json({ scores });
};

export const startGamePost = async (req, res, next) => {
  const payload = { [JWT_KEYS.START_TIMESTAMP]: Math.floor(Date.now() / 1000) };
  await sendResponseWithToken(res, next, payload);
};

export const addHighScore = async (req, res) => {
  const { name, time, puzzleId } = req.body;

  const trimmedName = name.trim();
  if (trimmedName.length < 3) return res.sendStatus(400);

  await db.insertHighScore(trimmedName, time, puzzleId);
  res.sendStatus(204);
};

export const checkGuessPost = async (req, res, next) => {
  const { body, jwtPayload } = req;
  const response = await createGuessResponse(body, jwtPayload);
  const { data, payload, guessState } = response;

  switch (guessState) {
    case "correct":
      return await sendResponseWithToken(res, next, payload, data);

    case "wrong":
      return res.json(data);
  }
};
