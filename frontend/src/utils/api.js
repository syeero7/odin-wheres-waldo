import { getItem, SESSION_STORAGE_KEY } from "./sessionStorage";

const apiURL = import.meta.env.VITE_API_URL;
const DEFAULT_OPTIONS = { headers: { "Content-type": "application/json" } };

const handleFetch = async (path, options) => {
  if (options?.body) options.body = JSON.stringify(options.body);
  if (options?.headers) {
    options.headers = { ...DEFAULT_OPTIONS.headers, ...options.headers };
  }

  const url = `${apiURL}/game/${path}`;
  const response = await fetch(url, { ...DEFAULT_OPTIONS, ...options });

  if (!response.ok) throw response;
  return response;
};

const getHeader = () => {
  const { token } = getItem(SESSION_STORAGE_KEY) || {};
  return { Authorization: `Bearer ${token}` };
};

export const startPuzzle = async () => {
  return await handleFetch("start", { method: "POST" });
};

export const checkCharacterPosition = async (body) => {
  return await handleFetch("check", {
    method: "POST",
    headers: getHeader(),
    body,
  });
};

export const getHighScores = async (puzzleId) => {
  return await handleFetch(`scores/${puzzleId}`);
};

export const addHighScore = async (body) => {
  await handleFetch("scores", {
    method: "POST",
    headers: { ...getHeader() },
    body,
  });
};
