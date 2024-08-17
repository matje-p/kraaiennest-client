import React from "react";
import transformDate from "./transformDate";
import useHouseholdStore from "../../header/householdselector/householdStore";
import { useUser } from "../../../../auth/userContext";
import useBoodschappen from "../../useBoodschappen";
import Spinner from "../../../spinner/Spinner";

interface BoodschapDetailsProps {
  boodschapId: number;
}

const BoodschapDetails: React.FC<BoodschapDetailsProps> = ({ boodschapId }) => {
  const { household } = useHouseholdStore();
  const { user } = useUser();
  const {
    data: boodschappen,
    error,
    isLoading,
  } = useBoodschappen(household.householdName);
  const boodschap = boodschappen?.find((b) => b.boodschapId === boodschapId);

  const dateAddedString = boodschap
    ? transformDate(boodschap.dateAdded)
    : "Date unknown";
  const dateDoneString = transformDate(new Date());

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading boodschap.</div>;
  }

  return (
    <div className="col-12 col-md-8 col-lg-6">
      <span id="meta" className="text-muted">
        {boodschap?.done
          ? `Afgevinkt door ${user?.firstName} op ${dateDoneString}`
          : boodschap?.userChanged &&
            boodschap?.userChanged !== boodschap?.userAdded
          ? `Gewijzigd door ${boodschap?.userChanged} op ${dateAddedString}`
          : `Toegevoegd door ${boodschap?.userAdded} op ${dateAddedString}`}
      </span>
    </div>
  );
};

export default BoodschapDetails;
