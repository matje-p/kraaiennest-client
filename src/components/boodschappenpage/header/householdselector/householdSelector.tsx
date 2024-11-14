import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./HouseholdSelector.module.scss";
import useHouseholdStore from "./householdStore";
import useUserData from "../../../../auth/useUserData";
import { Household } from "../../../../types/Types";

const HouseholdSelector: React.FC = () => {
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData();
  const { household, setHousehold } = useHouseholdStore();

  // Initialize with default household when data is loaded
  useEffect(() => {
    if (userData?.defaultHousehold && !household && userData.householdData) {
      const defaultHouseholdData = userData.householdData.find(
        (h: Household) => h.householdUuid === userData.defaultHousehold
      );

      if (defaultHouseholdData) {
        setHousehold({
          householdUuid: defaultHouseholdData.householdUuid,
          name: defaultHouseholdData.name,
        });
        console.log(
          "Initialized with default household:",
          defaultHouseholdData
        );
      }
    }
  }, [userData, household, setHousehold]);

  if (userDataLoading) {
    console.log("Household data is loading...");
    return <p>Loading...</p>;
  }

  if (userDataError) {
    console.error("Error loading households:", userDataError);
    return <p>Error loading households: {userDataError.message}</p>;
  }

  if (!userData?.householdData || userData.householdData.length === 0) {
    return <p>No households found</p>;
  }

  if (userData.householdData.length === 1) {
    return (
      <p className={`${styles.HouseholdSingle}`}>
        only one household
        {userData.householdData[0].name}
      </p>
    );
  }

  // Find currently selected household
  const currentHousehold = userData.householdData.find(
    (h: Household) => h.householdUuid === household?.householdUuid
  );

  return (
    <select
      id="location-selector"
      value={currentHousehold?.householdUuid || ""}
      onChange={(e) => {
        const selectedHousehold = userData.householdData.find(
          (h: Household) => h.householdUuid === e.target.value
        );
        console.log("User selected household:", selectedHousehold);

        if (selectedHousehold) {
          setHousehold({
            householdUuid: selectedHousehold.householdUuid,
            name: selectedHousehold.name,
          });
          console.log("Updated household in store:", selectedHousehold);
        }
      }}
      className={`form-select ${styles.HouseholdSelector}`}
      style={{ color: "black" }}
    >
      {userData.householdData.map((household: Household) => (
        <option key={household.householdUuid} value={household.householdUuid}>
          {household.name}
        </option>
      ))}
    </select>
  );
};

export default HouseholdSelector;
