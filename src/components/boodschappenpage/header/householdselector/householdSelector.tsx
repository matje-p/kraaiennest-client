import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./HouseholdSelector.module.scss";
import useHouseholds from "./useHouseholds";
import useHouseholdStore from "./householdStore";
import { useUser } from "../../../../auth/userContext";

const HouseholdSelector: React.FC = () => {
  const { user } = useUser();
  const { household, setHousehold } = useHouseholdStore();

  const {
    data: households,
    isLoading,
    error,
  } = useHouseholds(user?.emailAddress || "No email found");

  console.log("User's default household:", user?.defaultHousehold);
  console.log("Fetched households:", households);

  if (isLoading) {
    console.log("Household data is loading...");
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error loading households:", error);
    return <p>Error loading households: {error.message}</p>;
  }

  console.log("Selected household in store:", household);

  if (households?.length === 0) {
    return <p>No households found</p>;
  }

  if (households?.length === 1) {
    // Directly display the household name if there's only one household
    return (
      <p className={`${styles.HouseholdSingle}`}>
        {household.householdFullName}
      </p>
    );
  }

  return (
    <select
      id="location-selector"
      value={household.householdName}
      onChange={(e) => {
        const selectedHousehold = households?.find(
          (h) => h.householdName === e.target.value
        );
        console.log("User selected household:", selectedHousehold);

        if (selectedHousehold) {
          setHousehold(selectedHousehold);
          console.log("Updated household in store:", selectedHousehold);
        }
      }}
      className={`form-select ${styles.HouseholdSelector}`}
      style={{ color: "black" }}
    >
      {households?.map(({ householdName, householdFullName }) => (
        <option key={householdName} value={householdName}>
          {householdFullName}
        </option>
      ))}
    </select>
  );
};

export default HouseholdSelector;
