import { useRouteError, Link } from "react-router-dom";
import { Container, ErrorContent } from "./ErrorPage.styled";

function ErrorPage() {
  const error = useRouteError();

  return (
    <Container>
      <div>
        <h1>Oops! Something went wrong!</h1>

        <ErrorContent>
          <p>
            {error.status} {error.statusText}
          </p>

          <p>
            Back to{" "}
            <Link viewTransition to="/">
              homepage
            </Link>
          </p>
        </ErrorContent>
      </div>
    </Container>
  );
}

export default ErrorPage;
