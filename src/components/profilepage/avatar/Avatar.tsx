import styles from "./Avatar.module.scss";
import { useUser } from "../../../auth/userContext";

const Avatar = () => {
  const { user } = useUser();
  console.log("Avatar user", user);

  // Ensuring the firstName is lowercased
  const firstNameLowercase = user?.firstName?.toLowerCase();
  const firstName = user?.firstName;

  // Check the environment
  const isProduction = import.meta.env.MODE === "production";

  // Conditionally setting the image source based on environment
  const src = isProduction
    ? `https://${
        import.meta.env.VITE_S3_BUCKET_NAME
      }.s3.amazonaws.com/profilepic_${firstNameLowercase}.png`
    : `../../../public/images/profilepic_${firstNameLowercase}.png`;

  return (
    <div>
      <div className={`${styles.centerContainer}`}>
        <img
          className={`${styles.profilePic}`}
          src={src}
          alt="Profile Picture"
        />
      </div>
      <div className={`${styles.centerContainer}`}>
        <h1 className={`${styles.accountName}`}>{firstName}</h1>
      </div>
    </div>
  );
};

export default Avatar;
