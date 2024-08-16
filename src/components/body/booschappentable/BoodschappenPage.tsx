import React from "react";
import BoodschapRow from "../boodschaprow/BoodschapRow";
import Spinner from "../../spinner/Spinner";
import useHouseholdStore from "../../header/householdselector/householdStore";
import useBoodschappen from "./useBoodschappen";
import Header from "../../header/headergrid/Header";

const BoodschappenPage: React.FC = () => {
  console.log("BoodschappenPage rendered");
  const { household } = useHouseholdStore();
  // const { refetch: refetchHouseholds } = useHouseholds();

  const {
    data: boodschappen,
    error,
    isLoading,
  } = useBoodschappen(household.householdName);
  console.log("BoodschappenPage boodschappen", boodschappen);
  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Header />
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
      {/* <button className="btn btn-primary" onClick={() => refetchHouseholds()}>
        Fetch households
      </button> */}
    </>
  );
};

export default BoodschappenPage;
