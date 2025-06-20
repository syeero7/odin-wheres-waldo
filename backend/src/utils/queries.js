import prisma from "../prisma-client.js";

export const getPosition = async (puzzleId, characterId) => {
  return await prisma.positions.findFirst({
    where: { characterId, puzzleId },
  });
};

export const getHighScores = async (puzzleId) => {
  return await prisma.highScores.findMany({ where: { puzzleId } });
};

export const getHighestScore = async (puzzleId) => {
  return await prisma.highScores.aggregate({
    _min: { time: true },
    where: { puzzleId },
  });
};

export const insertHighScore = async (name, time, puzzleId) => {
  await prisma.highScores.create({
    data: { name, time, puzzle: { connect: { id: puzzleId } } },
  });
};

export const getPositionsByPuzzleId = async (puzzleId) => {
  return await prisma.positions.findMany({ where: { puzzleId } });
};
