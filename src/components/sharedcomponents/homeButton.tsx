import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const homeButton = () => {
  return (
    <>
      <Link to="/" className={`btn btn-primary ${styles.Button}`}>
        <i className="bi bi-house fs-3"></i>
      </Link>
    </>
  );
};

export default homeButton;
