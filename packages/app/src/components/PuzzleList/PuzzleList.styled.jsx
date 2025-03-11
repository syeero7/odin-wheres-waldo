import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 1em;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 59em) {
    margin: 0.5em 1em;
  }
`;

export const List = styled.ul`
  --min-col-size: 450px;

  display: grid;
  justify-items: center;
  gap: 1em;
  padding: 0.5em;
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(var(--min-col-size), 100%), 1fr)
  );
`;

export const ListItem = styled.li`
  margin: 0.2em;
  border: 1px solid hsla(from var(--black-olive) h s l / 0.3);
  box-shadow: hsla(from var(--black-olive) h s l / 0.4) 5px 5px 6px;

  &:has(> a:hover),
  &:has(> a:active),
  &:has(> a:focus-visible) {
    border-color: transparent;
    box-shadow: none;
  }

  & a > img {
    max-width: 100%;
    height: auto;
  }
`;

export const StyledLink = styled(Link)`
  display: inline-block;
  transition: transform 0.2s;

  &:hover,
  &:active,
  &:focus-visible {
    outline: none;
    transform: scale(0.97);
    box-shadow: 0 0 6px 6px var(--black-olive);
    background-color: var(--snow);
  }
`;

export const Characters = styled.div`
  display: flex;
  max-width: fit-content;
  padding: 0.5em;
  gap: 0.5em;
  background-color: var(--snow);
  border-radius: var(--radius);
`;

export const Attribution = styled.div`
  margin-top: auto;
  min-width: 100%;
  display: grid;
  justify-content: space-around;
  font-family: var(--ff-serif);
  color: hsla(from var(--black-olive) h s l / 0.9);
  gap: 0.5em;
  font-size: 0.9em;
  padding-top: 0.5em;

  @media screen and (min-width: 28.125em) {
    grid-auto-flow: column;
    gap: 1em;
  }
`;
