import { useAuth0 } from "@auth0/auth0-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useBoodschap from "../../hooks/useBoodschap";
import useUpdateBoodschapText from "../../hooks/useChangeBoodschap";
import useDeleteBoodschap from "../../hooks/useDeleteBoodschap";
import useToggleBoodschapDone from "../../hooks/useToggleBoodschapDone";
import useChangeStore from "../../store";
import transformDate from "../../utils/transformDate";
import styles from "./BoodschapRow.module.scss";

interface BoodschapRowProps {
  boodschapId: string;
}

const BoodschapRow: React.FC<BoodschapRowProps> = ({ boodschapId }) => {
  const { data: boodschap, error, isLoading } = useBoodschap(boodschapId);
  const { changeLog, appendChangeLog } = useChangeStore();
  const { mutate: deleteBoodschap } = useDeleteBoodschap();
  const { mutate: toggleBoodschapDone } = useToggleBoodschapDone();
  const { mutate: updateBoodschapText } = useUpdateBoodschapText();
  const { user } = useAuth0();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localText, setLocalText] = useState<string>("");

  useEffect(() => {
    if (boodschap) {
      setLocalText(boodschap.item);
    }
  }, [boodschap]);

  const handleTextClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalText(event.target.value);
    },
    []
  );

  const handleBlur = useCallback(() => {
    if (boodschap) {
      updateBoodschapText({ id: boodschap.id, text: localText });
      setIsEditing(false);
    }
  }, [updateBoodschapText, boodschap, localText]);

  const handleDeleteClick = useCallback(() => {
    if (boodschap) {
      appendChangeLog(boodschap);
      deleteBoodschap(boodschap.id);
    }
  }, [boodschap, deleteBoodschap, appendChangeLog]);

  const handleCheckboxChange = () => {
    if (boodschap) {
      toggleBoodschapDone({
        id: boodschap.id,
        done: !boodschap.done,
        userDone: user?.name || "unknown",
      });
    }
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleBlur();
      }
    },
    [handleBlur]
  );

  // const dateAddedString = useMemo(
  //   () => transformDate(boodschap.dateAdded),
  //   [boodschap?.dateAdded]
  // );
  const dateAddedString = "Test date";
  const dateDoneString = useMemo(() => transformDate(new Date()), []);

  if (isLoading) {
    return (
      <tr>
        <td colSpan={3}>Loading...</td>
      </tr>
    );
  }

  if (error || !boodschap) {
    return (
      <tr>
        <td colSpan={3}>Error: {error?.message || "Boodschap not found"}</td>
      </tr>
    );
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
};

export default BoodschapRow;
