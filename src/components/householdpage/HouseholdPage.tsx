import { useEffect } from "react";
import BackButton from "../profilepage/backbutton/BackButton";
import styles from "./HouseholdPage.module.scss"; // Adjust the import based on your file structure
import useHouseholdStore from "../boodschappenpage/header/householdselector/householdStore";
import HouseholdMemberTable from "./householdmembertable/HouseholdMemberTable";
import Picture from "../picture/picture";
import HouseholdAvatar from "./householdavatar/HouseholdAvatar";

const HouseholdPage = () => {
  // const { data: userData } = useUserData();
  const { household, setHousehold } = useHouseholdStore();

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
