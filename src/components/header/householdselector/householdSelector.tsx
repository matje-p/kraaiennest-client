import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./HouseholdSelector.module.scss";
import { households } from "../../../constants";
import usehouseholdStore from "./householdStore";

const HouseholdSelector: React.FC = () => {
  const { household, setHousehold } = usehouseholdStore();

  return (
    <select
      id="location-selector"
      value={household.name}
      onChange={(e) => setHousehold(households[e.target.value])}
      className={`form-select ${styles.HouseholdSelector}`}
    >
      {Object.values(households).map(({ name, fullname }) => (
        <option key={name} value={name}>
          {fullname}
        </option>
      ))}
    </select>
  );
};

export default HouseholdSelector;