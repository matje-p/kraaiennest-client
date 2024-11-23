import { Link, useParams } from "react-router-dom";
import useProfilePageData from "../../hooks/useProfilePageData";
import useUserData from "../../hooks/useUserData";
import Picture from "../sharedcomponents/Picture";
import SimpleHeader from "../sharedcomponents/SimpleHeader";
import styles from "./UserPage.module.scss";

const UserPage = () => {
  const { data: userData } = useUserData();
  const { userUuid } = useParams<{ userUuid: string }>();
  const { data: otherUserData } = useProfilePageData(userUuid || "");

  const ownProfile = userUuid === userData?.userUuid;
  const userPageData = ownProfile ? userData : otherUserData;

  const householdNames =
    userPageData?.householdData?.map((household) => ({
      name: household.name,
      householdUuid: household.householdUuid,
    })) || [];

  const householdIcon = householdNames.length > 1 ? "bi-houses" : "bi-house";

  return (
    <div className={`container ${styles.profilePageBg}`}>
      <SimpleHeader settings={false} />
      {/* <SimpleHeader settings={ownProfile} /> */}
      <div>
        <div className={`${styles.centerContainer}`}>
          <Picture type="user" uuid={userPageData?.userUuid} size="large" />
        </div>
        <div className={`${styles.centerContainer}`}>
          <h1 className={`${styles.accountName}`}>{userPageData?.firstName}</h1>
        </div>
      </div>
      <div>
        <table className={`${styles.profileTable} table`}>
          <tbody>
            <tr>
              <td className="col-1">
                <i className="bi bi-lg bi-person"></i>
              </td>
              {/* Removed stray 's' character */}
              <td className="col-11">
                <div>
                  {userPageData?.firstName?.concat(
                    " ",
                    userPageData?.lastName || ""
                  ) || ""}
                </div>
              </td>
            </tr>
            <tr>
              <td className="col-1">
                <i className="bi bi-lg bi-envelope"></i>
              </td>
              <td className="col-11">
                <div>{userPageData?.emailAddress}</div>
              </td>
            </tr>
            <tr>
              <td className="col-1">
                <i className={`bi bi-lg ${householdIcon}`}></i>
              </td>
              <td className="col-11">
                {householdNames.length > 0 ? (
                  householdNames.map((household, index) => (
                    <div key={index}>
                      <Link
                        to={`/household/${household.householdUuid}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <div className="d-flex justify-content-between">
                          <div>
                            {household.name}{" "}
                            {userUuid === userData?.userUuid &&
                            household.householdUuid ===
                              userPageData?.defaultHousehold &&
                            householdNames.length > 1
                              ? "(default)"
                              : ""}
                          </div>
                          <i
                            className={`bi bi-lg bi-chevron-right ${styles.chevron}`}
                          ></i>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>No households found</div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
