import { sendResponseWithToken } from "../middleware/sendResponseWithToken.js";
import * as db from "../utils/queries.js";
import { JWT_KEYS } from "../utils/constants.js";
import {
  isArraysMatch,
  isWithinCoordinateThreshold,
} from "../utils/functions.js";

export const getHighScores = async (req, res) => {
  const scores = await db.getHighScores();
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
  const { characterId, x: guessX, y: guessY, puzzleId } = body;
  const { x, y } = await db.getPosition(puzzleId, characterId);

  if (isWithinCoordinateThreshold(guessX, guessY, x, y)) {
    const { FOUND_CHARACTER_IDS, START_TIMESTAMP } = JWT_KEYS;
    const payloadCharacterIds =
      jwtPayload[FOUND_CHARACTER_IDS]?.split(",") || [];
    const foundCharacterIds = [characterId, ...payloadCharacterIds];
    const charPositions = await db.getPositionsByPuzzleId(puzzleId);
    const puzzleCharIds = charPositions.map(({ characterId: id }) => ({ id }));

    const responseData = {
      correct: true,
      character: { id: 1, x, y },
      puzzleCompleted: false,
    };

    if (isArraysMatch(foundCharacterIds, puzzleCharIds, "id")) {
      const startTimestamp = jwtPayload[START_TIMESTAMP];
      const finishTimestamp = Math.floor(Date.now() / 1000);
      const completionTime = finishTimestamp - startTimestamp;
      const { _min } = await db.getHighestScore(puzzleId);
      const highestScore = _min?.time || null;

      responseData.puzzleCompleted = true;
      responseData.score = { time: completionTime };

      if (completionTime < highestScore || highestScore === null) {
        responseData.score.highestScore = true;
      }
    }

    const payload = {
      ...jwtPayload,
      [FOUND_CHARACTER_IDS]: foundCharacterIds.join(","),
    };
    return await sendResponseWithToken(res, next, payload, responseData);
  }

  res.json({ correct: false, puzzleCompleted: false });
};
