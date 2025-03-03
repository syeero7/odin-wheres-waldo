import prisma from "../src/config/prismaClient.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const positions = [
  { characterId: 1, puzzleId: 1, x: 147, y: 699 },

  { characterId: 1, puzzleId: 2, x: 679, y: 54 },
  { characterId: 2, puzzleId: 2, x: 315, y: 518 },
  { characterId: 4, puzzleId: 2, x: 688, y: 714 },

  { characterId: 1, puzzleId: 3, x: 845, y: 227 },
  { characterId: 2, puzzleId: 3, x: 147, y: 209 },
  { characterId: 3, puzzleId: 3, x: 370, y: 211 },

  { characterId: 1, puzzleId: 4, x: 553, y: 453 },
  { characterId: 2, puzzleId: 4, x: 97, y: 510 },
  { characterId: 3, puzzleId: 4, x: 1067, y: 414 },
  { characterId: 4, puzzleId: 4, x: 403, y: 358 },

  { characterId: 1, puzzleId: 5, x: 385, y: 220 },
  { characterId: 2, puzzleId: 5, x: 818, y: 488 },
  { characterId: 3, puzzleId: 5, x: 837, y: 677 },
  { characterId: 4, puzzleId: 5, x: 343, y: 553 },
];

const readFile = async (path) => {
  try {
    const file = await fs.readFile(path, "utf8");
    return file ? JSON.parse(file) : {};
  } catch (error) {
    console.error(error);
  }
};

const checkForExistingData = async () => {
  try {
    const existingRecords = await prisma.puzzle.count();
    return existingRecords > 0;
  } catch (error) {
    console.error("Error checking existing data:", error);
    return true;
  }
};

const seedDatabase = async () => {
  const hasExistingData = await checkForExistingData();

  if (hasExistingData) {
    console.log("Data already exists. Seeding cancelled.");
    return;
  }

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(__dirname, "..", "..", "characterData.json");

  try {
    console.log("seeding...");
    const { data } = await readFile(filePath);

    await prisma.$transaction(async (tx) => {
      for (const { id } of data) {
        await tx.puzzle.create({ data: { id } });
      }

      const { characters } = data.find(({ id }) => id === 5);
      for (const { id, name } of characters) {
        await tx.character.create({ data: { id, name } });
      }

      for (const { puzzleId, characterId, x, y } of positions) {
        await tx.positions.create({
          data: {
            x,
            y,
            puzzle: { connect: { id: puzzleId } },
            character: { connect: { id: characterId } },
          },
        });
      }
    });

    console.log("Database seeding has been completed successfully.");
  } catch (error) {
    console.error("Error during  database seeding: ", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
