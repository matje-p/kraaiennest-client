import React from "react";
import useBoodschap from "../../hooks/useBoodschap";
import transformDate from "../../utils/transformDate";
import { useAuth0 } from "@auth0/auth0-react";
import useBoodschappen from "../../hooks/useBoodschappen";

interface BoodschapDetailsProps {
  boodschapId: string;
}

const BoodschapDetails: React.FC<BoodschapDetailsProps> = ({ boodschapId }) => {
  const { user } = useAuth0();
  const { data: boodschappen, error, isLoading } = useBoodschappen();
  const boodschap = boodschappen?.find((b) => b.id === boodschapId);

  const dateAddedString = boodschap
    ? transformDate(boodschap.dateAdded)
    : "Date unknown";
  const dateDoneString = transformDate(new Date());

  return (
    <div className="col-12 col-md-8 col-lg-6">
      <span id="meta" className="text-muted">
        {boodschap?.done
          ? `Afgevinkt door ${user?.name} op ${dateDoneString}`
          : `Toegevoegd door ${boodschap?.userAdded} op ${dateAddedString}`}
      </span>
    </div>
  );
};

export default BoodschapDetails;
