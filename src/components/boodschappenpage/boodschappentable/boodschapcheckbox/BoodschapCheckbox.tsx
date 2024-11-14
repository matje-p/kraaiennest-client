import React from "react";
import useToggleBoodschapDone from "./useToggleBoodschapDone";
import useChangeStore from "../../header/dropdownmenu/undobutton/changeLogStore";
import useHouseholdStore from "../../header/householdselector/householdStore";
import useUserData from "../../../../auth/useUserData";
import Spinner from "../../../spinner/Spinner";

interface BoodschapCheckboxProps {
  boodschapId: number;
}

const BoodschapCheckbox: React.FC<BoodschapCheckboxProps> = ({
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

  const { mutate: toggleBoodschapDone } = useToggleBoodschapDone();
  const { appendChangeLog } = useChangeStore();

  const handleCheckboxChange = () => {
    console.log("Checkbox clicked");
    if (boodschap) {
      appendChangeLog(boodschap);
      toggleBoodschapDone({
        boodschapId: boodschap.boodschapId,
        done: !boodschap.done,
        userDoneUuid: userData?.userUuid || "Unknown user",
        userDoneFirstname: userData?.firstName || "Unknown user",
      });
    }
  };

  if (userDataLoading) {
    return <Spinner />;
  }

  if (userDataError) {
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
