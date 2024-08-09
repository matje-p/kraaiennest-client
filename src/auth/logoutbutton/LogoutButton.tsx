import { LogoutOptions, useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const handleLogout = () =>
    logout({
      returnTo: window.location.origin,
    } as LogoutOptions);
  return (
    <button className="dropdown-item" onClick={handleLogout}>
      <i className="bi bi-box-arrow-right me-2"></i>
      Log uit
    </button>
  );
};

export default LogoutButton;
