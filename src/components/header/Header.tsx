import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Header.module.scss";
import AddButton from "./addbutton/AddButton";
import UndoButton from "./undobutton/UndoButton";
import LogoutButton from "./logoutbutton/LogoutButton";

const Header = () => {
  console.log("Rendering BoodschappenHeader");
  const { user } = useAuth0();

  return (
    <header
      className={`d-flex align-items-center bg-primary-subtle  ${styles.header}`}
    >
      <nav className="navbar navbar-expand pe-2 w-100 align-items-center">
        <div className="container justify-content-space-between flex-wrap align-items-center">
          <div>
            <i className="bi bi-cart4 fs-3"> </i>
            <strong className="navbar-brand object-fit-scale">
              Mas des Lucioles
            </strong>
          </div>

          <div className="d-flex d-none d-md-block align-items-center">
            <AddButton />
            <UndoButton buttonType="full" />
          </div>

          <div className="dropdown d-block d-md-none align-items-center">
            <AddButton />

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
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
