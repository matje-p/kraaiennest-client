import React from "react";
import BoodschapRow from "../boodschaprow/BoodschapRow";
import Spinner from "../../spinner/Spinner";
import usehouseholdStore from "../../header/householdselector/householdStore";
import useBoodschappen from "./useBoodschappen";
import Header from "../../header/headergrid/Header";

const BoodschappenPage: React.FC = () => {
  console.log("BoodschappenPage rendered");
  const { household } = usehouseholdStore();

  const {
    data: boodschappen,
    error,
    isLoading,
  } = useBoodschappen(household.name);
  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Header />
      <div className="container">
        <table className="table">
          <tbody>
            {boodschappen?.map((boodschap) => (
              <BoodschapRow key={boodschap.id} boodschapId={boodschap.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BoodschappenPage;
