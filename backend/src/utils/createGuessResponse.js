import { JWT_KEYS } from "./constants.js";
import { isArraysMatch, isWithinCoordinateThreshold } from "./functions.js";
import * as db from "./queries.js";

export const createGuessResponse = async (body, jwtPayload) => {
  let foundCharacterIds = [];
  let payload = {};
  const responseData = { isCorrect: false, isPuzzleCompleted: false };

  const { characterId, x: guessX, y: guessY, puzzleId } = body;
  const { x, y } = await db.getPosition(puzzleId, characterId);

  if (isWithinCoordinateThreshold(guessX, guessY, x, y)) {
    responseData.isCorrect = true;
    responseData.character = { id: Number(characterId), x, y };
  }

  if (responseData.isCorrect) {
    foundCharacterIds = getFoundCharacterIds(jwtPayload, characterId);
    payload = createNewPayload(jwtPayload, foundCharacterIds);

    const isCompleted = await isPuzzleCompleted(foundCharacterIds, puzzleId);
    responseData.isPuzzleCompleted = isCompleted;
  }

  if (responseData.isPuzzleCompleted) {
    responseData.score = await getScore(jwtPayload, puzzleId);
  }

  const guessState = responseData.isCorrect ? "correct" : "wrong";
  return { guessState, data: responseData, payload };
};

function getFoundCharacterIds(payload, characterId) {
  const { FOUND_CHARACTER_IDS } = JWT_KEYS;
  const payloadCharacterIds = payload[FOUND_CHARACTER_IDS]?.split(",") || [];
  return [characterId, ...payloadCharacterIds];
}

async function isPuzzleCompleted(foundCharacterIds, puzzleId) {
  const charPositions = await db.getPositionsByPuzzleId(puzzleId);
  const puzzleCharIds = charPositions.map(({ characterId: id }) => ({ id }));
  return isArraysMatch(foundCharacterIds, puzzleCharIds, "id");
}

async function getScore(payload, puzzleId) {
  const completionTime = calculateCompletionTime(payload);
  const { _min } = await db.getHighestScore(puzzleId);
  const highestScore = _min?.time || null;
  const isHighestScore = completionTime < highestScore || highestScore === null;

  return { time: completionTime, isHighestScore };
}

function createNewPayload(oldPayload, foundCharacterIds) {
  const { FOUND_CHARACTER_IDS } = JWT_KEYS;
  return { ...oldPayload, [FOUND_CHARACTER_IDS]: foundCharacterIds.join(",") };
}

function calculateCompletionTime(payload) {
  const { START_TIMESTAMP } = JWT_KEYS;
  const startTimestamp = payload[START_TIMESTAMP];
  const finishTimestamp = Math.floor(Date.now() / 1000);

  return finishTimestamp - startTimestamp;
}
