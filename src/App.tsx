import { useEffect, useState } from "react";
import { useUser } from "./auth/userContext";
import useHouseholds from "./components/header/householdselector/useHouseholds";
import BoodschappenPage from "./components/body/booschappentable/BoodschappenPage";
import useHouseholdStore from "./components/header/householdselector/householdStore"; // Ensure this import is correct
import Spinner from "./components/spinner/Spinner";

const App = () => {
  const { user } = useUser();
  const { setHousehold } = useHouseholdStore();
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    data: households,
    isLoading,
    error,
  } = useHouseholds(user?.emailAddress || "No email found");

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

  console.log("Rendering BoodschappenPageOverall");
  console.log("VITE_API_URL", import.meta.env.VITE_API_URL);

  return <BoodschappenPage />;
};

export default App;
