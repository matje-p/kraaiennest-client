import useUserData from "../../../auth/useUserData";
import styles from "./HouseholdAvatar.module.scss";

const HouseholdAvatar = () => {
  const {
    data: userData,
    // isLoading: userLoading,
    // error: userDataError,
  } = useUserData();

  // Using userUuid for image identification
  const userUuid = userData?.userUuid;
  const firstName = userData?.firstName;

  // Check the environment
  const isProduction = import.meta.env.MODE === "production";

  // Conditionally setting the image source based on environment
  const src = isProduction
    ? `https://${
        import.meta.env.VITE_S3_BUCKET_NAME
      }.s3.amazonaws.com/profilepic_${userUuid}.png`
    : `../../../public/images/profilepic_${userUuid}.png`;

  // Add error handling for missing image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "../../../public/images/default-avatar.png"; // Fallback image
  };

  return (
    <div>
      <div className={`${styles.centerContainer}`}>
        <img
          className={`${styles.profilePic}`}
          src={src}
          alt={`${firstName}'s Profile Picture`}
          onError={handleImageError}
        />
      </div>
      <div className={`${styles.centerContainer}`}>
        <h1 className={`${styles.accountName}`}>{firstName}</h1>
      </div>
    </div>
  );
};

export default HouseholdAvatar;
