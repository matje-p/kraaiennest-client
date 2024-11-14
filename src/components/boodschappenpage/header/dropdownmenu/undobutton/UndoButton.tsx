import useChangeStore from "./changeLogStore";
import useUnAddLatestBoodschap from "./useUnAddBoodschap";
import useUpsertBoodschap from "./useUpsertBoodschap";

const UndoButton = () => {
  const { changeLog, removeLastChange } = useChangeStore();
  const upsertBoodschap = useUpsertBoodschap();
  const unAddBoodschap = useUnAddLatestBoodschap();
  const lastBoodschap = changeLog[changeLog.length - 1]; // Get the most recent Boodschap

  const handleUndo = () => {
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
        <i className="bi bi-arrow-counterclockwise me-1"></i> Maak ongedaan
      </button>
    </>
  );
};

export default UndoButton;
