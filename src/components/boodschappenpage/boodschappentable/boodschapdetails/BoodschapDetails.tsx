import React from "react";
import transformDate from "./transformDate";
import useHouseholdStore from "../../header/householdselector/householdStore";
import useUserData from "../../../../auth/useUserData";
import Spinner from "../../../spinner/Spinner";

interface BoodschapDetailsProps {
  boodschapId: number;
}

const BoodschapDetails: React.FC<BoodschapDetailsProps> = ({ boodschapId }) => {
  const { household: currentHousehold } = useHouseholdStore();
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData();

  if (!currentHousehold) {
    return <div>No household selected</div>;
  }

  // Filter boodschappen for current household
  const boodschappen = userData?.boodschapsData?.filter(
    (boodschap) => boodschap.householdUuid === currentHousehold.householdUuid
  );

  // Find specific boodschap
  const boodschap = boodschappen?.find((b) => b.boodschapId === boodschapId);

  const dateAddedString = boodschap
    ? transformDate(boodschap.dateAdded)
    : "Date unknown";
  const dateDoneString = transformDate(new Date());

  if (userDataLoading) {
    return <Spinner />;
  }

  if (userDataError) {
    return <div>Error loading boodschap.</div>;
  }

  return (
    <div className="col-12">
      <span id="meta" className="text-muted">
        {boodschap?.done
          ? `Afgevinkt door ${userData?.firstName} op ${dateDoneString}`
          : boodschap?.userChangedUuid &&
            boodschap?.userChangedUuid !== boodschap?.userAddedUuid
          ? `Gewijzigd door ${boodschap?.userChangedFirstname} op ${dateAddedString}`
          : `Toegevoegd door ${boodschap?.userAddedFirstname} op ${dateAddedString}`}
      </span>
    </div>
  );
};

export default BoodschapDetails;
