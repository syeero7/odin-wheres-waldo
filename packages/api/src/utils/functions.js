import { COORDINATE_THRESHOLD } from "./constants.js";

export const isWithinCoordinateThreshold = (x, y, originalX, originalY) => {
  x = Number(x);
  y = Number(y);

  return (
    Math.abs(originalX - x) <= COORDINATE_THRESHOLD &&
    Math.abs(originalY - y) <= COORDINATE_THRESHOLD
  );
};

export const isArraysMatch = (strArray = [], objArray = [], property) => {
  if (strArray.length !== objArray.length || !property) return false;

  const set = new Set(objArray.map((obj) => obj[property].toString()));
  return strArray.every((str) => set.has(str.toString()));
};
