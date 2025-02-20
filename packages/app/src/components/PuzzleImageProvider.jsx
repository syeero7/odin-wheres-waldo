import { useState } from "react";
import propTypes from "prop-types";

import { images } from "../utils/images";
import { PuzzleImageContext } from "../hooks/usePuzzleImage";

function PuzzleImageProvider({ children }) {
  const [selectedImageId, setSelectedImageId] = useState(1);

  const selectedImage = images.find((img) => img.id == selectedImageId);

  const value = {
    selectedImage,
    images,
    setSelectedImageId,
  };

  return (
    <PuzzleImageContext.Provider value={value}>
      {children}
    </PuzzleImageContext.Provider>
  );
}

PuzzleImageProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.element),
    propTypes.element,
  ]).isRequired,
};

export default PuzzleImageProvider;
