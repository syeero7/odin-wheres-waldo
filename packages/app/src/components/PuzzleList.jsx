import { Link } from "react-router-dom";

import usePuzzleImage from "../hooks/usePuzzleImage";
import styled from "styled-components";

function PuzzleList() {
  const { images } = usePuzzleImage();

  return (
    <Container>
      <List>
        {images.map(({ id, src, characters }) => (
          <ListItem key={id}>
            <StyledLink to={`puzzle/${id}`} viewTransition>
              <Image src={src} alt={`puzzle #${id}`} width="450" />
              <Characters>
                {characters.map(({ id, name, src }) => (
                  <img key={id} src={src} alt={name} width="40" height="40" />
                ))}
              </Characters>
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 1em;

  @media screen and (min-width: 59em) {
    margin: 0 1em;
  }
`;

const List = styled.ul`
  display: grid;
  justify-items: center;
  gap: 1em;
  padding: 0.5em;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  @media screen and (min-width: 59em) {
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  }
`;

const ListItem = styled.li`
  & {
    margin: 0.2em;
    padding: 0.25em;
    border: hsla(0, 0%, 20%, 0.3) solid 1px;
    box-shadow: hsla(0, 0%, 20%, 0.4) 5px 5px 6px;
  }

  &:has(> a:hover),
  &:has(> a:active),
  &:has(> a:focus-visible) {
    background-color: #333;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  border-radius: 0.5em;
  transition: transform 0.2s;

  &:hover,
  &:active,
  &:focus-visible {
    outline: none;
    transform: scale(0.97);
    background-color: #fff;
  }
`;

const Image = styled.img`
  min-width: 280px;
  max-width: 100%;
  height: auto;
  border-radius: 0.5em 0.5em 0 0;
`;

const Characters = styled.div`
  display: flex;
  max-width: fit-content;
  padding: 0.5em;
  gap: 0.5em;
  background-color: #fff;
  border-radius: 0.5em;
`;

export default PuzzleList;
