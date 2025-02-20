import { createContext, useContext } from "react";

export const PuzzleImageContext = createContext({
  selectedImage: {
    id: 0,
    src: "",
    characters: [{ id: 0, name: "", src: "" }],
  },
  setSelectedImageId: () => {},
  images: [
    {
      id: 0,
      src: "",
      characters: [{ id: 0, name: "", src: "" }],
    },
  ],
});

const usePuzzleImage = () => useContext(PuzzleImageContext);

export default usePuzzleImage;
