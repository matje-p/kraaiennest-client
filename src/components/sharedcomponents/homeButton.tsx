import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const homeButton = () => {
  return (
    <>
      <Link to="/" className={`btn btn-primary ${styles.Button}`}>
        <i className="bi bi-house"></i>
      </Link>
    </>
  );
};

export default homeButton;
