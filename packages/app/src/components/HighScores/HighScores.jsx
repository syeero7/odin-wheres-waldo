import propTypes from "prop-types";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { PUZZLE_COUNT } from "../../utils/images";
import { calculateScore } from "../../utils/puzzleUtils";
import { Container, Filter, Table } from "./HighScores.styled";

function HighScores() {
  const { puzzleId } = useParams();
  const { scores } = useLoaderData();

  return (
    <Container>
      <header>
        <h1>🏆 High Scores</h1>
        <TableFilter puzzleId={puzzleId} />
      </header>

      {scores.length ? (
        <HighScoreTable scores={scores} puzzleId={puzzleId} />
      ) : (
        <p>
          There are currently no high scores recorded for Puzzle #{puzzleId}
        </p>
      )}
    </Container>
  );
}

function TableFilter({ puzzleId }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  const puzzleList = Array(PUZZLE_COUNT)
    .fill()
    .map((_, i) => i + 1);

  return (
    <Filter aria-label="table filter" ref={ref}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "open menu" : "close menu"}
      >
        Puzzle #{puzzleId} <span>{isOpen ? "\u2B9D" : "\u2B9F"} </span>
      </button>

      {isOpen && (
        <ul>
          {puzzleList.map(
            (num) =>
              puzzleId != num && (
                <li key={num}>
                  <Link
                    to={`/high-scores/${num}`}
                    onClick={() => setIsOpen(false)}
                    viewTransition
                  >
                    Puzzle #{num}
                  </Link>
                </li>
              )
          )}
        </ul>
      )}
    </Filter>
  );
}

function HighScoreTable({ scores, puzzleId }) {
  return (
    <Table>
      <caption>Puzzle #{puzzleId} High Scores</caption>

      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
          <th scope="col">Time (seconds)</th>
        </tr>
      </thead>

      <tbody>
        {scores.map(({ id, name, time }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{time}</td>
            <td>{calculateScore(time)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

TableFilter.propTypes = {
  puzzleId: propTypes.number.isRequired,
};

HighScoreTable.propTypes = {
  scores: propTypes.array.isRequired,
  puzzleId: propTypes.number.isRequired,
};

export default HighScores;
