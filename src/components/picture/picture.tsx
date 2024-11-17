import styles from "./Picture.module.scss";

interface ProfilePictureProps {
  type: "user" | "household";
  uuid?: string; // Made optional
  size?: "small" | "medium" | "large";
  className?: string;
}

const ProfilePicture = ({
  type,
  uuid,
  size = "medium",
  className = "",
}: ProfilePictureProps) => {
  const isProduction = import.meta.env.MODE === "production";

  // Early return if no uuid
  if (!uuid) {
    return (
      <div
        className={`${styles.pic} ${styles[size]} ${styles.placeholder} ${className}`}
        aria-label="No profile picture available"
      />
    );
  }

  const startString = type == "user" ? "profilepic" : "householdpic";

  const src = isProduction
    ? `https://${
        import.meta.env.VITE_S3_BUCKET_NAME
      }.s3.amazonaws.com/${startString}_${uuid}.png`
    : `../../../public/images/${startString}_${uuid}.png`;

  return (
    <img
      className={`${styles.pic} ${styles[size]} ${className}`}
      src={src}
      alt="Profile Picture"
      // onError={(e) => {
      //   console.error("Failed to load profile picture:", {
      //     uuid,
      //     src,
      //     timestamp: new Date().toISOString(),
      //   });
      //   // Optional: Set a default fallback image
      //   // e.currentTarget.src = '/path/to/default/avatar.png';
      // }}
    />
  );
};

export default ProfilePicture;
