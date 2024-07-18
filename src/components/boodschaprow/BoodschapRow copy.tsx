import React, { useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./BoodschapRow.module.scss";
import { Boodschap } from "../../types/Props";
import transformDate from "../../utils/transformDate";
import {
  deleteBoodschapFromBackend,
  markBoodschapAsDoneInBackend,
} from "../../api"; // Import the delete function

interface BoodschapRowProps {
  boodschap: Boodschap;
  id: string;
  changeLog: Boodschap[];
  setChangeLog: (changeLog: Boodschap[]) => void;
  onDelete: (id: string) => void; // Add delete handler prop
}

const BoodschapRow = React.memo(
  ({
    boodschap,
    id,
    changeLog,
    setChangeLog,
    onDelete, // Receive delete handler
  }: BoodschapRowProps) => {
    console.log("Rendering BoodschapRow");
    const { user } = useAuth0();

    const [text, setText] = useState<string>(boodschap.item);
    const [checkboxStatus, setCheckboxStatus] = useState<boolean>(
      boodschap.done
    );
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const localText = useRef<string>(boodschap.item);

    const handleTextClick = () => {
      console.log("Text clicked");
      setIsEditing(true);
    };

    const handleTextChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      localText.current = event.target.value;
    };

    const handleBlur = async () => {
      console.log("Handle blur");
      const updatedText = localText.current.trim();
      if (updatedText === "") {
        localText.current = boodschap.item;
      } else {
        setText(updatedText); // Update component state only on blur
        // setChangeLog([...changeLog, boodschap]);
        try {
          setIsLoading(true);
          // await editBoodschapInBackend(id, { item: updatedText });
          setIsLoading(false);
        } catch (error) {
          setError("Failed to update the item.");
          console.error("Error updating boodschap:", error);
          // Revert the change in case of error
          setText(boodschap.item);
          localText.current = boodschap.item;
          setIsLoading(false);
        }
      }
      setIsEditing(false);
      setChangeLog([...changeLog, boodschap]);
    };

    if (boodschap === undefined) {
      console.error("Boodschap not found for the given id:", id);
      return null; // Return null if boodschap is not found
    }

    const handleDeleteClick = () => {
      console.log("Delete button clicked");
      setChangeLog([...changeLog, boodschap]);
      onDelete(id); // Call the delete handler passed as a prop
    };

    const handleCheckboxChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      console.log("Checkbox clicked");
      setChangeLog([...changeLog, boodschap]);
      setCheckboxStatus(event.target.checked);

      try {
        await markBoodschapAsDoneInBackend(
          id,
          "Done test user",
          event.target.checked
        ); // Call the API to mark the boodschap as done
      } catch (error) {
        console.error("Error marking boodschap as done:", error);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleBlur();
      }
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
              checked={checkboxStatus}
            />
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-12 col-md-4 col-lg-6">
              <span id="message">
                <div className="me-1">
                  {isEditing ? (
                    <textarea
                      className={`form-control ${styles.boodschapItemInput}`}
                      defaultValue={text}
                      onChange={handleTextChange}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                    />
                  ) : (
                    <span
                      className={`${styles.boodschapItemText} ${
                        checkboxStatus ? styles.strikedText : ""
                      }`}
                      onClick={handleTextClick}
                    >
                      {text}
                    </span>
                  )}
                  {error && <div className="text-danger">{error}</div>}
                </div>
              </span>
            </div>
            <div className="col-12 col-md-8 col-lg-6">
              <span id="meta" className="text-muted">
                {checkboxStatus
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
            onClick={handleDeleteClick} // Attach delete handler
          ></button>
        </td>
      </tr>
    );
  }
);

export default BoodschapRow;
