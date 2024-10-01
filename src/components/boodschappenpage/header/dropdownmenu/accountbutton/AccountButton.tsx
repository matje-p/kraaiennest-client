import { Link } from "react-router-dom";
import { useUser } from "../../../../../auth/userContext";

const AccountButton = () => {
  const { user } = useUser();
  return (
    <Link to="/account" className="dropdown-item">
      <i className="bi bi-person-circle me-2"></i>
      {user?.firstName}
    </Link>
  );
};

export default AccountButton;
