import prisma from "../config/prismaClient.js";

export const getPosition = async (puzzleId, characterId) => {
  puzzleId = Number(puzzleId);
  characterId = Number(characterId);

  return await prisma.positions.findFirst({
    where: { characterId, puzzleId },
  });
};

export const getHighScores = async () => {
  return await prisma.highScores.findMany();
};

export const getHighestScore = async (puzzleId) => {
  puzzleId = Number(puzzleId);

  return await prisma.highScores.aggregate({
    _min: { time: true },
    where: { puzzleId },
  });
};

export const insertHighScore = async (name, time, puzzleId) => {
  puzzleId = Number(puzzleId);
  time = Number(time);

  await prisma.highScores.create({
    data: { name, time, puzzle: { connect: { id: puzzleId } } },
  });
};

export const getPositionsByPuzzleId = async (puzzleId) => {
  puzzleId = Number(puzzleId);

  return await prisma.positions.findMany({ where: { puzzleId } });
};
