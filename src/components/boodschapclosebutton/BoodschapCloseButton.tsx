import React, { useCallback } from "react";
import useBoodschappen from "../../hooks/useBoodschappen";
import useDeleteBoodschap from "../../hooks/useDeleteBoodschap";
import useChangeStore from "../../store";

interface BoodschapCloseButtonProps {
  boodschapId: string;
}

const BoodschapCloseButton: React.FC<BoodschapCloseButtonProps> = ({
  boodschapId,
}) => {
  const { data: boodschappen, error, isLoading } = useBoodschappen();
  const boodschap = boodschappen?.find((b) => b.id === boodschapId);
  const { appendChangeLog } = useChangeStore();
  const { mutate: deleteBoodschap } = useDeleteBoodschap();
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
    return <div>Loading...</div>;
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
