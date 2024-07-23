import { useAuth0 } from "@auth0/auth0-react";
import useUpsertBoodschap from "../../hooks/useUpsertBoodschap";
import useChangeStore from "../../store";
import AddButton from "../addbutton/AddButton";
import LogoutButton from "../logoutbutton/LogoutButton";
import styles from "./Header.module.scss";

const Header = () => {
  console.log("Rendering BoodschappenHeader");
  const { user } = useAuth0();
  const changeLog = useChangeStore((state) => state.changeLog);
  const upsertBoodschap = useUpsertBoodschap();

  const handleUndo = () => {
    console.log("Undoing changes to boodschappen");
    console.log("Reverting boodschap: ");
    const lastBoodschap = changeLog[changeLog.length - 1]; // Get the most recent Boodschap
    if (lastBoodschap) {
      upsertBoodschap.mutate(lastBoodschap);
      console.log("Reverting boodschap: ", lastBoodschap);
    } else {
      console.log("No changes to undo");
    }
  };

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

            <button
              className="btn btn-primary btn-sm me-2"
              onClick={handleUndo}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
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
                <button className="dropdown-item" onClick={handleUndo}>
                  <i className="bi bi-arrow-counterclockwise"></i> Maak ongedaan
                </button>
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
