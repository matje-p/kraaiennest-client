import { useUser } from "../../../../auth/userContext";
import useHouseholds from "../../../boodschappenpage/header/householdselector/useHouseholds";

const ProfileTableHouseholds = () => {
  const { user } = useUser();
  const { data: households } = useHouseholds(user?.emailAddress || "");

  // Extract householdFullName and householdId from households if data is available
  const householdNames =
    households?.map((household) => ({
      name: household.householdFullName,
      id: household.householdId, // Assuming there is a householdId in your data
    })) || [];

  // Determine the icon based on the number of households
  const householdIcon = householdNames.length > 1 ? "bi-houses" : "bi-house";

  return (
    <>
      <tr>
        <td>
          <i className={`bi bi-lg ${householdIcon}`}></i>
        </td>
        <td>
          {/* Loop through householdNames and display each as a clickable link */}
          {householdNames.length > 0 ? (
            householdNames.map((household, index) => (
              <div key={index}>
                {/* <Link to={`/household`} style={{ color: "black" }}> */}
                {household.name}
                {/* </Link>{" "} */}
              </div>
            ))
          ) : (
            <div>No households found</div>
          )}
        </td>
      </tr>
    </>
  );
};

export default ProfileTableHouseholds;
