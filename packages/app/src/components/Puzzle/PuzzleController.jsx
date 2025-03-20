import propTypes from "prop-types";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useParams } from "react-router-dom";
import { usePuzzleDispatch, usePuzzleState } from "./PuzzleProvider";
import useOutsideClick from "../../hooks/useOutsideClick";
import { calculateScore } from "../../utils/puzzleUtils";
import { checkCharacterPosition, startPuzzle } from "../../utils/api";
import {
  Menu,
  Backdrop,
  Button,
  Spinner,
  Score,
  ScoreContainer,
  StartButtonContainer,
  HighScoreForm as ScoreForm,
} from "./PuzzleController.styled";

function PuzzleController() {
  const { token, characterSelector } = usePuzzleState();
  const [result, setResult] = useState(null);

  const component =
    token && characterSelector.isOpen
      ? "character-selector"
      : !token
      ? "start-puzzle"
      : result
      ? "puzzle-result"
      : null;

  switch (component) {
    case "character-selector": {
      return <CharacterSelector onComplete={(value) => setResult(value)} />;
    }

    case "start-puzzle": {
      return (
        <Backdrop>
          <StartPuzzle />
        </Backdrop>
      );
    }

    case "puzzle-result": {
      return (
        <Backdrop>
          <PuzzleResult result={result} onSubmit={() => setResult(null)} />
        </Backdrop>
      );
    }
  }
}

function StartPuzzle() {
  const dispatch = usePuzzleDispatch();

  // eslint-disable-next-line no-unused-vars
  const formAction = async (formData) => {
    const response = await startPuzzle();
    const data = await response.json();

    dispatch({ type: "start_puzzle", payload: { data } });
  };

  return (
    <form action={formAction}>
      <StartButtonContainer>
        <FormStatus>
          {({ pending }) =>
            pending ? <Spinner /> : <Button type="submit">Start</Button>
          }
        </FormStatus>
      </StartButtonContainer>
    </form>
  );
}

function PuzzleResult({ result, onSubmit }) {
  const { time, isHighestScore } = result;

  return (
    <ScoreContainer>
      <PlayerScore time={time} isHighestScore={isHighestScore} />
      {isHighestScore && <HighScoreForm time={time} onSubmit={onSubmit} />}
    </ScoreContainer>
  );
}

function CharacterSelector({ onComplete }) {
  const { puzzleId } = useParams();
  const { targetPosition, characterSelector } = usePuzzleState();
  const dispatch = usePuzzleDispatch();

  const closeSelector = () => dispatch({ type: "close_selector" });
  const selectorRef = useOutsideClick(closeSelector);

  const formAction = async (formData) => {
    const body = Object.fromEntries(formData);
    const response = await checkCharacterPosition({ ...body, puzzleId });
    const data = await response.json();

    if (data.isPuzzleCompleted) onComplete(data.score);
    dispatch({ type: "process_guess", payload: { data } });
  };

  const styles = {
    "--menu-left": `${characterSelector.position.x}px`,
    "--menu-top": `${characterSelector.position.y}px`,
  };

  return (
    <Menu ref={selectorRef} style={styles}>
      <form action={formAction}>
        <button type="button" aria-label="close" onClick={closeSelector}>
          ❌
        </button>
        <input type="hidden" name="x" value={targetPosition.x} />
        <input type="hidden" name="y" value={targetPosition.y} />
        <CharacterSelectorButtons />
      </form>
    </Menu>
  );
}

function CharacterSelectorButtons() {
  const { puzzleCharacters } = usePuzzleState();

  return (
    <FormStatus>
      {({ pending }) => (
        <>
          {puzzleCharacters.map(({ id, name, isFound }) => (
            <button
              key={id}
              value={id}
              name="characterId"
              disabled={pending || isFound}
            >
              {name}
            </button>
          ))}
        </>
      )}
    </FormStatus>
  );
}

function PlayerScore({ time, isHighestScore }) {
  const score = calculateScore(time);

  return (
    <Score>
      <p>
        {isHighestScore ? "🏆 Highest Score: " : "Score: "}
        {score}
      </p>
      <p>Time Taken: {time} seconds</p>
      {isHighestScore && (
        <p>
          🎉 Congratulations! You set a new high score! Enter your name below to
          join the leaderboard.
        </p>
      )}
    </Score>
  );
}

function HighScoreForm({ time, onSubmit }) {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    const nonLetterRegex = /[^A-Za-z]/g;
    const value = e.target.value.replace(nonLetterRegex, "");
    setName(value);
  };

  const handleSubmit = (e) => {
    if (!name.trim()) {
      e.preventDefault();
      return;
    }
    onSubmit();
  };

  return (
    <ScoreForm
      action="save"
      method="post"
      onSubmit={handleSubmit}
      viewTransition
    >
      <input type="hidden" name="time" value={time} />
      <label>
        <span>Name</span>
        <input
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          maxLength="12"
          minLength="3"
          required
        />
      </label>

      <FormStatus>
        {({ pending }) => (
          <Button disabled={pending} type="submit">
            Save
          </Button>
        )}
      </FormStatus>
    </ScoreForm>
  );
}

function FormStatus({ children }) {
  const status = useFormStatus();
  return <>{children(status)}</>;
}

PuzzleResult.propTypes = {
  result: propTypes.object.isRequired,
  onSubmit: propTypes.func.isRequired,
};

CharacterSelector.propTypes = {
  onComplete: propTypes.func.isRequired,
};

PlayerScore.propTypes = {
  isHighestScore: propTypes.bool.isRequired,
  time: propTypes.number.isRequired,
};

HighScoreForm.propTypes = {
  time: propTypes.number.isRequired,
  onSubmit: propTypes.func.isRequired,
};

FormStatus.propTypes = {
  children: propTypes.func.isRequired,
};

export default PuzzleController;
