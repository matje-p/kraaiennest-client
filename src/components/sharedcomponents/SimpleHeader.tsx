import { Link, useNavigate } from "react-router-dom";
import styles from "./SimpleHeader.module.scss";

const SimpleHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Goes back one step in history
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <button
          onClick={handleBack}
          className={`btn btn-primary ${styles.Button}`}
        >
          <i className="bi bi-arrow-left fs-3"></i>
        </button>
        <div>
          <Link to="/" className={`btn btn-primary ${styles.Button}`}>
            <i className="bi bi-house fs-3"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
