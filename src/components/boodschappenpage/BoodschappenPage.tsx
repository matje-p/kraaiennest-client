import Header from "./header/Header";
import BoodschappenTable from "./boodschappentable/BoodschappenTable";
import styles from "./BoodschappenPage.module.scss";
import useUserData from "../../hooks/useUserData";
import Spinner from "../sharedcomponents/Spinner";

const BoodschappenPage = () => {
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData();

  if (userDataLoading || !userData) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (userDataError) {
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
      <BoodschappenTable />
    </>
  );
};

export default BoodschappenPage;
