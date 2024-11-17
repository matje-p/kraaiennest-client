import BackButton from "../profilepage/backbutton/BackButton";
import HouseholdAvatar from "./householdavatar/HouseHoldAvatar";
import styles from "./HouseholdPage.module.scss"; // Adjust the import based on your file structure

const HouseholdPage = () => {
  return (
    <div className={`container ${styles.profilePageBg}`}>
      <BackButton />
      <HouseholdAvatar />
      {/* <ProfileTable /> */}
    </div>
  );
};

export default HouseholdPage;
