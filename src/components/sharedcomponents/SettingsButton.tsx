import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const SettingsButton = () => {
  return (
    <>
      <Link to="" className={`btn btn-primary ${styles.Button}`}>
        <i className="bi bi-gear fs-3"></i>
      </Link>
    </>
  );
};

export default SettingsButton;
