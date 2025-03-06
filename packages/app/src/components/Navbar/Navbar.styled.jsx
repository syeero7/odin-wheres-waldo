import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  box-shadow: 0 8px 6px -6px var(--black-olive);
  margin-bottom: 1em;
`;

export const List = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
  margin-right: 0.5em;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  transition: transform 0.2s;
`;

export const StyledNavLink = styled(NavLink)`
  font-size: 1.2em;
  font-weight: 500;
  display: flex;
  align-content: center;
  white-space: nowrap;
  color: var(--black);

  & > img {
    max-width: 1.5em;
    max-height: 1.5em;
  }
`;
