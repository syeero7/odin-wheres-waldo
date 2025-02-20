import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import arrowBack from "../assets/arrow-back.svg";
import propTypes from "prop-types";

function Navbar() {
  const { state } = useLocation();

  const puzzlePathRegex = new RegExp("^/puzzle/([1-5])$");
  const backLinkPath = state?.from.match(puzzlePathRegex) ? state.from : "/";

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
    <StyledNavLink data-testid={testid} to={to}>
      {children}
    </StyledNavLink>
  );
}

CustomNavLink.propTypes = {
  to: propTypes.string.isRequired,
  testid: propTypes.string,
  children: propTypes.oneOfType([propTypes.string, propTypes.node]).isRequired,
};

const Nav = styled.nav`
  box-shadow: 0 8px 6px -6px black;
  margin-bottom: 1em;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0.8em 0.5em;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  transition: transform 0.2s;

  &:has(a:hover),
  &:has(a:active) {
    box-shadow: 0 8px 6px -6px black;
    transform: scale(0.97);
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.5em;
  font-weight: 500;
  display: flex;
  align-content: center;
  white-space: nowrap;
  color: black;

  &:not(:has(img)) {
    padding: 0.6em 1em;
  }

  &:has(img) {
    padding: 0.25em 0 0.25em 0.5em;
  }
`;

export default Navbar;
