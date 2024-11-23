import { useParams } from "react-router-dom";
import usehouseholdData from "../../hooks/useHouseholdData";
import Picture from "../sharedcomponents/Picture";
import SimpleHeader from "../sharedcomponents/SimpleHeader";
import HouseholdMemberTable from "./HouseholdMemberTable";
import styles from "./HouseholdPage.module.scss";

const HouseholdPage = () => {
  const { householdUuid } = useParams<{ householdUuid: string }>();
  const { data: householdData } = usehouseholdData(householdUuid || "");

  return (
    <div className={`container ${styles.profilePageBg}`}>
      <SimpleHeader settings={false} />
      <div>
        <div className={`${styles.centerContainer}`}>
          <Picture
            type="household"
            uuid={householdData?.householdUuid}
            size="large"
          />
        </div>
        <div className={`${styles.centerContainer}`}>
          <h1 className={`${styles.accountName}`}>
            {householdData?.householdFullName}
          </h1>
        </div>
      </div>
      <HouseholdMemberTable />
    </div>
  );
};

export default HouseholdPage;
