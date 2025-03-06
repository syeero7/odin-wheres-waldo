import { createContext, useContext } from "react";

export const PuzzleContext = createContext({
  token: "",
  onStart: () => {},
  onCorrectGuess: () => {},
  onIncorrectGuess: () => {},
  targetPosition: { x: 0, y: 0 },
  menu: {
    isOpen: false,
    close: () => {},
    characters: {},
    position: { x: 0, y: 0 },
  },
});

export const usePuzzleContext = () => useContext(PuzzleContext);
