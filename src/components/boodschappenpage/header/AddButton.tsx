// AddButton.tsx
import useUserData from "../../../hooks/useUserData";
import { NewBoodschap } from "../../../types/Types";
import useChangeStore from "../../../stores/changeLogStore";
import useHouseholdStore from "../../../stores/householdStore";
import styles from "./AddButton.module.scss";
import useAddBoodschap from "../../../hooks/useAddBoodschap";

const AddButton = () => {
  const { household: currentHousehold } = useHouseholdStore();
  const {
    data: userData,
    isLoading: userLoading,
    // error: userDataError,
  } = useUserData();
  const { changeLog, appendChangeLog } = useChangeStore();
  console.log("Changelog:", changeLog);

  const addBoodschap = useAddBoodschap();

  const handleAdd = () => {
    console.log("Add button clicked");

    if (!currentHousehold || !userData) {
      console.error("Missing household or user data");
      return;
    }

    const newBoodschap: NewBoodschap = {
      householdUuid: currentHousehold.householdUuid, // Changed to use household's uuid
      userAddedUuid: userData.userUuid,
      userAddedFirstname: userData.firstName,
    };

    addBoodschap.mutate(newBoodschap);
    appendChangeLog(newBoodschap);
  };

  const isDisabled = !currentHousehold || !userData || userLoading;

  return (
    <button
      onClick={handleAdd}
      className={`btn btn-primary btn-sm me-2 ${styles.addButton}`}
      disabled={isDisabled}
    >
      <i className="bi bi-plus"></i>
    </button>
  );
};

export default AddButton;
