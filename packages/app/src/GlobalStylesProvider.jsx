import propTypes from "prop-types";
import * as styled from "styled-components";

function GlobalStylesProvider({ children }) {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
}

const gradient = styled.keyframes`
  0% {
    --background-position: 0% 50%;
  }
  50% {
    --background-position: 100% 50%;
  }
  100% {
    --background-position: 0% 50%;
  }
`;

const GlobalStyles = styled.createGlobalStyle`
  @property --background-position {
    syntax: "<percentage>+";
    inherits: false;
    initial-value: 0% 50%;
  }

  *::after,
  *::before,
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --ff-serif: Garamond, Georgia, serif;
    --ff-sans-serif: Verdana, Tahoma, sans-serif;

    --snow: hsl(345, 100%, 99%);
    --black: hsl(105, 100%, 1%);
    --black-olive: hsl(96, 5%, 19%);
    --red: hsl(0, 72.2%, 50.6%);
    --green: hsl(142, 76.2%, 36.3%);
    --radius: 0.6rem;

    --background-image: linear-gradient(
      320deg,
      var(--snow),
      hsl(from var(--black-olive) h s 30%)
    );
    --background-size: 240% 240%;
    --background-animation: ${gradient} 8s ease infinite;
  }

  li {
    list-style: none;
  }

  :any-link {
    font-family: var(--ff-serif);
    text-decoration: none;
  }

  button {
    font-size: inherit;
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
  }

  body {
    font-family: var(--ff-sans-serif);
    background-color: var(--snow);
    color: var(--black);

    > #root {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
  }
`;

GlobalStylesProvider.propTypes = {
  children: propTypes.element.isRequired,
};

export default GlobalStylesProvider;
