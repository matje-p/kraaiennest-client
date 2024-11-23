import { LogoutOptions, useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import useUnAddLatestBoodschap from "../../../hooks/useUnAddBoodschap";
import useUpsertBoodschap from "../../../hooks/useUpsertBoodschap";
import useUserData from "../../../hooks/useUserData";
import useChangeStore from "../../../stores/changeLogStore";
import useHouseholdStore from "../../../stores/householdStore";
import styles from "./DropdownMenu.module.scss";

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
        className={`btn btn-primary btn-sm ${styles.dropdownButton}`}
        type="button"
        id="mobileDropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-list fs-3"></i>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="mobileDropdownMenuButton"
      >
        <li>
          <Link to={`/user/${userData?.userUuid}`} className="dropdown-item">
            <i className="bi bi-person-circle fs-5 me-2"></i>
            {userData?.firstName}
          </Link>
        </li>
        <li>
          <>
            <button
              className="dropdown-item"
              onClick={handleUndo}
              disabled={!lastBoodschap}
            >
              <i className="bi bi-arrow-counterclockwise fs-5 me-1"></i> Maak
              ongedaan
            </button>
          </>
        </li>
        <li>
          <Link
            to={`/household/${household?.householdUuid}`}
            className="dropdown-item"
          >
            <i className="bi bi-house fs-5 me-2"></i>
            Naar huishouden
          </Link>
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right fs-5 me-2"></i>
            Log uit
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
