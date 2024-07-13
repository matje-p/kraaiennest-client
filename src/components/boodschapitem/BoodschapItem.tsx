import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Boodschap.module.scss";
import { BoodschapProps } from "../../types/Props";
import { editBoodschapInBackend } from "../../api";

interface BoodschapItemProps {
  boodschappen: BoodschapProps[];
  updateBoodschappen: (newBoodschappen: BoodschapProps[]) => void;
  id: string;
  changeLog: BoodschapProps[];
  setChangeLog: (changeLog: BoodschapProps[]) => void;
}

const BoodschapItem: React.FC<BoodschapItemProps> = ({
  boodschappen,
  updateBoodschappen,
  id,
  changeLog,
  setChangeLog,
}) => {
  console.log("Rendering BoodschapItem");
  const boodschap = boodschappen.find((boodschap) => boodschap.id === id);

  if (!boodschap) {
    console.error("Boodschap not found for the given id:", id);
    return null;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(boodschap.item);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleBlur = async () => {
    if (text.trim() === "") {
      setText(boodschap.item);
    } else {
      const newBoodschappen = boodschappen.map((b) =>
        b.id === id ? { ...b, item: text } : b
      );
      setChangeLog([...changeLog, boodschap]);
      updateBoodschappen(newBoodschappen);

      try {
        setIsLoading(true);
        await editBoodschapInBackend(id, { item: text });
        setIsLoading(false);
      } catch (error) {
        setError("Failed to update the item.");
        console.error("Error updating boodschap:", error);
        // Revert the change in case of error
        setText(boodschap.item);
        setIsLoading(false);
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleBlur();
    }
  };

  return (
    <div className="me-1">
      {isEditing ? (
        <textarea
          className={`form-control ${styles.boodschapItemInput}`}
          value={text}
          onChange={handleTextChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
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
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default BoodschapItem;
