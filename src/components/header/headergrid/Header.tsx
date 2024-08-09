import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Header.module.scss";
import HouseholdSelector from "../householdselector/householdSelector";
import AddButton from "../addbutton/AddButton";
import UndoButton from "../undobutton/UndoButton";
import LogoutButton from "../../../auth/logoutbutton/LogoutButton";

const Header = () => {
  console.log("Rendering BoodschappenHeader");
  const { user } = useAuth0();

  return (
    <header className={`${styles.header}`}>
      <nav className="navbar navbar-expand pe-2">
        <div className="container text-center">
          {/* Left hand side of the header */}
          <div className="col-8 col-lg-6">
            <div className="d-flex align-items-baseline">
              <i className="bi bi-cart4 fs-3 me-3"> </i>
              <strong className="fs-5 me-2 d-none d-md-block">
                Boodschappenlijstje
              </strong>
              <div>
                <HouseholdSelector />
              </div>
            </div>
          </div>
          {/* Right hand side of the header */}
          <div className="col-4 col-lg-6 d-flex align-items-center justify-content-end justify-content-md-between">
            {/* The two buttons: add and undo  */}
            <div className="d-flex me-2 d-none d-md-block  align-items-center ">
              <AddButton />
              <UndoButton buttonType="full" />
            </div>
            {/* The dropdown */}
            <div className="dropdown d-none d-md-block">
              <button
                // className={`btn dropdown-toggle ${styles.dropdownFullscreen}`}
                className={`btn dropdown-toggle`}
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle me-2"></i>
                {user?.name}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </div>

            <div className="d-block d-md-none">
              <AddButton />
            </div>
            <div className="dropdown d-block d-md-none ">
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
                  <UndoButton buttonType="mobile" />
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
