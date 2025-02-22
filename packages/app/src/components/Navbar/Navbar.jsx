import { useLocation } from "react-router-dom";
import arrowBack from "../../assets/arrow-back.svg";
import propTypes from "prop-types";
import { Nav, List, ListItem, StyledNavLink } from "./Navbar.styled";

const PUZZLE_PATH_REGEX = new RegExp("^/puzzle/([1-5])$");

function Navbar() {
  const { state } = useLocation();

  const backLinkPath = state?.from.match(PUZZLE_PATH_REGEX) ? state.from : "/";

  return (
    <Nav>
      <List>
        <ListItem>
          <CustomNavLink to={backLinkPath} testid="back-link">
            <img src={arrowBack} alt="back" width="45" height="45" />
          </CustomNavLink>
        </ListItem>

        <ListItem>
          <CustomNavLink to="/scores">High scores</CustomNavLink>
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

CustomNavLink.propTypes = {
  to: propTypes.string.isRequired,
  testid: propTypes.string,
  children: propTypes.oneOfType([propTypes.string, propTypes.node]).isRequired,
};

export default Navbar;
