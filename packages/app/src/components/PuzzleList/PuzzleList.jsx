import usePuzzleImages from "../../hooks/usePuzzleImages";
import {
  Container,
  List,
  ListItem,
  StyledLink,
  Characters,
  Attribution,
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

      <Attribution>
        <p>
          puzzle images by{" "}
          <a href="https://wallpaperaccess.com">wallpaperaccess</a>
        </p>
        <p>
          icons by{" "}
          <a href="https://www.svgrepo.com" target="_blank">
            SVG Repo
          </a>
        </p>
      </Attribution>
    </Container>
  );
}

export default PuzzleList;
