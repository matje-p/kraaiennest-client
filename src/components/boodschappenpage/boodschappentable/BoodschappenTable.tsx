import React from "react";
import useHouseholdStore from "../header/householdselector/householdStore";
import useBoodschappen from "../useBoodschappen";
import Spinner from "../../spinner/Spinner";
import BoodschapRow from "./boodschaprow/BoodschapRow";

const BoodschappenTable: React.FC = () => {
  console.log("BoodschappenTable rendered");
  const { household } = useHouseholdStore();

  const {
    data: boodschappen,
    error,
    isLoading,
  } = useBoodschappen(household.householdName);
  console.log("BoodschappenTable boodschappen", boodschappen);
  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

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
