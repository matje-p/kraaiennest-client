import { useParams } from "react-router-dom";
import useHouseholdData from "../../hooks/useHouseholdData";
import useProfilePageData from "../../hooks/useProfilePageData";
import Picture from "./Picture";
import SimpleHeader from "./SimpleHeader";
import styles from "./TopSection.module.scss";

interface TopSectionProps {
  type: "household" | "user";
}

const TopSection: React.FC<TopSectionProps> = ({ type }) => {
  const { householdUuid, userUuid } = useParams<{
    householdUuid?: string;
    userUuid?: string;
  }>();

  const { data: householdData } = useHouseholdData(
    type === "household" ? householdUuid || "" : ""
  );
  const { data: userData } = useProfilePageData(
    type === "user" ? userUuid || "" : ""
  );

  const title =
    type === "household"
      ? householdData?.householdFullName
      : userData?.firstName;

  console.log("householdUuid", householdUuid);
  console.log("type", type);

  const uuid = type === "household" ? householdUuid : userData?.userUuid;

  return (
    <div>
      <SimpleHeader />
      <div>
        <div className={styles.centerContainer}>
          <Picture type={type} uuid={uuid} size="large" />
        </div>
        <div className={styles.centerContainer}>
          <h1 className={styles.accountName}>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
