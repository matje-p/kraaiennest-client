import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./BoodschapItem.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import useBoodschappen from "../../../hooks/useBoodschappen";
import useChangeBoodschap from "../../../hooks/useChangeBoodschap";
import useChangeStore from "../../../store";
import Spinner from "../../spinner/Spinner";

interface BoodschapItemProps {
  boodschapId: string;
}

const BoodschapItem: React.FC<BoodschapItemProps> = ({ boodschapId }) => {
  const { user } = useAuth0();
  const { data: boodschappen, error, isLoading } = useBoodschappen();
  const boodschap = boodschappen?.find((b) => b.id === boodschapId);
  const { mutate: updateBoodschapText } = useChangeBoodschap();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localText, setLocalText] = useState<string>("");
  const { appendChangeLog } = useChangeStore();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (boodschap) {
      setLocalText(boodschap.item); // Assuming `item` is the property containing the message
    }
  }, [boodschap]);

  const handleTextClick = useCallback(() => {
    if (localText === "Voer boodschap in") {
      setLocalText("");
    }
    setIsEditing(true);
  }, [localText]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(localText.length, localText.length);
    }
  }, [isEditing, localText]);

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalText(event.target.value);
    },
    []
  );

  const handleBlur = useCallback(() => {
    if (boodschap && localText !== boodschap.item) {
      appendChangeLog(boodschap);
      updateBoodschapText({
        id: boodschap.id,
        item: localText,
        userLastChange: user?.name || "unknown",
      });
      setLocalText(localText);
    }
    setIsEditing(false);
  }, [updateBoodschapText, boodschap, localText, user?.name]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Escape") {
        setIsEditing(false);
      } else if (event.key === "Enter") {
        event.preventDefault();
        handleBlur();
      }
    },
    [handleBlur]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        textareaRef.current &&
        !textareaRef.current.contains(event.target as Node)
      ) {
        handleBlur();
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, handleBlur]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading boodschap.</div>;
  }

  return (
    <div className="col-12 col-md-4 col-lg-6">
      <div className="me-1">
        {isEditing ? (
          <textarea
            ref={textareaRef}
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
            {localText.trim() === "" ? "Voer boodschap in" : localText}
          </span>
        )}
      </div>
    </div>
  );
};

export default BoodschapItem;
