import { Link } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";

const AccountButton = () => {
  const { data: userData } = useUserData();
  return (
    <Link to={`/user/${userData?.userUuid}`} className="dropdown-item">
      <i className="bi bi-person-circle me-2"></i>
      {userData?.firstName}
    </Link>
  );
};

export default AccountButton;
