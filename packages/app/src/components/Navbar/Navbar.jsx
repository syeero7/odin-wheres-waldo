import propTypes from "prop-types";
import { useLocation, useMatch } from "react-router-dom";
import arrowBack from "../../assets/arrow-back.svg";
import { Nav, List, ListItem, StyledNavLink } from "./Navbar.styled";

function Navbar() {
  const { matchedPath, puzzlePath } = useMatchedPuzzlePath();

  return (
    <Nav>
      <List>
        <ListItem>
          <CustomNavLink
            to={matchedPath === "high-scores" ? `/puzzle${puzzlePath}` : "/"}
            testid={"back-link"}
          >
            <img src={arrowBack} alt="back" width="45" height="45" />
          </CustomNavLink>
        </ListItem>

        <ListItem>
          <CustomNavLink to={`/high-scores${matchedPath ? puzzlePath : ""}`}>
            High scores
          </CustomNavLink>
        </ListItem>
      </List>
    </Nav>
  );
}

function CustomNavLink({ to, testid = null, children }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  if (isActive) return null;

  return (
    <StyledNavLink data-testid={testid} to={to} viewTransition>
      {children}
    </StyledNavLink>
  );
}

const useMatchedPuzzlePath = () => {
  const puzzleMatch = useMatch("/puzzle/:puzzleId");
  const highScoreMatch = useMatch("/high-scores/:puzzleId");

  const { matchedPath, puzzleId } = puzzleMatch
    ? { matchedPath: "puzzle", puzzleId: puzzleMatch.params.puzzleId }
    : highScoreMatch
    ? { matchedPath: "high-scores", puzzleId: highScoreMatch.params.puzzleId }
    : { matchedPath: null, puzzleId: null };

  return { matchedPath, puzzlePath: `/${puzzleId}` };
};

CustomNavLink.propTypes = {
  to: propTypes.string.isRequired,
  testid: propTypes.string,
  children: propTypes.oneOfType([propTypes.string, propTypes.node]).isRequired,
};

export default Navbar;
