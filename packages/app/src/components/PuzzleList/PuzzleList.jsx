import usePuzzleImage from "../../hooks/usePuzzleImage";
import {
  Container,
  List,
  ListItem,
  StyledLink,
  Image,
  Characters,
} from "./PuzzleList.styled";

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

export default PuzzleList;
