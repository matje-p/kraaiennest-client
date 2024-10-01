import { useUser } from "../../../../auth/userContext";

const ProfileTableEmailAddress = () => {
  const { user } = useUser();
  return (
    <tr>
      <td>
        <i className={`bi bi-lg bi-envelope`}></i>
      </td>
      <td>
        <div>{user?.emailAddress}</div>
      </td>
    </tr>
  );
};

export default ProfileTableEmailAddress;
