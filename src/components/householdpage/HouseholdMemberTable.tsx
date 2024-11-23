import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useParams } from "react-router-dom";
import useHouseholdData from "../../hooks/useHouseholdData";
import Picture from "../sharedcomponents/Picture";
import styles from "./HouseholdMemberTable.module.scss";

const ProfileTable = () => {
  const { householdUuid } = useParams<{ householdUuid: string }>();
  const { data: householdData } = useHouseholdData(householdUuid || "");

  // No need to access [0] since householdData is already a single object
  const members = householdData?.householdMembers || [];

  return (
    <div>
      <table className={`${styles.householdMemberTable} table`}>
        <tbody>
          {members.map((member) => (
            <tr key={member.userUuid}>
              <td className="col-1 align-middle">
                <Link
                  to={`/user/${member.userUuid}`}
                  className={styles.memberLink}
                >
                  <Picture type="user" uuid={member.userUuid} size="small" />
                </Link>
              </td>
              <td className="col-11 align-middle">
                <Link
                  to={`/user/${member.userUuid}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {member.firstName} {member.lastName || ""}
                    </div>
                    <i
                      className={`bi bi-lg bi-chevron-right fs-4 ${styles.chevron}`}
                    ></i>
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
