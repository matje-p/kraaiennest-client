import React, { useCallback } from "react";
import useBoodschappen from "../booschappentable/useBoodschappen";
import useChangeStore from "../../header/undobutton/changeLogStore";
import useDeleteBoodschap from "./useDeleteBoodschap";
import Spinner from "../../spinner/Spinner";
import useHouseholdStore from "../../header/householdselector/householdStore";
import { useUser } from "../../../auth/userContext";

interface BoodschapCloseButtonProps {
  boodschapId: string | number;
}

const BoodschapCloseButton: React.FC<BoodschapCloseButtonProps> = ({
  boodschapId,
}) => {
  const { household } = useHouseholdStore();
  const { user } = useUser();
  const {
    data: boodschappen,
    error,
    isLoading,
  } = useBoodschappen(household.householdName);
  const boodschap = boodschappen?.find((b) => b.boodschapId === boodschapId);
  const { appendChangeLog } = useChangeStore();
  const { mutate: deleteBoodschap } = useDeleteBoodschap(
    household.householdName
  );
  // console.log(b);
  console.log("BoodschapId", boodschapId);

  const handleDeleteClick = useCallback(() => {
    console.log("Close button clicked");
    if (boodschap) {
      appendChangeLog(boodschap);
      deleteBoodschap({
        boodschapId: boodschap.boodschapId,
        userRemoved: user?.firstName || "Unknown user",
      });
    }
  }, [boodschap, deleteBoodschap, appendChangeLog]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
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
