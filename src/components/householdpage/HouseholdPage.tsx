import { useParams } from "react-router-dom";
import useHouseholdStore from "../boodschappenpage/header/householdselector/householdStore";
import BackButton from "../profilepage/backbutton/BackButton";
import HouseholdAvatar from "./householdavatar/HouseholdAvatar";
import HouseholdMemberTable from "./householdmembertable/HouseholdMemberTable";
import styles from "./HouseholdPage.module.scss";
import { useEffect } from "react";
import useUserData from "../../auth/useUserData";

const HouseholdPage = () => {
  const { householdId } = useParams();
  const { data: userData } = useUserData();
  const { household, setHousehold } = useHouseholdStore();

  useEffect(() => {
    if (userData?.householdData && householdId) {
      // Find the household in userData that matches the URL parameter
      const selectedHousehold = userData.householdData.find(
        (h) => h.householdUuid === householdId
      );

      if (selectedHousehold) {
        setHousehold(selectedHousehold);
      }
    }
  }, [userData, householdId, setHousehold]);

  if (!household) {
    return <div>Loading household...</div>;
  }

  return (
    <div className={`container ${styles.profilePageBg}`}>
      <BackButton />
      <HouseholdAvatar />
      <HouseholdMemberTable />
    </div>
  );
};

export default HouseholdPage;
