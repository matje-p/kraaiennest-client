import styles from "./Picture.module.scss";

interface ProfilePictureProps {
  type: "user" | "household";
  uuid?: string;
  size?: "small" | "medium" | "large" | "menu";
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
    console.log("[ProfilePicture] No UUID provided, rendering placeholder");
    return (
      <div
        className={`${styles.pic} ${styles[size]} ${styles.placeholder} ${className}`}
        aria-label="No profile picture available"
      />
    );
  }

  const startString = type == "user" ? "profilepic" : "householdpic";
  const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;

  const src = isProduction
    ? `https://${bucketName}.s3.amazonaws.com/${startString}_${uuid}.png`
    : `../../../public/images/${startString}_${uuid}.png`;

  // Log detailed information about the image URL construction
  console.log("[ProfilePicture] Image URL details:", {
    environment: isProduction ? "production" : "development",
    bucketName,
    type,
    uuid,
    startString,
    constructedUrl: src,
  });

  // Add error handling for the image load
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    console.error("[ProfilePicture] Failed to load image:", {
      src: e.currentTarget.src,
      type,
      uuid,
    });
  };

  return (
    <img
      className={`${styles.pic} ${styles[size]} ${className}`}
      src={src}
      alt="Profile Picture"
      onError={handleImageError}
    />
  );
};

export default ProfilePicture;
