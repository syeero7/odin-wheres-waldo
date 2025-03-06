import { useRef, useEffect } from "react";
import { useBeforeUnload } from "react-router-dom";

const useBeforeLeave = (callback) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useBeforeUnload(() => {
    savedCallback.current();
  });

  useEffect(() => {
    return () => savedCallback.current();
  }, []);
};

export default useBeforeLeave;
