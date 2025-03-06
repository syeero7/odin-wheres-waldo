import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  justify-content: center;
  gap: 0.5em;
  margin: 1em;

  & > header {
    display: flex;
    gap: 1.5em;
    align-items: center;
  }
`;

export const CharacterList = styled.ul`
  display: flex;
  gap: 0.6em;
`;

export const Character = styled.figure`
  opacity: var(--opacity);
  max-width: clamp(35px, 100%, 60px);
  height: auto;
  text-align: center;
  gap: 0.5em;
  display: grid;

  & > img {
    max-width: 100%;
    height: auto;
  }
`;

export const Output = styled.output`
  font-size: 1.5em;
  min-height: 1.5em;
  max-height: fit-content;
  padding: 0.5em;
  color: var(--output);
  text-align: center;
  flex: 1;
`;

export const ImageContainer = styled.div`
  display: inline-block;
  isolation: isolate;
  position: relative;
`;

export const PuzzleImage = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  cursor: url("/src/assets/crosshair.svg"), crosshair;
`;

export const MarkersContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  min-width: 100%;
  min-height: 100%;
  z-index: 1;
  background-image: url("path/image.png");
`;

export const Marker = styled.div`
  color: hsl(from var(--green) h s 60%);
  text-align: center;
  line-height: 2em;
  font-size: 1.5em;
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  width: 2em;
  height: 2em;
  left: var(--marker-left);
  top: var(--marker-top);
  background-color: hsla(0, 0%, 20%, 0.5);
  z-index: 2;
`;
