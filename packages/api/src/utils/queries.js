import prisma from "../config/prismaClient.js";

export const getPosition = async (puzzleId, characterId) => {
  puzzleId = Number(puzzleId);
  characterId = Number(characterId);

  return await prisma.positions.findUnique({
    where: { characterId, puzzleId },
  });
};

export const getHighScores = async () => {
  return await prisma.highScores.findMany();
};

export const getHighestScore = async () => {
  return await prisma.highScores.aggregate({ _min: { time: true } });
};

export const insertHighScore = async (name, time) => {
  await prisma.highScores.create({ data: { name, time } });
};

export const getPositionsByPuzzleId = async (puzzleId) => {
  puzzleId = Number(puzzleId);
  return await prisma.positions.findMany({ where: { puzzleId } });
};
