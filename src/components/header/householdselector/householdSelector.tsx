import React, { ChangeEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./HouseholdSelector.module.scss";
import { households } from "../../../constants";
import usehouseholdStore from "./householdStore";

const HouseholdSelector: React.FC = () => {
  const { household, setHousehold } = usehouseholdStore();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = event.target.value;
    setHousehold(households[selectedKey]);
  };

  return (
    <select
      id="location-selector"
      value={household.name}
      onChange={handleChange}
      className={`form-select ${styles.HouseholdSelector}`}
    >
      {Object.entries(households).map(([key, household]) => (
        <option key={key} value={key}>
          {household.fullname}
        </option>
      ))}
    </select>
  );
};

export default HouseholdSelector;
