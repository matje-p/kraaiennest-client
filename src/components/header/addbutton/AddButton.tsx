import { useAuth0 } from "@auth0/auth0-react";
import useAddBoodschap from "../../../hooks/useAddBoodschap";

const AddButton = () => {
  const addBoodschap = useAddBoodschap();
  const { user } = useAuth0();
  const newBoodschap = {
    item: "", // Customize as needed
    userAdded: String(user?.name), // Customize as needed
    userDone: "", // Customize as needed
    dateAdded: new Date(), // Assuming randDate() generates a date
    dateDone: new Date(), // Assuming randDate() generates a date
    done: false,
    userLastChange: "",
    id: Math.random().toString(36).substr(2, 9),
  };
  const handleAdd = () => {
    addBoodschap.mutate(newBoodschap);
  };

  return (
    <button onClick={handleAdd} className="btn btn-primary btn-sm me-2">
      <i className="bi bi-plus"></i>
    </button>
  );
};

export default AddButton;
