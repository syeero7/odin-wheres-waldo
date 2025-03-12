import { useState, useEffect, useRef } from "react";

const useImageElement = (condition) => {
  const [imageElement, setImageElement] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current && condition) setImageElement(imageRef.current);
  }, [condition]);

  return { imageRef, imageElement };
};

export default useImageElement;
