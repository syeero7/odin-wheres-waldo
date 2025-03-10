import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;

  & h1 {
    margin-block: 1em;
    font-size: 2.5em;
    text-wrap: balance;
  }
`;
export const ErrorContent = styled.article`
  display: grid;
  gap: 1em;
  font-weight: 500;
  font-size: 1.2em;

  & p:first-child {
    color: hsl(from var(--black-olive) h s 30%);
  }

  & :any-link {
    color: hsl(231, 90%, 31%);
    text-decoration: underline;
  }
`;
