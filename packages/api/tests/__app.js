import express from "express";
import cors from "cors";

import routes from "../src/routes/index.js";
import { corsOptions } from "../src/config/cors.js";
import { handleErrors } from "../src/middleware/handleErrors.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/game", routes.game);

app.use(handleErrors);

export default app;
