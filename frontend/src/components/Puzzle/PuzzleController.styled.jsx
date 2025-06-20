import { Form } from "react-router-dom";
import { styled, keyframes } from "styled-components";

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.span`
  --spinner-max: 48px;
  --spinner-min: 42px;

  position: relative;
  border-radius: 50%;
  width: var(--spinner-max);
  height: var(--spinner-max);
  display: inline-block;
  animation: ${rotate} 1s linear infinite;
  background: linear-gradient(
    0deg,
    hsla(from var(--black) h s l / 0.3) 33%,
    var(--black-olive) 100%
  );

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: var(--spinner-min);
    height: var(--spinner-min);
    border-radius: 50%;
    background: var(--snow);
  }
`;

export const Menu = styled.div`
  position: absolute;
  min-width: 120px;
  pointer-events: auto;
  top: var(--menu-top);
  left: var(--menu-left);
  z-index: 4;
  animation: ${fadeInScale} 0.2s ease-in-out;
  background: var(--snow);
  border-radius: 0 0.2em 0.2em;
  border: 1px solid var(--black-olive);
  box-shadow: 0 2px 10px hsla(from var(--black-olive) h s l / 0.3);
  padding: 0.3em;

  & > form {
    display: grid;
    gap: 0.3em;

    & > button {
      transition: background-color 0.25s;
      background-color: var(--snow);
      padding: 0.35em 0.8em;

      &:hover,
      &:active,
      &:focus-visible {
        background-color: var(--black-olive);
        color: var(--snow);
      }
    }

    & > button[aria-label="close"] {
      display: inline-block;
      position: absolute;
      text-align: center;
      top: 0;
      right: 0;
      background: none;
      border: none;
      padding: 4px;
      border-radius: 50%;
      transform: translate(10px, -100%);

      &:hover,
      &:active,
      &:focus-visible {
        transform: translate(10px, -100%) scale(1.1);
      }
    }

    & > button:disabled {
      pointer-events: none;
      border-color: hsla(from var(--black-olive) h s l / 0.3);
    }
  }
`;

export const Backdrop = styled.div`
  top: 0;
  left: 0;
  display: flex;
  box-shadow: 0 0 6px 6px hsla(from var(--black-olive) h s l / 0.5);
  background-image: var(--background-image);
  background-size: var(--background-size);
  animation: var(--background-animation);
  background-position: var(--background-position);

  justify-content: center;
  align-items: center;
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  z-index: 4;
`;

export const StartButtonContainer = styled.div`
  display: flex;
  gap: 2em;
  justify-content: center;
  padding: 2em;
  min-height: 120px;
  min-width: 200px;

  background-color: var(--snow);
  border-radius: var(--radius);
  box-shadow: 0 0 3px 3px hsla(from var(--black-olive) h s l / 0.5);
`;

export const Button = styled.button`
  padding: 0.8em 2.4em;
  border-radius: var(--radius);
  background: var(--black);
  color: var(--snow);
  font-size: 1.1em;
  transition: background-color 0.25s;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;

  &:active,
  &:hover,
  &:focus-visible {
    outline: none;
    color: var(--snow);
    background-color: hsla(from var(--black-olive) h s l / 0.9);
    border-color: hsla(from var(--black-olive) h s l / 0.9);
  }
`;

export const ScoreContainer = styled.div`
  box-shadow: 0 0 3px 3px hsla(from var(--black-olive) h s l / 0.5);
  max-width: 40ch;
  display: grid;
  background-color: var(--snow);
  border-radius: var(--radius);
  padding: 2em;
  gap: 1em;
  align-content: center;
`;
export const Score = styled.div`
  display: grid;
  gap: 0.3em;
  text-align: center;
  font-size: 1.3em;

  & > p:nth-child(2),
  & > p:last-child {
    color: var(--black-olive);
    font-size: 0.85em;
  }
`;

export const HighScoreForm = styled(Form)`
  display: grid;
  gap: 0.8em;

  & > label {
    display: grid;
    gap: 0.3em;

    & > input {
      min-width: 100%;
      font-size: 1.25em;
      padding: 0.2em;
    }
  }
`;
