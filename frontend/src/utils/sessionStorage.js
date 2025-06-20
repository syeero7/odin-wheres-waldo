export const SESSION_STORAGE_KEY = "Token";

export const getItem = (key) => {
  try {
    const item = window.sessionStorage.getItem(key);
    return item == null ? null : JSON.parse(item);
  } catch (error) {
    console.error(error);
  }
};

export const setItem = (value, key) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = (key) => {
  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
