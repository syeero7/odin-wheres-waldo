import { createContext, use, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import {
  getItem,
  setItem,
  SESSION_STORAGE_KEY,
} from "../../utils/sessionStorage";
import {
  getClickCoordinates,
  getImageDimensions,
  getOriginalCoordinates,
} from "../../utils/puzzleUtils";

function PuzzleProvider({ characters, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setItem(state.token, SESSION_STORAGE_KEY);
  }, [state.token]);

  const foundCharacters = new Set(
    state.foundCharacters.map((character) => {
      return [character.id, character];
    })
  );

  const puzzleCharacters = characters.map((character) => {
    return { ...character, isFound: foundCharacters.has(character.id) };
  });

  const value = { ...state, puzzleCharacters };

  return (
    <PuzzleContext value={value}>
      <PuzzleDispatchContext value={dispatch}>{children}</PuzzleDispatchContext>
    </PuzzleContext>
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case "start_puzzle": {
      const { token } = action.payload.data;
      return { ...state, token };
    }

    case "select_position": {
      const { image, ...event } = action.payload;
      const { rect, scaleX, scaleY } = getImageDimensions(image);
      const selectorPosition = getClickCoordinates(event, rect);
      const targetPosition = getOriginalCoordinates(
        selectorPosition,
        scaleX,
        scaleY
      );

      return {
        ...state,
        targetPosition,
        characterSelector: { position: selectorPosition, isOpen: true },
      };
    }

    case "close_selector": {
      return {
        ...state,
        characterSelector: { ...state.characterSelector, isOpen: false },
      };
    }

    case "process_guess": {
      const { isCorrect, ...payloadData } = action.payload.data;
      const defaultUpdates = {
        isGuessCorrect: isCorrect,
        characterSelector: { ...state.characterSelector, isOpen: false },
      };
      const correctGuessUpdates = isCorrect
        ? {
            token: payloadData.token,
            foundCharacters: [
              ...state.foundCharacters,
              { ...payloadData.character },
            ],
          }
        : {};

      return { ...state, ...defaultUpdates, ...correctGuessUpdates };
    }

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const initialState = {
  token: getItem(SESSION_STORAGE_KEY),
  isGuessCorrect: false,
  targetPosition: { x: null, y: null },
  foundCharacters: [],
  characterSelector: {
    isOpen: false,
    position: { x: null, y: null },
  },
};

const PuzzleContext = createContext({ ...initialState, puzzleCharacters: [] });
const PuzzleDispatchContext = createContext(() => {});

const usePuzzleState = () => use(PuzzleContext);
const usePuzzleDispatch = () => use(PuzzleDispatchContext);

PuzzleProvider.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export { PuzzleProvider as default, usePuzzleDispatch, usePuzzleState };
