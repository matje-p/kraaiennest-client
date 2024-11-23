import React from "react";
import useToggleBoodschapDone from "../../../hooks/useToggleBoodschapDone";
import useChangeStore from "../../../stores/changeLogStore";
import useHouseholdStore from "../../../stores/householdStore";
import useUserData from "../../../hooks/useUserData";
import Spinner from "../../sharedcomponents/Spinner";

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

  // Early return for loading state
  if (userDataLoading) {
    return <Spinner />;
  }

  // Early return for error state
  if (userDataError) {
    return <div>Error loading boodschap.</div>;
  }

  // Early return for no household
  if (!currentHousehold) {
    return <div>No household selected</div>;
  }

  // Filter boodschappen for current household
  const boodschappen =
    userData?.boodschapsData?.filter(
      (boodschap) => boodschap.householdUuid === currentHousehold.householdUuid
    ) ?? []; // Provide default empty array

  // Find specific boodschap
  const boodschap = boodschappen.find((b) => b.boodschapId === boodschapId);
  const isDone = boodschap?.done ?? false; // Always have a boolean value

  const { mutate: toggleBoodschapDone } = useToggleBoodschapDone();
  const { appendChangeLog } = useChangeStore();

  const handleCheckboxChange = () => {
    console.log("Checkbox clicked");
    if (boodschap && userData) {
      // Add userData check
      appendChangeLog(boodschap);
      toggleBoodschapDone({
        boodschapId: boodschap.boodschapId,
        done: !isDone, // Use isDone instead of boodschap.done
        userDoneUuid: userData.userUuid,
        userDoneFirstname: userData.firstName,
      });
    }
  };

  return (
    <div id="check" className="checkbox">
      <input
        type="checkbox"
        id={`checkbox-${boodschapId}`} // Add unique id
        onChange={handleCheckboxChange}
        checked={isDone} // Use isDone instead of boodschap?.done
        disabled={!boodschap || !userData} // Disable if data isn't available
      />
    </div>
  );
};

export default BoodschapCheckbox;
