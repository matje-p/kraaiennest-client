import { Link } from "react-router-dom";

const HouseHoldButton = () => {
  return (
    <Link to="/household" className="dropdown-item">
      <i className="bi bi-house me-2"></i>
      Naar huishouden
    </Link>
  );
};

export default HouseHoldButton;
