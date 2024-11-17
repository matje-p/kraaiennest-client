import useUserData from "../../../auth/useUserData";
import useHouseholdStore from "../../boodschappenpage/header/householdselector/householdStore";
import Picture from "../../picture/picture";
import styles from "./HouseholdAvatar.module.scss";

const HouseholdAvatar = () => {
  const { household } = useHouseholdStore();
  console.log("household", household);

  // Check the environment
  const isProduction = import.meta.env.MODE === "production";

  // Conditionally setting the image source based on environment
  const src = isProduction
    ? `https://${
        import.meta.env.VITE_S3_BUCKET_NAME
      }.s3.amazonaws.com/householdpic_${household?.householdUuid}.png`
    : `../../../public/images/householdpic_${household?.householdUuid}.png`;

  // Add error handling for missing image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "../../../public/images/default-householdavatar.png"; // Fallback image
  };

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
