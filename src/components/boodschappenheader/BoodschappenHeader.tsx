import { LogoutOptions, useAuth0 } from "@auth0/auth0-react";
import styles from "./BoodschappenHeader.module.scss";
import useAddBoodschap from "../../hooks/useAddBoodschap";
import useChangeStore from "../../store";

const BoodschappenHeader = () => {
  console.log("Rendering BoodschappenHeader");

  const { logout, user } = useAuth0();
  const handleLogout = () =>
    logout({
      returnTo: window.location.origin,
    } as LogoutOptions);
  const addBoodschap = useAddBoodschap();
  const newBoodschap = {
    item: "Voer boodschap in", // Customize as needed
    userAdded: String(user?.name), // Customize as needed
    userDone: "", // Customize as needed
    dateAdded: new Date(), // Assuming randDate() generates a date
    dateDone: new Date(), // Assuming randDate() generates a date
    done: false,
    id: Math.random().toString(36).substr(2, 9),
  };
  const handleAdd = () => {
    addBoodschap.mutate(newBoodschap);
  };

  // console.log(changeLog);

  return (
    <header
      className={`d-flex align-items-center bg-primary-subtle  ${styles.header}`}
    >
      <nav className="navbar navbar-expand pe-2 w-100 align-items-center">
        <div className="container justify-content-space-between flex-wrap align-items-center">
          <div>
            <i className="bi bi-cart4 fs-3"> </i>
            <strong className="navbar-brand object-fit-scale">
              Het kraaiennest
            </strong>
          </div>

          <div className="d-flex d-none d-md-block align-items-center">
            <button onClick={handleAdd} className="btn btn-primary btn-sm me-2">
              <i className="bi bi-plus"></i>
            </button>
            <button className="btn btn-primary btn-sm me-2">
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
          </div>

          <div className="dropdown d-block d-md-none align-items-center">
            <button onClick={handleAdd} className="btn btn-primary btn-sm me-2">
              <i className="bi bi-plus"></i>
            </button>
            <button
              className="btn btn-primary dropdown-toggle btn-sm"
              type="button"
              id="mobileDropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-three-dots-vertical"></i>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="mobileDropdownMenuButton"
            >
              <li>
                <button className="dropdown-item">{user?.name}</button>
              </li>

              <li>
                <button className="dropdown-item">
                  <i className="bi bi-arrow-counterclockwise"></i> Maak ongedaan
                </button>
              </li>

              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i> Log uit
                </button>
              </li>
            </ul>
          </div>

          <div className="dropdown d-none d-md-block">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle me-2"></i>
              {user?.name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Log uit
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default BoodschappenHeader;
