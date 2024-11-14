import useUserData from "../../../../auth/useUserData";

const ProfileTableEmailAddress = () => {
  const {
    data: userData,
    // isLoading: userLoading,
    // error: userDataError,
  } = useUserData();
  return (
    <tr>
      <td>
        <i className={`bi bi-lg bi-envelope`}></i>
      </td>
      <td>
        <div>{userData?.emailAddress}</div>
      </td>
    </tr>
  );
};

export default ProfileTableEmailAddress;
