import styles from "./Avatar.module.scss";
import { useUser } from "../../../auth/userContext";

const Avatar = () => {
  const { user } = useUser();
  console.log("Avatar user", user);

  // Ensuring the firstName is lowercased
  const firstNameLowercase = user?.firstName?.toLowerCase();
  const firstName = user?.firstName;

  // Dynamically generating the image source
  const src = `../../../public/profilepic_${firstNameLowercase}.png`;

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
