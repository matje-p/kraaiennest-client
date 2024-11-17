import useHouseholdStore from "../boodschappenpage/header/householdselector/householdStore";
import BackButton from "../profilepage/backbutton/BackButton";
import HouseholdAvatar from "./householdavatar/HouseholdAvatar";
import HouseholdMemberTable from "./householdmembertable/HouseholdMemberTable";
import styles from "./HouseholdPage.module.scss"; // Adjust the import based on your file structure

const HouseholdPage = () => {
  // const { data: userData } = useUserData();
  const { household } = useHouseholdStore();

  console.log(household);

  return (
    <div className={`container ${styles.profilePageBg}`}>
      <BackButton />
      <HouseholdAvatar />
      <HouseholdMemberTable />
    </div>
  );
};

export default HouseholdPage;
