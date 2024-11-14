import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useUserData from "./auth/useUserData";

const App = () => {
  const {
    data: userData,
    // isLoading: userLoading,
    // error: userDataError,
  } = useUserData();

  useEffect(() => {
    let baseTitle = "Boodschappenlijstje";
    if (process.env.NODE_ENV === "development") {
      baseTitle += " [dev]";
    }
    document.title = baseTitle;
  }, []);

  // if (!isInitialized) return <Spinner />;

  console.log("Rendering App");
  console.log("VITE_API_URL", import.meta.env.VITE_API_URL);
  console.log("User", userData?.emailAddress);

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
