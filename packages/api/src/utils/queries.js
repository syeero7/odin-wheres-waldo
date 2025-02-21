import prisma from "../config/prismaClient.js";

export const getCharacter = async (puzzleId, characterId) => {
  puzzleId = Number(puzzleId);
  characterId = Number(characterId);

  return await prisma.character.findUnique({
    where: { id: characterId, puzzleId },
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

export const getCharactersByPuzzleId = async (puzzleId) => {
  puzzleId = Number(puzzleId);
  return await prisma.character.findMany({ where: { puzzleId } });
};
