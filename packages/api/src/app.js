import express from "express";
import cors from "cors";

import routes from "./routes/index.js";
import { corsOptions } from "./config/cors.js";
import { handleErrors } from "./middleware/handleErrors.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/game", routes.game);

app.use(handleErrors);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
