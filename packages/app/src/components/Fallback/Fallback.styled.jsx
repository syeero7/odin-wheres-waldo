import styled, { keyframes } from "styled-components";

const loader = keyframes`
  0% {
    box-shadow: 10px 0 var(--snow), 20px 0 var(--snow);
  }
  50% {
    box-shadow: 10px 0 var(--black), 20px 0 var(--snow);
  }
  100% {
    box-shadow: 10px 0 var(--black), 20px 0 var(--black);
  }
`;

export const Container = styled.div`
  margin-top: -1em;
  background-color: var(--snow);
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-duration: 4s;
`;

export const Loader = styled.div`
  color: var(--black);
  display: inline-block;
  position: relative;
  font-size: 3.5em;
  padding-right: 5px;
  font-family: var(--ff-serif);
  font-weight: 500;
  -webkit-text-stroke: 1px hsla(from var(--black-olive) h s l / 0.9);

  &::after {
    content: "";
    width: 5px;
    height: 5px;
    background: var(--black-olive);
    position: absolute;
    bottom: 10px;
    right: -5px;
    animation: ${loader} 1s linear infinite;
  }
`;
