import usePuzzleImages from "../../hooks/usePuzzleImages";
import {
  Container,
  List,
  ListItem,
  StyledLink,
  Characters,
} from "./PuzzleList.styled";

function PuzzleList() {
  const images = usePuzzleImages();

  return (
    <Container>
      <List>
        {images.map(({ id, srcSmall, characters }) => (
          <ListItem key={id}>
            <StyledLink to={`puzzle/${id}`} viewTransition>
              <img
                src={srcSmall}
                alt={`puzzle #${id}`}
                width="450"
                height="253"
              />
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

export default PuzzleList;
