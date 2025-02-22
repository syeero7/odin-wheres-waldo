import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  box-shadow: 0 8px 6px -6px black;
  margin-bottom: 1em;

  &:has(a:hover),
  &:has(a:active) {
    background-image: linear-gradient(to top, hsla(0, 0%, 20%, 0.5), #ddd);
  }
`;

export const List = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0.8em 0.5em;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  transition: transform 0.2s;

  &:has(a:hover),
  &:has(a:active) {
    transform: scale(0.95);
  }
`;

export const StyledNavLink = styled(NavLink)`
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
