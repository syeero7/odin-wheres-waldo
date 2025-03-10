import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Fallback from "./components/Fallback";
import { images } from "./utils/images";

function App() {
  const { state } = useNavigation();
  const isLoading = state === "loading";

  return (
    <>
      <Navbar />
      {isLoading ? <Fallback /> : <Outlet context={images} />}
    </>
  );
}

export default App;
