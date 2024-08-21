import useUpsertBoodschap from "./useUpsertBoodschap";
import useChangeStore from "./changeLogStore";
import useUnAddLatestBoodschap from "./useUnAddBoodschap";
import useHouseholdStore from "../../householdselector/householdStore";

const UndoButton = () => {
  const { household } = useHouseholdStore();
  const { changeLog, removeLastChange } = useChangeStore();
  const upsertBoodschap = useUpsertBoodschap(household.householdName);
  const unAddBoodschap = useUnAddLatestBoodschap(household.householdName);
  const lastBoodschap = changeLog[changeLog.length - 1]; // Get the most recent Boodschap

  const handleUndo = () => {
    // console.log("Undoing changes to boodschappen");
    // check if there is anything to undo at all
    if (lastBoodschap) {
      // If the boodschap has an Id, it is not a newly added one (boodschaps only get IDs on the backend)
      if ("boodschapId" in lastBoodschap) {
        console.log("Undoing changes/deletion");
        upsertBoodschap.mutate(lastBoodschap);
      } else {
        console.log("Undoing add action");
        unAddBoodschap.mutate();
      }
      removeLastChange();
    } else {
      console.log("No changes to undo");
    }
  };

  return (
    <>
      <button
        className="dropdown-item"
        onClick={handleUndo}
        disabled={!lastBoodschap}
      >
        <i className="bi bi-arrow-counterclockwise"></i> Maak ongedaan
      </button>
    </>
  );
};

export default UndoButton;
