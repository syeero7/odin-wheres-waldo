export const getImageDimensions = (element) => {
  const rect = element.getBoundingClientRect();
  const scaleX = element.naturalWidth / rect.width;
  const scaleY = element.naturalHeight / rect.height;

  return { rect, scaleX, scaleY };
};

export const getClickCoordinates = (event, imgRect) => {
  const displayX = event.clientX - imgRect.left;
  const displayY = event.clientY - imgRect.top;

  return { x: displayX, y: displayY };
};

export const getOriginalCoordinates = (displayCoords, scaleX, scaleY) => {
  const originalX = Math.round(displayCoords.x * scaleX);
  const originalY = Math.round(displayCoords.y * scaleY);

  return { x: originalX, y: originalY };
};

const getDisplayCoordinates = (element, originalCoords) => {
  const { scaleX, scaleY } = getImageDimensions(element);
  const displayX = Math.round(originalCoords.x / scaleX);
  const displayY = Math.round(originalCoords.y / scaleY);

  return { x: displayX, y: displayY };
};

export const getAdjustedCharacterCoordinates = (element, characters) => {
  if (!element) return [];

  return characters.map(({ id, ...coordinates }) => {
    const { x, y } = getDisplayCoordinates(element, { ...coordinates });
    return { id, x, y };
  });
};

export const addFoundStatusToPuzzleCharacters = (foundChars, puzzleChars) => {
  const foundCharIds = new Set(foundChars.map(({ id }) => id));

  return puzzleChars.map((char) => {
    return { ...char, hasFound: foundCharIds.has(char.id) };
  });
};

export const calculateScore = (seconds) => {
  const maxScore = 1000; // highest possible score (1 second)
  const penaltyPerSecond = 2;
  const score = Math.max(0, maxScore - seconds * penaltyPerSecond);
  return Math.round(score);
};

export const validatePuzzleId = (puzzleId) => {
  if (!puzzleId.match(/^[1-5]$/)) {
    throw new Response("", { status: 404, statusText: "Not Found" });
  }
};
