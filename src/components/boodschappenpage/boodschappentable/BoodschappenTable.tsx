import React from "react";
import useHouseholdStore from "../header/householdselector/householdStore";
import Spinner from "../../spinner/Spinner";
import BoodschapRow from "./boodschaprow/BoodschapRow";
import useUserData from "../../../auth/useUserData";

const BoodschappenTable: React.FC = () => {
  console.log("BoodschappenTable rendered");
  const { household: currentHousehold } = useHouseholdStore();
  console.log("currentHousehold: ", currentHousehold);
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData();

  const boodschappen = userData?.boodschapsData?.filter(
    (boodschap) => boodschap.householdUuid === currentHousehold?.householdUuid
  );
  console.log("currentHousehold: ", currentHousehold);

  console.log("BoodschappenTable boodschappen", boodschappen);
  if (userDataLoading) return <Spinner />;
  if (userDataError) return <p>{userDataError.message}</p>;
  console.log("Current household: ", currentHousehold);
  console.log("Boodschappen: ", boodschappen);

  return (
    <>
      <div className="container">
        <table className="table">
          <tbody>
            {boodschappen?.map((boodschap) => (
              <BoodschapRow
                key={boodschap.boodschapId}
                boodschapId={boodschap.boodschapId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BoodschappenTable;
