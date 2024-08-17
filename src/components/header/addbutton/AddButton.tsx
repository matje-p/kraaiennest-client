import useAddBoodschap from "./useAddBoodschap";
import useChangeStore from "../undobutton/changeLogStore";
import useHouseholdStore from "../householdselector/householdStore";
import { NewBoodschap } from "../../../types/Types";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../../auth/userContext";

const AddButton = () => {
  const { household } = useHouseholdStore();
  const addBoodschap = useAddBoodschap(household.householdName);
  const { user } = useUser();
  const { changeLog, appendChangeLog } = useChangeStore();

  console.log("Changelog", changeLog);

  const newBoodschap: NewBoodschap = {
    item: "", // Assuming you have an item to add
    householdName: household.householdName,
    userAdded: user?.firstName || "Unknown User",
    dateAdded: new Date().toISOString(),
    removed: false,
    uuid: uuidv4(),
  };

  const handleAdd = () => {
    console.log("Adding new boodschap");
    addBoodschap.mutate(newBoodschap);
    appendChangeLog(newBoodschap);
  };

  return (
    <button onClick={handleAdd} className="btn btn-primary btn-sm me-2">
      <i className="bi bi-plus"></i>
    </button>
  );
};

export default AddButton;
