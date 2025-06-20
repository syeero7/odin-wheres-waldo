import { param, body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { JWT_KEYS, COORDINATE_THRESHOLD } from "./utils/constants.js";
import * as db from "./utils/queries.js";

const { START_TIMESTAMP, FOUND_CHARACTER_IDS } = JWT_KEYS;

export const getHighScores = [
  param("puzzleId").toInt().isNumeric(),
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.sendStatus(404);

    const { puzzleId } = req.params;
    const scores = await db.getHighScores(puzzleId);

    res.json({ scores });
  }),
];

export const startGame = asyncHandler(async (req, res) => {
  const payload = { [START_TIMESTAMP]: Math.floor(Date.now() / 1000) };
  const token = jwt.sign(payload, process.env.SECRET);

  res.json({ token });
});

export const addHighScore = [
  body("time").toInt().isNumeric(),
  body("puzzleId").toInt().isNumeric(),
  body("name").trim().isLength({ min: 3, max: 50 }),
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.sendStatus(400);

    const { name, time, puzzleId } = req.body;
    await db.insertHighScore(name, time, puzzleId);

    res.sendStatus(204);
  }),
];

export const checkGuess = [
  body("x").toInt().isNumeric(),
  body("y").toInt().isNumeric(),
  body("puzzleId").toInt().isNumeric(),
  body("characterId").toInt().isNumeric(),
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.sendStatus(400);

    const { characterId, x: guessX, y: guessY, puzzleId } = req.body;
    const { x, y } = await db.getPosition(puzzleId, characterId);

    const data = {
      isCorrect: false,
      isPuzzleCompleted: false,
    };

    if (
      Math.abs(guessX - x) <= COORDINATE_THRESHOLD &&
      Math.abs(guessY - y) <= COORDINATE_THRESHOLD
    ) {
      data.isCorrect = true;
      data.character = { id: characterId, x, y };
    }

    if (!data.isCorrect) return res.json({ ...data });

    const { jwtPayload } = req;
    const foundCharacterIds = [
      characterId,
      ...(jwtPayload[FOUND_CHARACTER_IDS]?.split(",") || []),
    ];
    const payload = {
      ...jwtPayload,
      [FOUND_CHARACTER_IDS]: foundCharacterIds.join(","),
    };

    data.isPuzzleCompleted = await checkPuzzleCompleted(
      foundCharacterIds,
      puzzleId
    );

    if (data.isPuzzleCompleted) {
      const startTimestamp = jwtPayload[START_TIMESTAMP];
      const finishTimestamp = Math.floor(Date.now() / 1000);
      const completionTime = finishTimestamp - startTimestamp;

      const { _min } = await db.getHighestScore(puzzleId);
      const highestScore = _min?.time || null;
      const isHighestScore =
        completionTime < highestScore || highestScore === null;

      data.score = { time: completionTime, isHighestScore };
    }

    const token = jwt.sign(payload, process.env.SECRET);

    res.json({ token, ...data });
  }),
];

async function checkPuzzleCompleted(foundCharacterIds, puzzleId) {
  const charPositions = await db.getPositionsByPuzzleId(puzzleId);
  const puzzleCharIds = new Set(
    charPositions.map(({ characterId: id }) => id.toString())
  );

  if (foundCharacterIds.length !== puzzleCharIds.size) return false;

  return foundCharacterIds.every((id) => puzzleCharIds.has(id.toString()));
}
