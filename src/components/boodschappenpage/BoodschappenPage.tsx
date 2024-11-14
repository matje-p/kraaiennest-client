import Header from "./header/Header";
import BoodschappenTable from "./boodschappentable/BoodschappenTable";
import useHouseholdStore from "./header/householdselector/householdStore";
import styles from "./BoodschappenPage.module.scss";
import useUserData from "../../auth/useUserData";
import Spinner from "../spinner/Spinner";

const BoodschappenPage = () => {
  const { household: currentHousehold } = useHouseholdStore();
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData();

  if (userDataLoading) {
    return (
      <>
        <Header />
        <Spinner />
      </>
    );
  }

  if (userDataError || !userData) {
    // Added check for undefined userData
    return (
      <>
        <Header />
        <div className={styles.errorState}>Geen boodschappen gevonden</div>
      </>
    );
  }

  // At this point TypeScript knows userData is defined
  return (
    <>
      <Header />
      {!userData.boodschapsData?.length ? (
        <p className={styles.geenBoodschappen}>
          Geen boodschappen te doen voor dit huishouden
        </p>
      ) : (
        <BoodschappenTable />
        // <p> test </p>
      )}
    </>
  );
};

export default BoodschappenPage;
