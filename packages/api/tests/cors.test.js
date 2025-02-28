import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "./__app.js";

const ALLOWED_ORIGIN = "https://www.testing.com";

beforeAll(() => {
  vi.stubEnv("SECRET", "test-secret");
  vi.stubEnv("ALLOWED_ORIGIN", ALLOWED_ORIGIN);
});
afterAll(() => {
  vi.unstubAllEnvs();
});

describe("CORS", () => {
  const ORIGIN_HEADER = "access-control-allow-origin";

  it("should allow requests form allowed origin", async () => {
    const response = await request(app)
      .post("/game/start")
      .set("Origin", ALLOWED_ORIGIN);

    expect(response.statusCode).toBe(200);
    expect(response.headers[ORIGIN_HEADER]).toBe(ALLOWED_ORIGIN);
  });

  it("should reject requests from not allowed origin", async () => {
    const response = await request(app)
      .post("/game/start")
      .set("Origin", "https://www.not-allowed.com");

    expect(response.statusCode).toBe(500);
    expect(response.headers[ORIGIN_HEADER]).toBeUndefined();
  });
});
