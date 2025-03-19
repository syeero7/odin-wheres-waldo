import propTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PuzzleController from "./PuzzleController";
import PuzzleProvider, {
  usePuzzleDispatch,
  usePuzzleState,
} from "./PuzzleProvider";
import usePuzzleImages from "../../hooks/usePuzzleImages";
import useBeforeLeave from "../../hooks/useBeforeLeave";
import { SESSION_STORAGE_KEY, removeItem } from "../../utils/sessionStorage";
import { getAdjustedCharacterCoordinates } from "../../utils/puzzleUtils";
import {
  Container,
  Output,
  Character,
  CharacterList,
  MarkersContainer,
  Marker,
  ImageContainer,
  PuzzleImage as Image,
} from "./Puzzle.styled";

function Puzzle() {
  const { puzzleId } = useParams();
  const imageRef = useRef(null);
  const images = usePuzzleImages();

  useBeforeLeave(() => {
    removeItem(SESSION_STORAGE_KEY);
  });

  const selectedImage = images.find((img) => img.id === Number(puzzleId));

  return (
    <PuzzleProvider characters={selectedImage.characters}>
      <Container>
        <header>
          <PuzzleCharacters />
          <FeedbackMessage />
        </header>

        <PuzzleImage src={selectedImage.src} ref={imageRef}>
          <FoundCharacterMarkers imageRef={imageRef} />
          <PuzzleController />
        </PuzzleImage>
      </Container>
    </PuzzleProvider>
  );
}

function PuzzleImage({ src, ref, children }) {
  const { token } = usePuzzleState();
  const dispatch = usePuzzleDispatch();

  const handleClick = (e) => {
    const image = ref.current;
    if (!image || e.target !== image) return;

    const { clientX, clientY } = e;
    dispatch({ type: "select_position", payload: { image, clientX, clientY } });
  };

  return (
    <ImageContainer onClick={handleClick}>
      <Image
        src={src}
        alt="puzzle"
        height="768"
        width="1365"
        ref={token ? ref : null}
        fetchPriority="low"
      />

      {children}
    </ImageContainer>
  );
}

function PuzzleCharacters() {
  const { puzzleCharacters } = usePuzzleState();

  return (
    <CharacterList>
      {puzzleCharacters.map(({ id, src, name, isFound }) => {
        const opacity = { "--opacity": isFound ? "0.5" : "1" };

        return (
          <Character key={id} style={opacity}>
            <img src={src} alt={name} width="60" height="60" />
            <figcaption>{name}</figcaption>
          </Character>
        );
      })}
    </CharacterList>
  );
}

function FeedbackMessage() {
  const { isGuessCorrect, foundCharacters } = usePuzzleState();
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    setShowMessage(true);
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isGuessCorrect]);

  const message = isGuessCorrect ? "Correct" : "Wrong";
  const variable = isGuessCorrect ? "--green" : "--red";

  return (
    <Output style={{ "--output": `var(${variable})` }}>
      {showMessage && foundCharacters.length ? message : ""}
    </Output>
  );
}

function FoundCharacterMarkers({ imageRef }) {
  const foundCharacters = useAdjustedFoundCharacters(imageRef);

  return (
    <MarkersContainer>
      {foundCharacters.map(({ id, x, y }) => {
        const styles = { "--marker-left": `${x}px`, "--marker-top": `${y}px` };

        return (
          <Marker key={id} style={styles} data-testid="marker">
            ✔
          </Marker>
        );
      })}
    </MarkersContainer>
  );
}

const useAdjustedFoundCharacters = (imageRef) => {
  const [adjustedCharacters, setAdjustedCharacters] = useState([]);
  const { foundCharacters } = usePuzzleState();

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    const characters = getAdjustedCharacterCoordinates(image, foundCharacters);

    setAdjustedCharacters(characters);
  }, [imageRef, foundCharacters]);

  return adjustedCharacters;
};

PuzzleImage.propTypes = {
  src: propTypes.string.isRequired,
  ref: propTypes.object.isRequired,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node).isRequired,
    propTypes.node.isRequired,
  ]).isRequired,
};

FoundCharacterMarkers.propTypes = {
  imageRef: propTypes.object.isRequired,
};

export default Puzzle;
