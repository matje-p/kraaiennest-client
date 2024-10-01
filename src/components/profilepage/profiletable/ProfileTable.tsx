import styles from "./ProfileTable.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure Bootstrap icons are imported
import ProfileTableName from "./profiletablename/ProfileTableName";
import ProfileTableEmailAddress from "./profileetableamailaddress/ProfileTableEmailAddress";
import ProfileTableHouseholds from "./profiletablehouseholds/ProfileTableHouseholds";

const ProfileTable = () => {
  return (
    <div>
      <table className={`${styles.profileTable} table`}>
        <tbody>
          <ProfileTableName />
          <ProfileTableEmailAddress />
          <ProfileTableHouseholds />
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
