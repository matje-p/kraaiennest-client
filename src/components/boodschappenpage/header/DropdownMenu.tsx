import LogoutButton from "./LogoutButton";
import UndoButton from "./UndoButton";
import styles from "./DropdownMenu.module.scss";
import AccountButton from "./AccountButton";
import HouseHoldButton from "./HouseHoldButton";

const DropdownMenu = () => {
  return (
    <div className="dropdown">
      <button
        className={`btn btn-primary btn-sm ${styles.dropdownButton}`}
        type="button"
        id="mobileDropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-list"></i>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="mobileDropdownMenuButton"
      >
        <li>
          <AccountButton />
        </li>
        <li>
          <UndoButton />
        </li>
        <li>
          <HouseHoldButton />
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;