import React, { useState, useRef, useCallback, useMemo, memo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./BoodschapRow.module.scss";
import { Boodschap } from "../../types/Props";
import transformDate from "../../utils/transformDate";
import useDeleteBoodschap from "../../hooks/useDeleteBoodschap";
import useToggleBoodschapDone from "../../hooks/useToggleBoodschapDone";
import useUpdateBoodschapText from "../../hooks/useChangeBoodschap";

const BoodschapRow = ({ boodschap }: { boodschap: Boodschap }) => {
  console.log("Rendering BoodschapRow", boodschap.id);

  const { mutate: deleteBoodschap } = useDeleteBoodschap();
  const { mutate: toggleBoodschapDone } = useToggleBoodschapDone();
  const { mutate: updateBoodschapText } = useUpdateBoodschapText();

  const { user } = useAuth0();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const localText = useRef<string>(boodschap.item);

  const handleTextClick = useCallback(() => {
    console.log("Text clicked, isEditing:", isEditing);
    setIsEditing(true);
  }, []);

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      localText.current = event.target.value;
    },
    []
  );

  const handleBlur = useCallback(() => {
    console.log("Handle blur");
    updateBoodschapText({
      id: boodschap.id,
      text: localText.current,
    });
    console.log(localText.current);
  }, []);

  const handleDeleteClick = useCallback(() => {
    console.log("Delete button clicked");
    deleteBoodschap(boodschap.id);
  }, [boodschap.id, deleteBoodschap]);

  const handleCheckboxChange = useCallback(() => {
    console.log("Checkbox clicked");
    toggleBoodschapDone({
      id: boodschap.id,
      done: !boodschap.done,
      userDone: user?.name || "unknown",
    });
  }, [boodschap.id, boodschap.done, toggleBoodschapDone, user?.name]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleBlur();
        setIsEditing(false);
      }
    },
    [handleBlur]
  );

  const dateAddedString = useMemo(
    () => transformDate(boodschap.dateAdded),
    [boodschap.dateAdded]
  );
  const dateDoneString = useMemo(() => transformDate(new Date()), []);

  if (boodschap === undefined) {
    console.error("Boodschap not found for the given id");
    return null; // Return null if boodschap is not found
  }

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
              <div className="me-1">
                {isEditing ? (
                  <textarea
                    className={`form-control ${styles.boodschapItemInput}`}
                    defaultValue={boodschap.item}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  <span
                    className={`${styles.boodschapItemText} ${
                      boodschap.done ? styles.strikedText : ""
                    }`}
                    onClick={handleTextClick}
                  >
                    {boodschap.item}
                  </span>
                )}
              </div>
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
          onClick={handleDeleteClick} // Attach delete handler
        ></button>
      </td>
    </tr>
  );
};

// Wrap the component with React.memo to prevent unnecessary re-renders
export default memo(BoodschapRow);
