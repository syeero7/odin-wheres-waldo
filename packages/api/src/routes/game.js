import { Router } from "express";
import {
  startGamePost,
  getHighScores,
  addHighScore,
  checkGuessPost,
} from "../controllers/gameController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/scores", getHighScores);

router.post("/start", startGamePost);
router.post("/check", verifyToken, checkGuessPost);
router.post("/scores", verifyToken, addHighScore);

export default router;
