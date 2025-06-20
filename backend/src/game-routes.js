import { Router } from "express";
import jwt from "jsonwebtoken";
import * as handlers from "./game-handlers.js";

const router = Router();

router.get("/scores/:puzzleId", handlers.getHighScores);
router.post("/start", handlers.startGame);

router.use((req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);

  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (error, payload) => {
    if (error) return res.sendStatus(403);

    req.jwtPayload = payload;
    next();
  });
});

router.post("/check", handlers.checkGuess);
router.post("/scores", handlers.addHighScore);

export default router;
