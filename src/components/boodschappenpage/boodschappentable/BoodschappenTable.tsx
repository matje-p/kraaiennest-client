import React, { useState, useEffect } from "react";
import useHouseholdStore from "../header/householdselector/householdStore";
import Spinner from "../../spinner/Spinner";
import BoodschapRow from "./boodschaprow/BoodschapRow";
import useUserData from "../../../auth/useUserData";
import { Boodschap } from "../../../types/Types";

const getBoodschappenOrder = (boodschappen: Boodschap[] | undefined) => {
  if (!boodschappen) return [];

  // Separate into done and not done
  const notDone = boodschappen
    .filter((boodschap) => !boodschap.done)
    .sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );

  const done = boodschappen
    .filter((boodschap) => boodschap.done)
    .sort(
      (a, b) =>
        new Date(b.dateDone || 0).getTime() -
        new Date(a.dateDone || 0).getTime()
    );

  return [...notDone, ...done].map((b) => b.boodschapId);
};

const BoodschappenTable: React.FC = () => {
  const { household: currentHousehold } = useHouseholdStore();
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData();

  // State to store the order of boodschappen IDs
  const [boodschappenOrder, setBoodschappenOrder] = useState<number[]>([]);

  // Update order when household changes
  useEffect(() => {
    if (userData?.boodschapsData && currentHousehold) {
      const householdBoodschappen = userData.boodschapsData.filter(
        (boodschap) =>
          boodschap.householdUuid === currentHousehold.householdUuid
      );
      setBoodschappenOrder(getBoodschappenOrder(householdBoodschappen));
    }
  }, [currentHousehold?.householdUuid, userData?.boodschapsData]);

  if (userDataLoading) return <Spinner />;
  if (userDataError) return <p>{userDataError.message}</p>;

  return (
    <div className="container">
      {boodschappenOrder.length > 0 ? (
        <table className="table">
          <tbody>
            {boodschappenOrder.map((boodschapId) => (
              <BoodschapRow key={boodschapId} boodschapId={boodschapId} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center py-4">
          Geen boodschappen voor dit huishouden
        </p>
      )}
    </div>
  );
};

export default BoodschappenTable;
