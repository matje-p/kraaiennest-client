import React, { useCallback } from "react";
import useBoodschappen from "../booschappentable/useBoodschappen";
import useChangeStore from "../../header/undobutton/changeLogStore";
import useDeleteBoodschap from "./useDeleteBoodschap";
import Spinner from "../../spinner/Spinner";
import usehouseholdStore from "../../header/householdselector/householdStore";

interface BoodschapCloseButtonProps {
  boodschapId: string;
}

const BoodschapCloseButton: React.FC<BoodschapCloseButtonProps> = ({
  boodschapId,
}) => {
  const { household } = usehouseholdStore();
  const {
    data: boodschappen,
    error,
    isLoading,
  } = useBoodschappen(household.name);
  const boodschap = boodschappen?.find((b) => b.id === boodschapId);
  const { appendChangeLog } = useChangeStore();
  const { mutate: deleteBoodschap } = useDeleteBoodschap(household.name);
  // console.log(b);
  console.log("BoodschapId", boodschapId);

  const handleDeleteClick = useCallback(() => {
    console.log("Close button clicked");
    if (boodschap) {
      appendChangeLog(boodschap);
      deleteBoodschap(boodschap.id);
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
