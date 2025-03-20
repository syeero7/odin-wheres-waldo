import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import routes from "./routes";
import GlobalStyles from "./GlobalStyles";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </StrictMode>
);
