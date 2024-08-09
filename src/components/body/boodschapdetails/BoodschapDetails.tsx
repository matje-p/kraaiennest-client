import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import useBoodschappen from "../booschappentable/useBoodschappen";
import transformDate from "./transformDate";
import Spinner from "../../spinner/Spinner";
import usehouseholdStore from "../../header/householdselector/householdStore";

interface BoodschapDetailsProps {
  boodschapId: string;
}

const BoodschapDetails: React.FC<BoodschapDetailsProps> = ({ boodschapId }) => {
  const { household } = usehouseholdStore();
  const { user } = useAuth0();
  const {
    data: boodschappen,
    error,
    isLoading,
  } = useBoodschappen(household.name);
  const boodschap = boodschappen?.find((b) => b.id === boodschapId);

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
          ? `Afgevinkt door ${user?.name} op ${dateDoneString}`
          : boodschap?.userLastChange &&
            boodschap?.userLastChange !== boodschap?.userAdded
          ? `Gewijzigd door ${boodschap?.userLastChange} op ${dateAddedString}`
          : `Toegevoegd door ${boodschap?.userAdded} op ${dateAddedString}`}
      </span>
    </div>
  );
};

export default BoodschapDetails;
