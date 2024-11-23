import React, { useCallback } from "react";
import useChangeStore from "../../../stores/changeLogStore";
import useDeleteBoodschap from "../../../hooks/useDeleteBoodschap";
import useHouseholdStore from "../../../stores/householdStore";
import useUserData from "../../../hooks/useUserData";
import Spinner from "../../sharedcomponents/Spinner";

interface BoodschapCloseButtonProps {
  boodschapId: string | number;
}

const BoodschapCloseButton: React.FC<BoodschapCloseButtonProps> = ({
  boodschapId,
}) => {
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

  const { appendChangeLog } = useChangeStore();
  const { mutate: deleteBoodschap } = useDeleteBoodschap();

  const handleDeleteClick = useCallback(() => {
    console.log("Close button clicked");
    if (boodschap) {
      appendChangeLog(boodschap);
      deleteBoodschap({
        boodschapId: boodschap.boodschapId,
        userRemovedUuid: userData?.userUuid || "Unknown user",
        userRemovedFirstname: userData?.firstName || "Unknown user",
      });
    }
  }, [boodschap, deleteBoodschap, appendChangeLog, userData?.firstName]);

  if (userDataLoading) {
    return <Spinner />;
  }

  if (userDataError) {
    return <div>Error loading boodschap.</div>;
  }

  return (
    <button
      id="close"
      className="btn btn-close"
      onClick={handleDeleteClick}
    ></button>
  );
};

export default BoodschapCloseButton;
