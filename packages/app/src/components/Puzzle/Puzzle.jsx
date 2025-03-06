import propTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import PuzzleController from "./PuzzleController";
import usePuzzleImages from "../../hooks/usePuzzleImages";
import useSessionStorage from "../../hooks/useSessionStorage";
import useBeforeLeave from "../../hooks/useBeforeLeave";
import { PuzzleContext } from "./PuzzleContext";
import { SESSION_STORAGE_KEY, removeItem } from "../../utils/sessionStorage";
import {
  getOriginalCoordinates,
  getClickCoordinates,
  getImageDimensions,
  getAdjustedCharacterCoordinates,
  addFoundStatusToPuzzleCharacters,
} from "../../utils/puzzleUtils";
import {
  Container,
  Output,
  Character,
  CharacterList,
  MarkersContainer,
  Marker,
  ImageContainer,
  PuzzleImage,
} from "./Puzzle.styled";

function Puzzle() {
  const [token, setToken] = useSessionStorage(SESSION_STORAGE_KEY);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [targetPosition, setTargetPosition] = useState({});
  const [feedback, setFeedback] = useState({ msg: "" });
  const [menuPosition, setMenuPosition] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useBeforeLeave(() => {
    removeItem(SESSION_STORAGE_KEY);
  });

  const { puzzleId } = useParams();
  const images = usePuzzleImages();
  const imgRef = useRef(null);

  const handleClick = (e) => {
    if (!imgRef.current || e.target !== imgRef.current) return;
    const { rect, scaleX, scaleY } = getImageDimensions(imgRef.current);
    const clickCoords = getClickCoordinates(e, rect);
    const originalCoords = getOriginalCoordinates(clickCoords, scaleX, scaleY);

    setIsMenuOpen(true);
    setMenuPosition(clickCoords);
    setTargetPosition(originalCoords);
  };

  const closeMenu = () => setIsMenuOpen(false);
  const selectedImage = images.find((img) => img.id == puzzleId);
  const characters = addFoundStatusToPuzzleCharacters(
    foundCharacters,
    selectedImage.characters
  );
  const adjustedFoundChars = getAdjustedCharacterCoordinates(
    imgRef.current,
    foundCharacters
  );
  const handleIncorrectGuess = () => setFeedback({ msg: "Incorrect" });
  const handleCorrectGuess = (token, character) => {
    const { id, x, y } = character;
    setFoundCharacters((prev) => [...prev, { id: Number(id), x, y }]);
    setToken({ token });
    setFeedback({ msg: "Correct" });
  };
  const handleStart = (token) => setToken({ token });

  const value = {
    token,
    targetPosition,
    onStart: handleStart,
    menu: {
      characters,
      isOpen: isMenuOpen,
      position: menuPosition,
      close: closeMenu,
    },
    onCorrectGuess: handleCorrectGuess,
    onIncorrectGuess: handleIncorrectGuess,
  };

  return (
    <Container>
      <header>
        <CharacterList>
          {characters.map(({ id, src, name, hasFound }) => (
            <Character key={id} style={{ "--opacity": hasFound ? "0.5" : "1" }}>
              <img src={src} alt={name} />
              <figcaption>{name}</figcaption>
            </Character>
          ))}
        </CharacterList>
        <Message feedback={feedback} />
      </header>

      <ImageContainer onClick={handleClick}>
        <PuzzleImage
          src={selectedImage.src}
          alt="puzzle"
          height="768"
          width="1365"
          ref={token !== null && imgRef}
        />

        <MarkersContainer>
          {adjustedFoundChars.map(({ id, x, y }) => (
            <Marker
              key={id}
              style={{ "--marker-left": `${x}px`, "--marker-top": `${y}px` }}
              data-testid="marker"
            >
              ✔
            </Marker>
          ))}
        </MarkersContainer>

        <PuzzleContext value={value}>
          <PuzzleController />
        </PuzzleContext>
      </ImageContainer>
    </Container>
  );
}

function Message({ feedback }) {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    setShowMessage(true);
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [feedback]);

  const variable = feedback.msg === "Correct" ? "--green" : "--red";

  return (
    <Output style={{ "--output": `var(${variable})` }}>
      {showMessage ? feedback.msg : ""}
    </Output>
  );
}

Message.propTypes = {
  feedback: propTypes.objectOf(propTypes.string).isRequired,
};

export default Puzzle;
