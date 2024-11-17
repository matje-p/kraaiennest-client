import useUserData from "../../../../auth/useUserData";

const ProfileTableHouseholds = () => {
  const {
    data: userData,
    // isLoading: userLoading,
    // error: userDataError,
  } = useUserData();
  // const { data: households } = useHouseholds(user?.emailAddress || "");

  // Extract householdFullName and householdId from households if data is available
  const householdNames =
    userData?.householdData?.map((household) => ({
      name: household.name,
      householdUuid: household.householdUuid,
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
                {household.name}{" "}
                {household.householdUuid == userData?.defaultHousehold &&
                householdNames.length > 1
                  ? "(default)"
                  : ""}
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
