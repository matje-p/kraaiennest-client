import React, { useCallback, useEffect, useState } from "react";
// import styles from "./BoodschapItem.module.css"; // Assuming you have a CSS module
import useBoodschappen from "../../hooks/useBoodschappen";
import useChangeBoodschap from "../../hooks/useChangeBoodschap";
import styles from "./BoodschapItem.module.scss";

interface BoodschapItemProps {
  boodschapId: string;
}

const BoodschapItem: React.FC<BoodschapItemProps> = ({ boodschapId }) => {
  const { data: boodschappen, error, isLoading } = useBoodschappen();
  const boodschap = boodschappen?.find((b) => b.id === boodschapId);
  const { mutate: updateBoodschapText } = useChangeBoodschap();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localText, setLocalText] = useState<string>("");

  useEffect(() => {
    if (boodschap) {
      setLocalText(boodschap.item); // Assuming `text` is the property containing the message
    }
  }, [boodschap]);

  const handleTextClick = useCallback(() => setIsEditing(true), []);

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) =>
      setLocalText(event.target.value),
    []
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading boodschap.</div>;
  }

  const handleBlur = useCallback(() => {
    console.log("Text changed");
    if (boodschap && localText !== boodschap.item) {
      updateBoodschapText({ id: boodschap.id, text: localText });
    }
    setIsEditing(false);
  }, [updateBoodschapText, boodschap, localText]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleBlur();
      }
    },
    [handleBlur]
  );

  return (
    <div className="col-12 col-md-4 col-lg-6">
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
              boodschap?.done ? styles.strikedText : ""
            }`}
            onClick={handleTextClick}
          >
            {localText}
          </span>
        )}
      </div>
    </div>
  );
};

export default BoodschapItem;
