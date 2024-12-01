import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./HouseholdSelector.module.scss";
import useHouseholdStore from "../../../stores/householdStore";
import useUserData from "../../../hooks/useUserData";
import useUpdateDefaultHousehold from "../../../hooks/useUpdateDefaultHousehold";
import { Household } from "../../../types/Types";

const HouseholdSelector: React.FC = () => {
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData();
  const { household, setHousehold } = useHouseholdStore();
  const updateDefaultHousehold = useUpdateDefaultHousehold();

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

  const handleHouseholdChange = (selectedHouseholdUuid: string) => {
    const selectedHousehold = userData?.householdData.find(
      (h: Household) => h.householdUuid === selectedHouseholdUuid
    );

    if (selectedHousehold) {
      // Update the store
      setHousehold({
        householdUuid: selectedHousehold.householdUuid,
        name: selectedHousehold.name,
      });

      // Update the default household in the backend
      updateDefaultHousehold.mutate({
        householdUuid: selectedHousehold.householdUuid,
      });

      console.log("Updated household in store:", selectedHousehold);
    }
  };

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

  const currentHousehold = userData.householdData.find(
    (h: Household) => h.householdUuid === household?.householdUuid
  );

  return (
    <select
      id="location-selector"
      value={currentHousehold?.householdUuid || ""}
      onChange={(e) => handleHouseholdChange(e.target.value)}
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
