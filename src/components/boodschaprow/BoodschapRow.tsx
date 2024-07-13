import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import BoodschapItem from "../boodschapitem/BoodschapItem";
import styles from "./BoodschapRow.module.scss";
import { BoodschapProps } from "../../types/Props";
import transformDate from "../../utils/transformDate";
import {
  deleteBoodschapFromBackend,
  markBoodschapAsDoneInBackend,
} from "../../api"; // Import the delete function
import { set } from "mongoose";

interface BoodschapRowProps {
  boodschappen: BoodschapProps[];
  setBoodschappen: (boodschappen: BoodschapProps[]) => void;
  id: string;
  changeLog: BoodschapProps[];
  setChangeLog: (changeLog: BoodschapProps[]) => void;
}

const BoodschapRow = ({
  boodschappen,
  setBoodschappen,
  id,
  changeLog,
  setChangeLog,
}: BoodschapRowProps) => {
  console.log("Rendering BoodschapRow");
  const { user } = useAuth0();

  const boodschap = boodschappen.find((boodschap) => boodschap.id === id);

  if (boodschap === undefined) {
    console.error("Boodschap not found for the given id:", id);
    return null; // Return null if boodschap is not found
  }

  const deleteBoodschapRow = async (id: string) => {
    try {
      await deleteBoodschapFromBackend(id); // Call the API to delete the boodschap
      const newBoodschappen = boodschappen.filter(
        (boodschap) => boodschap.id !== id
      );
      setBoodschappen(newBoodschappen);
    } catch (error) {
      console.error("Error deleting boodschap:", error);
    }
  };

  const handleDeleteClick = () => {
    setChangeLog([...changeLog, boodschap]);
    deleteBoodschapRow(boodschap.id);
  };

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDoneStatus = event.target.checked;
    const newBoodschappen = boodschappen.map((boodschap) =>
      boodschap.id === id ? { ...boodschap, done: newDoneStatus } : boodschap
    );
    try {
      await markBoodschapAsDoneInBackend(id, "Done test user", newDoneStatus); // Call the API to mark the boodschap as done
    } catch (error) {
      console.error("Error marking boodschap as done:", error);
    }
    setChangeLog([...changeLog, boodschap]);
    setBoodschappen(newBoodschappen);
  };

  const dateAddedString = boodschap ? transformDate(boodschap.dateAdded) : "";
  const dateDoneString = boodschap ? transformDate(new Date()) : "";

  return (
    <tr>
      <td className={styles.colWidth10}>
        <div id="check" className="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            onChange={handleCheckboxChange}
            checked={boodschap.done}
          />
        </div>
      </td>
      <td>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-6">
            <span id="message">
              <BoodschapItem
                boodschappen={boodschappen}
                updateBoodschappen={updateBoodschappen}
                changeLog={changeLog}
                setChangeLog={setChangeLog}
                id={id}
              />
            </span>
          </div>
          <div className="col-12 col-md-8 col-lg-6">
            <span id="meta" className="text-muted">
              {boodschap.done
                ? `Afgevinkt door ${user?.name} op ${dateDoneString}`
                : `Toegevoegd door ${boodschap.userAdded} op ${dateAddedString}`}
            </span>
          </div>
        </div>
      </td>
      <td className={`text-end ${styles.colWidth10}`}>
        <button
          id="close"
          className="btn btn-close"
          onClick={handleDeleteClick}
        ></button>
      </td>
    </tr>
  );
};

export default BoodschapRow;
