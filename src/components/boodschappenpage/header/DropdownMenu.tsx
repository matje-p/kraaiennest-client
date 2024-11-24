import { LogoutOptions, useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import useUnAddLatestBoodschap from "../../../hooks/useUnAddBoodschap";
import useUpsertBoodschap from "../../../hooks/useUpsertBoodschap";
import useUserData from "../../../hooks/useUserData";
import useChangeStore from "../../../stores/changeLogStore";
import useHouseholdStore from "../../../stores/householdStore";
import styles from "./DropdownMenu.module.scss";
import Picture from "../../sharedcomponents/Picture";

const DropdownMenu = () => {
  const { data: userData } = useUserData();
  const { household } = useHouseholdStore(); // Move the hook inside the component
  const { logout } = useAuth0();
  const handleLogout = () =>
    logout({
      returnTo: window.location.origin,
    } as LogoutOptions);

  const { changeLog, removeLastChange } = useChangeStore();
  const upsertBoodschap = useUpsertBoodschap();
  const unAddBoodschap = useUnAddLatestBoodschap();
  const lastBoodschap = changeLog[changeLog.length - 1]; // Get the most recent Boodschap

  const handleUndo = () => {
    if (lastBoodschap) {
      // If the boodschap has an Id, it is not a newly added one (boodschaps only get IDs on the backend)
      if ("boodschapId" in lastBoodschap) {
        console.log("Undoing changes/deletion");
        upsertBoodschap.mutate(lastBoodschap);
      } else {
        console.log("Undoing add action");
        unAddBoodschap.mutate();
      }
      removeLastChange();
    } else {
      console.log("No changes to undo");
    }
  };

  return (
    <div className="dropdown">
      <button
        className={`btn btn-primary btn-sm d-flex align-items-center ${styles.dropdownButton}`}
        type="button"
        id="mobileDropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-list fs-3"></i>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end p-2"
        style={{ minWidth: "240px" }}
        aria-labelledby="mobileDropdownMenuButton"
      >
        <li className="my-n1">
          <Link
            to={`/user/${userData?.userUuid}`}
            className={`dropdown-item d-flex align-items-center py-1 ${styles.dropdownItem}`}
          >
            <div className="d-flex align-items-center w-100">
              <div className="col-3 d-flex justify-content-center">
                <Picture type="user" uuid={userData?.userUuid} size="menu" />
              </div>
              <div className="col-9">
                <span>{userData?.firstName}</span>
              </div>
            </div>
          </Link>
        </li>
        <li className="my-n1">
          <button
            className={`dropdown-item d-flex align-items-center py-1 ${styles.dropdownItem}`}
            onClick={handleUndo}
            disabled={!lastBoodschap}
          >
            <div className="d-flex align-items-center w-100">
              <div className="col-3 d-flex justify-content-center">
                <i className="bi bi-arrow-counterclockwise fs-5"></i>
              </div>
              <div className="col-9">
                <span>Maak ongedaan</span>
              </div>
            </div>
          </button>
        </li>
        <li className="my-n1">
          <Link
            to={`/household/${household?.householdUuid}`}
            className={`dropdown-item d-flex align-items-center py-1 ${styles.dropdownItem}`}
          >
            <div className="d-flex align-items-center w-100">
              <div className="col-3 d-flex justify-content-center">
                <i className="bi bi-house fs-5"></i>
              </div>
              <div className="col-9">
                <span>Naar huishouden</span>
              </div>
            </div>
          </Link>
        </li>
        <li className="my-n1">
          <button
            className={`dropdown-item d-flex align-items-center py-1 ${styles.dropdownItem}`}
            onClick={handleLogout}
          >
            <div className="d-flex align-items-center w-100">
              <div className="col-3 d-flex justify-content-center">
                <i className="bi bi-box-arrow-right fs-5"></i>
              </div>
              <div className="col-9">
                <span>Log uit</span>
              </div>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};
export default DropdownMenu;
