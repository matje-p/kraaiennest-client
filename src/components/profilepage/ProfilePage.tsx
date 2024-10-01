import Avatar from "./avatar/Avatar";
import BackButton from "./backbutton/BackButton";
import styles from "./ProfilePage.module.scss"; // Adjust the import based on your file structure
import ProfileTable from "./profiletable/ProfileTable";

const ProfilePage = () => {
  return (
    <div className={`container ${styles.profilePageBg}`}>
      <BackButton />
      <Avatar />
      <ProfileTable />
    </div>
  );
};

export default ProfilePage;
