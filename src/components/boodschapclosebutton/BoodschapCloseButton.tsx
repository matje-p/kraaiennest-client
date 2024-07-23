import React, { useCallback } from "react";
import useBoodschap from "../../hooks/useBoodschap";
import useChangeStore from "../../store";
import useDeleteBoodschap from "../../hooks/useDeleteBoodschap";
import { useAuth0 } from "@auth0/auth0-react";
import useBoodschappen from "../../hooks/useBoodschappen";

interface BoodschapCloseButtonProps {
  boodschapId: string;
}

const BoodschapCloseButton: React.FC<BoodschapCloseButtonProps> = ({
  boodschapId,
}) => {
  const { data: boodschappen, error, isLoading } = useBoodschappen();
  const boodschap = boodschappen?.find((b) => b.id === boodschapId);
  const { changeLog, appendChangeLog } = useChangeStore();
  const { mutate: deleteBoodschap } = useDeleteBoodschap();
  // console.log(b);
  console.log("BoodschapId", boodschapId);
  const { user } = useAuth0();

  const handleDeleteClick = useCallback(() => {
    if (boodschap) {
      appendChangeLog(boodschap);
      deleteBoodschap(boodschap.id);
    }
  }, [boodschap, deleteBoodschap, appendChangeLog]);

  return (
    <button
      id="close"
      className="btn btn-close"
      onClick={handleDeleteClick}
    ></button>
  );
};

export default BoodschapCloseButton;
