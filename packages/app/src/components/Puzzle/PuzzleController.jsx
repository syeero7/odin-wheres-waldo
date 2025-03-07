import propTypes from "prop-types";
import { useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { usePuzzleContext } from "./PuzzleContext";
import useOutsideClick from "../../hooks/useOutsideClick";
import useOnFetcherDataChange from "../../hooks/useOnFetcherDataChange";
import {
  Menu,
  Backdrop,
  Button,
  Spinner,
  HighScoreForm,
  ScoreContainer,
  Score,
  StartButtonContainer,
} from "./PuzzleController.styled";
import { calculateScore } from "../../utils/puzzleUtils";

function PuzzleController() {
  const { token, menu } = usePuzzleContext();
  const [result, setResult] = useState(null);

  if (token && menu.isOpen) {
    return <CharacterMenu onFinished={(value) => setResult(value)} />;
  }

  if (!token) {
    return (
      <Backdrop>
        <StartPuzzle />
      </Backdrop>
    );
  }

  if (result) {
    return (
      <Backdrop>
        <PuzzleResult
          isHighestScore={result.highestScore}
          time={result.time}
          onSubmit={() => setResult(null)}
        />
      </Backdrop>
    );
  }
}

function StartPuzzle() {
  const { onStart } = usePuzzleContext();
  const fetcher = useFetcher();

  useOnFetcherDataChange(() => {
    if (fetcher.data?.token) onStart(fetcher.data.token);
  }, fetcher.data);

  return (
    <fetcher.Form action="start" method="post">
      <StartButtonContainer>
        {fetcher.state !== "idle" ? (
          <Spinner />
        ) : (
          <Button type="submit">Start</Button>
        )}
      </StartButtonContainer>
    </fetcher.Form>
  );
}

function PuzzleResult({ isHighestScore, time, onSubmit }) {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    if (!inputRef.current.value.trim()) {
      e.preventDefault();
      return;
    }
    onSubmit();
  };

  const score = calculateScore(time);

  return (
    <ScoreContainer>
      <Score>
        <p>
          {isHighestScore ? "🏆 Highest Score: " : "Score: "}
          {score}
        </p>
        <p>Time Taken: {time} seconds</p>
        {isHighestScore && (
          <p>
            🎉 Congratulations! You set a new high score! Enter your name below
            to join the leaderboard.
          </p>
        )}
      </Score>
      {isHighestScore && (
        <HighScoreForm action="save" method="post" onSubmit={handleSubmit}>
          <input type="hidden" name="time" value={time} />
          <label>
            <span>Name</span>
            <input
              ref={inputRef}
              type="text"
              name="name"
              maxLength="12"
              required
            />
          </label>
          <Button type="submit">Save</Button>
        </HighScoreForm>
      )}
    </ScoreContainer>
  );
}

function CharacterMenu({ onFinished }) {
  const { menu, targetPosition, onCorrectGuess, onIncorrectGuess } =
    usePuzzleContext();
  const menuRef = useOutsideClick(menu.close);
  const fetcher = useFetcher();

  useOnFetcherDataChange(() => {
    if (fetcher.data.correct) {
      const { token, character, puzzleCompleted } = fetcher.data;

      onCorrectGuess(token, character);
      if (puzzleCompleted) {
        onFinished({ highestScore: false, ...fetcher.data.score });
      }
    } else {
      onIncorrectGuess();
    }
    menu.close();
  }, fetcher.data);

  const style = {
    "--menu-left": `${menu.position.x}px`,
    "--menu-top": `${menu.position.y}px`,
  };

  return (
    <Menu ref={menuRef} style={style}>
      <fetcher.Form method="post" action="check">
        <button type="button" aria-label="close" onClick={menu.close}>
          ❌
        </button>
        <input type="hidden" name="x" value={targetPosition.x} />
        <input type="hidden" name="y" value={targetPosition.y} />
        {menu.characters.map(({ id, name, hasFound }) => (
          <button key={id} name="characterId" value={id} disabled={hasFound}>
            {name}
          </button>
        ))}
      </fetcher.Form>
    </Menu>
  );
}

PuzzleResult.propTypes = {
  isHighestScore: propTypes.bool.isRequired,
  time: propTypes.number.isRequired,
  onSubmit: propTypes.func.isRequired,
};

CharacterMenu.propTypes = {
  onFinished: propTypes.func.isRequired,
};

export default PuzzleController;
