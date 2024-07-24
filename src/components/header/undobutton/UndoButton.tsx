import useUpsertBoodschap from "../../../hooks/useUpsertBoodschap";
import useChangeStore from "../../../store";

interface UndoButtonProps {
  buttonType: "full" | "mobile";
}

const UndoButton = ({ buttonType }: UndoButtonProps) => {
  const changeLog = useChangeStore((state) => state.changeLog);
  const upsertBoodschap = useUpsertBoodschap();

  const handleUndo = () => {
    console.log("Undoing changes to boodschappen");
    const lastBoodschap = changeLog[changeLog.length - 1]; // Get the most recent Boodschap
    if (lastBoodschap) {
      upsertBoodschap.mutate(lastBoodschap);
      console.log("Reverting boodschap: ", lastBoodschap);
    } else {
      console.log("No changes to undo");
    }
  };

  return (
    <>
      {buttonType === "full" && (
        <button className="btn btn-primary btn-sm me-2" onClick={handleUndo}>
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>
      )}
      {buttonType === "mobile" && (
        <button className="dropdown-item" onClick={handleUndo}>
          <i className="bi bi-arrow-counterclockwise"></i> Maak ongedaan
        </button>
      )}
    </>
  );
};

export default UndoButton;
