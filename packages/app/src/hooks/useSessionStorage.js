import { useEffect, useState } from "react";
import { getItem, setItem } from "../utils/sessionStorage";

const useSessionStorage = (key) => {
  const [value, setValue] = useState(() => getItem(key));

  useEffect(() => setItem(value, key), [key, value]);

  return [value, setValue];
};

export default useSessionStorage;
