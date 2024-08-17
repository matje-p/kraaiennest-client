import React from "react";
import useToggleBoodschapDone from "./useToggleBoodschapDone";
import useChangeStore from "../../header/undobutton/changeLogStore";
import useHouseholdStore from "../../header/householdselector/householdStore";
import useBoodschappen from "../../useBoodschappen";
import { useUser } from "../../../../auth/userContext";
import Spinner from "../../../spinner/Spinner";

interface BoodschapCheckboxProps {
  boodschapId: number;
}

const BoodschapCheckbox: React.FC<BoodschapCheckboxProps> = ({
  boodschapId,
}) => {
  const { household } = useHouseholdStore();
  const {
    data: boodschappen,
    error,
    isLoading,
  } = useBoodschappen(household.householdName);
  const boodschap = boodschappen?.find((b) => b.boodschapId === boodschapId);
  const { mutate: toggleBoodschapDone } = useToggleBoodschapDone(
    household.householdName
  );
  const { user } = useUser();
  const { appendChangeLog } = useChangeStore();

  const handleCheckboxChange = () => {
    console.log("Checkbox clicked");
    if (boodschap) {
      appendChangeLog(boodschap);
      toggleBoodschapDone({
        boodschapId: boodschap.boodschapId,
        done: !boodschap.done,
        userDone: user?.firstName || "unknown",
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading boodschap.</div>;
  }

  return (
    <div id="check" className="checkbox">
      <input
        type="checkbox"
        id="checkbox"
        onChange={handleCheckboxChange}
        checked={boodschap?.done}
      />
    </div>
  );
};

export default BoodschapCheckbox;
