import { useAuth0 } from "@auth0/auth0-react";
import React, { useCallback, useMemo, useState, memo } from "react";
import useUpdateBoodschapText from "../../hooks/useChangeBoodschap";
import useDeleteBoodschap from "../../hooks/useDeleteBoodschap";
import useToggleBoodschapDone from "../../hooks/useToggleBoodschapDone";
import { Boodschap } from "../../types/Props";
import transformDate from "../../utils/transformDate";
import styles from "./BoodschapRow.module.scss";

interface BoodschapRowProps {
  boodschap: Boodschap;
}

const BoodschapRow: React.FC<BoodschapRowProps> = memo(({ boodschap }) => {
  console.log("Rendering BoodschapRow", boodschap);

  const { mutate: deleteBoodschap } = useDeleteBoodschap();
  const { mutate: toggleBoodschapDone } = useToggleBoodschapDone();
  const { mutate: updateBoodschapText } = useUpdateBoodschapText();

  const { user } = useAuth0();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localText, setLocalText] = useState<string>(boodschap.item);

  const handleTextClick = useCallback(() => {
    console.log("Text clicked, isEditing:", isEditing);
    setIsEditing(true);
  }, [isEditing]);

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalText(event.target.value);
    },
    []
  );

  const handleBlur = useCallback(() => {
    console.log("Handle blur");
    updateBoodschapText({
      id: boodschap.id,
      text: localText,
    });
    setIsEditing(false);
  }, [updateBoodschapText, boodschap.id, localText]);

  const handleDeleteClick = useCallback(() => {
    console.log("Delete button clicked");
    deleteBoodschap(boodschap.id);
  }, [boodschap.id, deleteBoodschap]);

  const handleCheckboxChange = () => {
    console.log("Checkbox clicked");
    toggleBoodschapDone({
      id: boodschap.id,
      done: !boodschap.done,
      userDone: user?.name || "unknown",
    });
    // toggleBoodschapDone;
  };

  // const handleCheckboxChange = useCallback(() => {
  //   console.log("Checkbox clicked");
  //   toggleBoodschapDone({
  //     id: boodschap.id,
  //     done: !boodschap.done,
  //     userDone: user?.name || "unknown",
  //   });
  // }, [boodschap.id, boodschap.done, toggleBoodschapDone, user?.name]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleBlur();
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
                    value={localText}
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
                    {localText}
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
          onClick={handleDeleteClick}
        ></button>
      </td>
    </tr>
  );
});

export default BoodschapRow;
