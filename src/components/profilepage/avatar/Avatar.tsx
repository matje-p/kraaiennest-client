import useUserData from "../../../auth/useUserData";
import Picture from "../../picture/picture";
import styles from "./Avatar.module.scss";

const Avatar = () => {
  const { data: userData } = useUserData();
  console.log("Avatar user", userData?.userUuid);

  return (
    <div>
      <div className={`${styles.centerContainer}`}>
        <Picture type="user" uuid={userData?.userUuid} size="large" />
      </div>
      <div className={`${styles.centerContainer}`}>
        <h1 className={`${styles.accountName}`}>{userData?.firstName}</h1>
      </div>
    </div>
  );
};

export default Avatar;
