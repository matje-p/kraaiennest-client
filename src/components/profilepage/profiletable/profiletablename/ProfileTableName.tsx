import useUserData from "../../../../auth/useUserData";

const ProfileTableName = () => {
  const {
    data: userData,
    isLoading: userLoading,
    error: userDataError,
  } = useUserData();
  return (
    <tr>
      <td>
        <i className={`bi bi-lg bi-person`}></i>
      </td>
      <td>
        <div>
          {userData?.firstName?.concat(" ", userData?.lastName || "") || ""}
        </div>
      </td>
    </tr>
  );
};

export default ProfileTableName;
