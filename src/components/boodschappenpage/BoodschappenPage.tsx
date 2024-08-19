import Header from "./header/headergrid/Header";
import BoodschappenTable from "./boodschappentable/BoodschappenTable";
import useBoodschappen from "./useBoodschappen";
import useHouseholdStore from "./header/householdselector/householdStore";
import styles from "./BoodschappenPage.module.scss";

const BoodschappenPage = () => {
  const { household } = useHouseholdStore();
  const { data: boodschappen } = useBoodschappen(household.householdName);
  console.log("BoodschappenTable boodschappen", boodschappen);

  return (
    <>
      <Header />

      {boodschappen?.length === 0 ? (
        <p className={`${styles.geenBoodschappen}`}>
          Geen boodschappen te doen voor dit huishouden
        </p>
      ) : (
        <BoodschappenTable />
      )}
    </>
  );
};

export default BoodschappenPage;
