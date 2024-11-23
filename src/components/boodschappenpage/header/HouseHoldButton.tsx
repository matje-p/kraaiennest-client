import { Link } from "react-router-dom";
import useHouseholdStore from "../../../stores/householdStore";

const HouseHoldButton = () => {
  const { household } = useHouseholdStore(); // Move the hook inside the component

  return (
    <Link
      to={`/household/${household?.householdUuid}`}
      className="dropdown-item"
    >
      <i className="bi bi-house me-2"></i>
      Naar huishouden
    </Link>
  );
};

export default HouseHoldButton;
