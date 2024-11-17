import React, { useMemo } from "react";
import useHouseholdStore from "../header/householdselector/householdStore";
import Spinner from "../../spinner/Spinner";
import BoodschapRow from "./boodschaprow/BoodschapRow";
import useUserData from "../../../auth/useUserData";
import { Boodschap } from "../../../types/Types";

const sortBoodschappen = (boodschappen: Boodschap[] | undefined) => {
  if (!boodschappen) return [];

  // Separate into done and not done
  const notDone = boodschappen.filter((boodschap) => !boodschap.done);
  const done = boodschappen.filter((boodschap) => boodschap.done);

  // Sort not done by dateAdded (most recent first)
  const sortedNotDone = notDone.sort((a, b) => {
    const dateA = new Date(a.dateAdded).getTime();
    const dateB = new Date(b.dateAdded).getTime();
    return dateB - dateA;
  });

  // Sort done by dateDone (most recent first)
  const sortedDone = done.sort((a, b) => {
    const dateA = new Date(a.dateDone || 0).getTime();
    const dateB = new Date(b.dateDone || 0).getTime();
    return dateB - dateA;
  });

  return [...sortedNotDone, ...sortedDone];
};

const BoodschappenTable: React.FC = () => {
  const { household: currentHousehold } = useHouseholdStore();
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData();

  // Only resort when boodschappen data or household changes
  const householdBoodschappen = useMemo(
    () =>
      userData?.boodschapsData?.filter(
        (boodschap) =>
          boodschap.householdUuid === currentHousehold?.householdUuid
      ),
    [currentHousehold?.householdUuid]
  );

  // Only resort when filtered boodschappen change
  const sortedBoodschappen = useMemo(
    () => sortBoodschappen(householdBoodschappen),
    [householdBoodschappen]
  );

  if (userDataLoading) return <Spinner />;
  if (userDataError) return <p>{userDataError.message}</p>;

  return (
    <div className="container">
      <table className="table">
        <tbody>
          {sortedBoodschappen.map((boodschap) => (
            <BoodschapRow
              key={boodschap.boodschapId}
              boodschapId={boodschap.boodschapId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoodschappenTable;
