import { Navigate } from "react-router-dom";
import App from "./App";
import PuzzleList from "./components/PuzzleList";
import Puzzle, {
  actions as puzzleActions,
  loader as puzzleLoader,
} from "./components/Puzzle";
import HighScores, { loader as highScoreLoader } from "./components/HighScores";
import Fallback from "./components/Fallback/";
import ErrorPage from "./components/ErrorPage";
import GlobalStylesProvider from "./GlobalStylesProvider";

const routes = [
  {
    element: (
      <GlobalStylesProvider>
        <App />
      </GlobalStylesProvider>
    ),
    hydrateFallbackElement: (
      <GlobalStylesProvider>
        <Fallback />
      </GlobalStylesProvider>
    ),
    errorElement: (
      <GlobalStylesProvider>
        <ErrorPage />
      </GlobalStylesProvider>
    ),
    children: [
      {
        path: "/",
        element: <PuzzleList />,
      },
      {
        path: "puzzle/:puzzleId",
        element: <Puzzle />,
        loader: puzzleLoader,
        children: [
          { path: "start", action: puzzleActions.start },
          { path: "check", action: puzzleActions.check },
          { path: "save", action: puzzleActions.save },
        ],
      },
      {
        path: "high-scores",
        element: <Navigate to="/high-scores/1" replace />,
      },
      {
        path: "high-scores/:puzzleId",
        element: <HighScores />,
        loader: highScoreLoader,
        hydrateFallbackElement: <Fallback />,
      },
    ],
  },
];

export default routes;
