import { useUser } from "../../../../auth/userContext";

const ProfileTableName = () => {
  const { user } = useUser();
  return (
    <tr>
      <td>
        <i className={`bi bi-lg bi-person`}></i>
      </td>
      <td>
        <div>{user?.firstName?.concat(" ", user?.lastName || "") || ""}</div>
      </td>
    </tr>
  );
};

export default ProfileTableName;
