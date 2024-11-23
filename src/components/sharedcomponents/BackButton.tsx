import { useNavigate } from "react-router-dom";
import styles from "./Button.module.scss";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Goes back one step in history
  };

  return (
    <button onClick={handleBack} className={`btn btn-primary ${styles.Button}`}>
      <i className="bi bi-arrow-left fs-3"></i>
    </button>
  );
};

export default BackButton;
