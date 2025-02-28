import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  afterEach,
} from "vitest";
import request from "supertest";
import app from "./__app.js";
import * as db from "../src/utils/queries.js";
import { JWT_KEYS } from "../src/utils/constants.js";
import jwt from "jsonwebtoken";

beforeAll(() => {
  vi.stubEnv("SECRET", "test-secret");
});
afterAll(() => {
  vi.unstubAllEnvs();
});

vi.mock("../src/utils/queries.js", () => ({
  getHighScores: vi.fn(),
  getHighestScore: vi.fn(),
  insertHighScore: vi.fn(),
  getPositionsByPuzzleId: vi.fn(),
  getPosition: vi.fn(),
}));

const createToken = (data = {}) => {
  const payload = { [JWT_KEYS.START_TIMESTAMP]: Math.floor(Date.now() / 1000) };
  return jwt.sign({ ...payload, ...data }, "test-secret");
};

const setupHighScoreTestMocks = (advancedTime, position, puzzleCharIds) => {
  const highestScore = { _min: { time: advancedTime + 1000 } };
  const charIds = puzzleCharIds.map((num) => ({ characterId: num }));
  vi.mocked(db.getPositionsByPuzzleId).mockReturnValue(charIds);
  vi.mocked(db.getHighestScore).mockReturnValue(highestScore);
  vi.mocked(db.getPosition).mockReturnValue(position);
};

describe("GET /game/scores", () => {
  const highScores = [
    { id: 1, puzzleId: 1, name: "test1", time: 500 },
    { id: 2, puzzleId: 1, name: "test2", time: 650 },
  ];
  vi.mocked(db.getHighScores).mockReturnValue(highScores);

  it("should return a list of high scores", async () => {
    const response = await request(app).get("/game/scores");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ scores: highScores });
  });
});

describe("POST /game/start", () => {
  it("generates and returns token", async () => {
    const response = await request(app).post("/game/start");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ token: expect.anything() });
  });
});

describe("POST /game/scores", () => {
  afterEach(() => {
    vi.mocked(db.insertHighScore).mockClear();
  });
  const data = { time: 700, name: "test" };
  const token = createToken();

  it("inserts data and returns 204", async () => {
    const response = await request(app)
      .post("/game/scores")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    expect(db.insertHighScore).toHaveBeenCalledWith(data.name, data.time);
    expect(response.statusCode).toBe(204);
  });

  it("returns 400 and prevents data insertion for invalid request", async () => {
    const response = await request(app)
      .post("/game/scores")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...data, name: "" });

    expect(response.statusCode).toBe(400);
    expect(db.insertHighScore).not.toHaveBeenCalled();
  });

  it("returns 401 for missing token", async () => {
    const response = await request(app).post("/game/scores");

    expect(response.statusCode).toBe(401);
  });

  it("returns 403 for invalid token", async () => {
    const response = await request(app)
      .post("/game/scores")
      .set("Authorization", `Bearer ${token}x`);

    expect(response.statusCode).toBe(403);
  });
});

describe("POST /game/check", () => {
  const token = createToken();
  const data = { x: 1, y: 2, puzzleId: 2, characterId: 1 };

  it("returns correct: false for incorrect guess", async () => {
    vi.mocked(db.getPosition).mockReturnValue({ x: 100, y: 200 });
    const response = await request(app)
      .post("/game/check")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ correct: false, puzzleCompleted: false });
  });

  it("returns highestScore: true for new high score", async () => {
    vi.useFakeTimers();
    const FIVE_MILLISECOND = 5000;
    const CHAR_POSITION = { x: 10, y: 10 };
    const PUZZLE_CHAR_IDS = [1, 2, 3];
    const token = createToken({ [JWT_KEYS.FOUND_CHARACTER_IDS]: "2,3" });
    vi.advanceTimersByTime(FIVE_MILLISECOND);
    setupHighScoreTestMocks(FIVE_MILLISECOND, CHAR_POSITION, PUZZLE_CHAR_IDS);

    const response = await request(app)
      .post("/game/check")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      token: expect.anything(),
      ...CHAR_POSITION,
      correct: true,
      puzzleCompleted: true,
      foundCharacterIds: PUZZLE_CHAR_IDS,
      highScore: { highestScore: true, time: FIVE_MILLISECOND / 1000 },
    });

    vi.useRealTimers();
  });

  it("returns 401 for missing token", async () => {
    const response = await request(app).post("/game/check");

    expect(response.statusCode).toBe(401);
  });

  it("returns 403 for invalid token", async () => {
    const response = await request(app)
      .post("/game/check")
      .set("Authorization", `Bearer ${token}x`);

    expect(response.statusCode).toBe(403);
  });
});
