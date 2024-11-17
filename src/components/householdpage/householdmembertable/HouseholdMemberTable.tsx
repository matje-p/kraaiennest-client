import useHouseholdStore from "../../boodschappenpage/header/householdselector/householdStore";
import styles from "./householdMemberTable.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import useHouseholdMembers from "./useHouseholdMembers"; // Updated import name to match the hook
import Picture from "../../picture/picture";

const ProfileTable = () => {
  const { household } = useHouseholdStore();
  const { data: householdMembers } = useHouseholdMembers(
    household?.householdUuid || ""
  ); // Fixed syntax and added fallback
  console.log("householdMembers", householdMembers);
  return (
    <div>
      <table className={`${styles.householdMemberTable} table`}>
        {/* <table className={`table`}> */}
        <tbody>
          {householdMembers?.map((member) => (
            <tr
              key={member.userUuid}
              className={`${styles.householdMemberTableRow}`}
            >
              <td style={{ width: "40px" }}>
                <Picture type="user" uuid={member.userUuid} size="small" />{" "}
              </td>
              <td className="align-middle">
                {member.firstName} {member.lastName || ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
