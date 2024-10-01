import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./BoodschapItem.module.scss";
import useChangeBoodschap from "./useChangeBoodschap";
import useChangeStore from "../../header/dropdownmenu/undobutton/changeLogStore";
import useHouseholdStore from "../../header/householdselector/householdStore";
import { useUser } from "../../../../auth/userContext";
import useBoodschappen from "../../useBoodschappen";
import Spinner from "../../../spinner/Spinner";

interface BoodschapItemProps {
  boodschapId: number;
}

const BoodschapItem: React.FC<BoodschapItemProps> = ({ boodschapId }) => {
  const { household } = useHouseholdStore();
  const { user } = useUser();
  const {
    data: boodschappen,
    error,
    isLoading,
  } = useBoodschappen(household.householdName);
  const boodschap = boodschappen?.find((b) => b.boodschapId === boodschapId);
  const { mutate: updateBoodschapText } = useChangeBoodschap(
    household.householdName
  );
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
        boodschapId: boodschap.boodschapId,
        item: localText,
        userChanged: user?.firstName || "unknown",
      });
      setLocalText(localText);
    }
    setIsEditing(false);
  }, [updateBoodschapText, boodschap, localText, user?.firstName]);

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
    <div className="col-12">
      {/* <div className="col-12 col-md-8 col-lg-6"> */}
      <div className="me-1">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className={`form-control`}
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
