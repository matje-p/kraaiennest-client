import { Link, useParams } from "react-router-dom";
import useHouseholdData from "../../hooks/useHouseholdData";
import TopSection from "../sharedcomponents/TopSection";
import styles from "./HouseholdPage.module.scss";
import Picture from "../sharedcomponents/Picture";

const HouseholdPage = () => {
  const { householdUuid } = useParams<{ householdUuid: string }>();
  const { data: householdData } = useHouseholdData(householdUuid || "");

  // No need to access [0] since householdData is already a single object
  const members = householdData?.householdMembers || [];
  return (
    <div className={`container ${styles.profilePageBg}`}>
      <TopSection type="household" />
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
    </div>
  );
};

export default HouseholdPage;
