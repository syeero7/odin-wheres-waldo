import img1 from "../assets/ww1.webp";
import img2 from "../assets/ww2.webp";
import img3 from "../assets/ww3.webp";
import img4 from "../assets/ww4.webp";
import img5 from "../assets/ww5.webp";

import img1Small from "../assets/ww1-small.webp";
import img2Small from "../assets/ww2-small.webp";
import img3Small from "../assets/ww3-small.webp";
import img4Small from "../assets/ww4-small.webp";
import img5Small from "../assets/ww5-small.webp";

import Waldo from "../assets/Waldo.webp";
import Odlaw from "../assets/Odlaw.webp";
import Wizard from "../assets/Whitebeard.webp";
import Wenda from "../assets/Wenda.webp";

import { data } from "../../../characterData.json";

export const PUZZLE_COUNT = data.length;

const imageSrc = [
  {
    id: 1,
    src: img1,
    srcSmall: img1Small,
    characters: [{ id: 1, src: Waldo }],
  },
  {
    id: 2,
    src: img2,
    srcSmall: img2Small,
    characters: [
      { id: 1, src: Waldo },
      { id: 2, src: Odlaw },
      { id: 4, src: Wenda },
    ],
  },
  {
    id: 3,
    src: img3,
    srcSmall: img3Small,
    characters: [
      { id: 1, src: Waldo },
      { id: 2, src: Odlaw },
      { id: 3, src: Wizard },
    ],
  },
  {
    id: 4,
    src: img4,
    srcSmall: img4Small,
    characters: [
      { id: 1, src: Waldo },
      { id: 2, src: Odlaw },
      { id: 3, src: Wizard },
      { id: 4, src: Wenda },
    ],
  },
  {
    id: 5,
    src: img5,
    srcSmall: img5Small,
    characters: [
      { id: 1, src: Waldo },
      { id: 2, src: Odlaw },
      { id: 3, src: Wizard },
      { id: 4, src: Wenda },
    ],
  },
];

const combineArrays = (puzzles, images) => {
  const imagesMap = new Map(images.map((img) => [img.id, img]));

  return puzzles.map((puzzle) => {
    const image = imagesMap.get(puzzle.id);
    const charactersMap = new Map(
      image.characters.map((char) => [char.id, char])
    );

    const characters = puzzle.characters.map((puzzleChar) => {
      const imgChar = charactersMap.get(puzzleChar.id);
      return { ...puzzleChar, ...imgChar };
    });

    return { ...puzzle, ...image, characters };
  });
};

export const images = combineArrays(data, imageSrc);
