import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./BoodschapItem.module.scss";
import useChangeBoodschap from "./useChangeBoodschap";
import useChangeStore from "../../header/dropdownmenu/undobutton/changeLogStore";
import useHouseholdStore from "../../header/householdselector/householdStore";
import useUserData from "../../../../auth/useUserData";
import Spinner from "../../../spinner/Spinner";

interface BoodschapItemProps {
  boodschapId: number;
}

const BoodschapItem: React.FC<BoodschapItemProps> = ({ boodschapId }) => {
  const { household: currentHousehold } = useHouseholdStore();
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData();

  if (!currentHousehold) {
    return <div>No household selected</div>;
  }

  // Filter boodschappen for current household
  const boodschappen = userData?.boodschapsData?.filter(
    (boodschap) => boodschap.householdUuid === currentHousehold.householdUuid
  );

  // Find specific boodschap
  const boodschap = boodschappen?.find((b) => b.boodschapId === boodschapId);

  const { mutate: updateBoodschapText } = useChangeBoodschap();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localText, setLocalText] = useState<string>("");
  const { appendChangeLog } = useChangeStore();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (boodschap) {
      setLocalText(boodschap.item);
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
        userChangedUuid: userData?.userUuid || "unknown",
        userChangedFirstname: userData?.firstName || "unknown",
      });
      setLocalText(localText);
    }
    setIsEditing(false);
  }, [updateBoodschapText, boodschap, localText, userData?.firstName]);

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

  if (userDataLoading) {
    return <Spinner />;
  }

  if (userDataError) {
    return <div>Error loading boodschap.</div>;
  }

  return (
    <div className="col-12">
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
