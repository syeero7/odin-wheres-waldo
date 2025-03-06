import { useEffect, useRef } from "react";

const useOnFetcherDataChange = (callback, fetcherData) => {
  const previousData = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!fetcherData) return;

    const currentDataString = JSON.stringify(fetcherData);
    const previousDataString = previousData.current;

    if (currentDataString !== previousDataString) {
      savedCallback.current();
      previousData.current = currentDataString;
    }
  }, [fetcherData]);
};

export default useOnFetcherDataChange;
