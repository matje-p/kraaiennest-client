import { Link } from "react-router-dom";
import useUserData from "../../../../../auth/useUserData";

const AccountButton = () => {
  const {
    data: userData,
    isLoading: userLoading,
    error: userDataError,
  } = useUserData();
  return (
    <Link to="/account" className="dropdown-item">
      <i className="bi bi-person-circle me-2"></i>
      {userData?.firstName}
    </Link>
  );
};

export default AccountButton;
