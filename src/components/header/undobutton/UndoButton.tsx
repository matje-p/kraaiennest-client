import useUpsertBoodschap from "./useUpsertBoodschap";
import useChangeStore from "./changeLogStore";
import usehouseholdStore from "../householdselector/householdStore";
import useDeleteBoodschap from "../../body/boodschapclosebutton/useDeleteBoodschap";

interface UndoButtonProps {
  buttonType: "full" | "mobile";
}

const UndoButton = ({ buttonType }: UndoButtonProps) => {
  const { household } = usehouseholdStore();
  const { changeLog, removeLastChange } = useChangeStore();
  const upsertBoodschap = useUpsertBoodschap(household.name);
  const lastBoodschap = changeLog[changeLog.length - 1]; // Get the most recent Boodschap
  const { mutate: deleteBoodschap } = useDeleteBoodschap(household.name);

  const handleUndo = () => {
    console.log("Undoing changes to boodschappen");
    // check if there is anything to undo at all
    if (lastBoodschap) {
      // Check if the last boodschap was the result of an add action
      if (lastBoodschap.item === "") {
        console.log("Undoing add action");
        deleteBoodschap(lastBoodschap.id);
      }
      // Check if the last boodschap was the result of an text edit, check box,  action"
      else if (lastBoodschap.item !== "") {
        upsertBoodschap.mutate(lastBoodschap);
        console.log("Undoing changes/deletion");
      }
      removeLastChange();
    } else {
      console.log("No changes to undo");
    }
  };

  return (
    <>
      {buttonType === "full" && (
        <button
          className="btn btn-primary btn-sm"
          onClick={handleUndo}
          disabled={!lastBoodschap}
        >
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>
      )}
      {buttonType === "mobile" && (
        <button
          className="dropdown-item"
          onClick={handleUndo}
          disabled={!lastBoodschap}
        >
          <i className="bi bi-arrow-counterclockwise"></i> Maak ongedaan
        </button>
      )}
    </>
  );
};

export default UndoButton;
