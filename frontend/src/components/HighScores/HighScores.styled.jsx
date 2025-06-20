import styled, { keyframes } from "styled-components";

const dropdown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-1em);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: grid;
  justify-items: center;
  align-content: center;

  & > header {
    display: grid;
    margin: 1em;
    justify-items: center;
    position: relative;
    padding-bottom: 1.5em;
    margin-bottom: 60px;
  }

  & > p {
    font-size: 1.1em;
    margin: 1em 0.5em;
    text-align: center;
    text-wrap: balance;
  }
`;

export const Filter = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(100%);

  &:has(ul) > button {
    border-radius: var(--radius) var(--radius) 0 0;
  }

  & > button {
    display: flex;
    gap: 1em;
    padding: 0.6em 1em;
    margin-left: -1px;
    margin-top: -1px;
    position: relative;
    top: 1px;
    left: 1px;
    border-radius: var(--radius);
    border: 1px solid var(--black-olive);
    background: var(--black);
    color: var(--snow);
    z-index: 2;

    & > span {
      transition: opacity, transform 0.2s;
    }

    &:active > span {
      opacity: 0.1;
      transform: rotate(90deg);
    }

    &:active,
    &:hover,
    &:focus-visible {
      outline: none;
      color: var(--snow);
      background-color: hsla(from var(--black-olive) h s l / 0.9);
      border-color: hsla(from var(--black-olive) h s l / 0.9);
    }
  }

  & > ul {
    display: grid;

    & > li {
      margin-left: -1px;
      margin-top: -1px;
      position: relative;
      top: 1px;
      left: 1px;
      border: 1px solid var(--black-olive);
      animation: ${dropdown} 0.2s;
      display: grid;

      & > :any-link {
        padding: 0.5em 1em;
        background-color: var(--snow);
        color: var(--black);
        font-size: 1.1em;
      }

      & > a:active,
      & > a:hover,
      & > a:focus-visible {
        outline: none;
        color: var(--snow);
        background-color: var(--black-olive);
        border-color: var(--black-olive);
      }
    }
  }
`;

export const Table = styled.table`
  margin: 1em 0.5em;
  border-collapse: collapse;
  box-shadow: 0 0 20px hsla(from var(--black) h s l / 0.2);
  background-color: var(--snow);

  & caption {
    padding: 1em;
    text-align: center;
    font-size: 1.3em;
  }

  & th,
  & td {
    padding: 0.5em 1em;
    border: 1px solid var(--black);
  }

  & tr:nth-of-type(even) {
    background-color: hsl(from var(--black-olive) h s 90%);
  }
`;
