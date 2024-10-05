import { useEffect, useState } from "react";
import { useUser } from "./auth/userContext";
import { Outlet } from "react-router-dom";
import Spinner from "./components/spinner/Spinner";
import useHouseholds from "./components/boodschappenpage/header/householdselector/useHouseholds";
import useHouseholdStore from "./components/boodschappenpage/header/householdselector/householdStore";
const App = () => {
  const { user } = useUser();
  const { setHousehold } = useHouseholdStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // Triggering a rebuild

  const {
    data: households,
    isLoading,
    error,
  } = useHouseholds(user?.emailAddress || "No email found");

  useEffect(() => {
    let baseTitle = "Boodschappenlijstje";
    if (process.env.NODE_ENV === "development") {
      baseTitle += " [dev]";
    }
    document.title = baseTitle;
  }, []);

  useEffect(() => {
    if (!isInitialized && households && households.length > 0) {
      let defaultHousehold;

      if (households.length === 1 || !user?.defaultHousehold) {
        defaultHousehold = households[0];
      } else {
        defaultHousehold = households.find(
          (h) => h.householdName === user.defaultHousehold
        );
      }

      if (defaultHousehold) {
        setHousehold(defaultHousehold);
        setIsInitialized(true);
      }
    }
  }, [households, user?.defaultHousehold, isInitialized, setHousehold]);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading households: {error.message}</p>;

  if (!isInitialized) return <Spinner />;

  console.log("Rendering App");
  console.log("VITE_API_URL", import.meta.env.VITE_API_URL);

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
