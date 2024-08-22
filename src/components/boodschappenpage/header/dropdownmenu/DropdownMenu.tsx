import { useUser } from "../../../../auth/userContext";
import LogoutButton from "./logoutbutton/LogoutButton";
import UndoButton from "./undobutton/UndoButton";
import styles from "./DropdownMenu.module.scss";

const DropdownMenu = () => {
  const { user } = useUser();
  return (
    <div className="dropdown">
      <button
        className={`btn btn-primary btn-sm ${styles.dropdownButton}`}
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
          <button className="dropdown-item">{user?.firstName}</button>
        </li>
        <li>
          <UndoButton />
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
