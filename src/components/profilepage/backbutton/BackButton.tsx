import { Link } from "react-router-dom";
import styles from "./BackButton.module.scss";

const BackButton = () => {
  return (
    <Link to="/" className={`btn btn-primary ${styles.backButton}`}>
      <i className="bi bi-arrow-left"></i> Terug
    </Link>
  );
};

export default BackButton;
