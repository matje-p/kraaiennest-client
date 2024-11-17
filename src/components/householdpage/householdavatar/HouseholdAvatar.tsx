import useHouseholdStore from "../../boodschappenpage/header/householdselector/householdStore";
import Picture from "../../picture/picture";
import styles from "./HouseholdAvatar.module.scss";

const HouseholdAvatar = () => {
  const { household } = useHouseholdStore();
  console.log("household", household);

  return (
    <div>
      <div className={`${styles.centerContainer}`}>
        <Picture
          type="household"
          uuid={household?.householdUuid}
          size="large"
        />
      </div>
      <div className={`${styles.centerContainer}`}>
        <h1 className={`${styles.accountName}`}>{household?.name}</h1>
      </div>
    </div>
  );
};

export default HouseholdAvatar;
