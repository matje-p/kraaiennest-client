import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  useEffect(() => {
    let baseTitle = "Boodschappenlijstje";
    if (process.env.NODE_ENV === "development") {
      baseTitle += " [dev]";
    }
    document.title = baseTitle;
  }, []);

  console.log("Rendering App");
  console.log("VITE_API_URL", import.meta.env.VITE_API_URL);

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
