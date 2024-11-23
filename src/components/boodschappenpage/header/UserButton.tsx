// import useUserData from "../../../hooks/useUserData";
// import styles from "./UserButton.module.scss";

// const UserButton: React.FC = () => {
//   const { data: userData } = useUserData();
//   const firstNameLowercase = userData?.firstName?.toLowerCase();
//   const isProduction = import.meta.env.MODE === "production";

//   const backgroundImage = isProduction
//     ? `url(https://${
//         import.meta.env.VITE_S3_BUCKET_NAME
//       }.s3.amazonaws.com/profilepic_${firstNameLowercase}.png)`
//     : `url(../../../public/images/profilepic_${firstNameLowercase}.png)`;

//   return (
//     <button
//       className={`btn btn-primary btn-sm me-2 ${styles.userButton}`}
//       style={{
//         backgroundImage,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//       aria-label="User Profile"
//     />
//   );
// };

// export default UserButton;
