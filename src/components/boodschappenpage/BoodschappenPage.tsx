import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import BoodschappenHeader from "../boodschappenheader/BoodschappenHeader";
import BoodschappenLijst from "../boodschappenlijst/BoodschappenLijst";
import { BoodschapProps } from "../../types/Props";
import {
  fetchBoodschappenHistory,
  addBoodschapToBackend,
  // undoBoodschappenInBackend,
} from "../../api"; // Import the API services

const BoodschappenPage: React.FC = () => {
  console.log("rendering BoodschappenPage");
  const { user } = useAuth0();

  const [boodschappen, setBoodschappen] = useState<BoodschapProps[]>([]);
  const [changeLog, setChangeLog] = useState<BoodschapProps[]>([]);

  useEffect(() => {
    const loadBoodschappenHistory = async () => {
      try {
        const initialBoodschappen = await fetchBoodschappenHistory();
        setBoodschappen(initialBoodschappen);
        console.log("Initial boodschappen loaded:", initialBoodschappen);
      } catch (error) {
        console.error("Error fetching boodschappen history:", error);
      }
    };

    loadBoodschappenHistory();
  }, []);

  const addBoodschap = async () => {
    const newBoodschap = {
      item: "Voer boodschap in", // Customize as needed
      userAdded: String(user?.name), // Customize as needed
      userDone: "", // Customize as needed
      dateAdded: new Date(), // Assuming randDate() generates a date
      dateDone: new Date(), // Assuming randDate() generates a date
      done: false,
      id: Math.random().toString(36).substr(2, 9),
    };

    try {
      const addedBoodschap = await addBoodschapToBackend(newBoodschap);
      setBoodschappen([...boodschappen, addedBoodschap]);
      setChangeLog([...changeLog, addedBoodschap]);
    } catch (error) {
      console.error("Error adding boodschap:", error);
    }
  };

  const undo = () => {
    console.log("Undoing changes");

    // Check if changeLog has any entries
    if (changeLog.length === 0) {
      console.log("No changes to undo");
      return;
    }

    const lastChange = changeLog[changeLog.length - 1];
    const existingIndex = boodschappen.findIndex(
      (boodschap) => boodschap.id === lastChange.id
    );

    setBoodschappen((prevBoodschappen) => {
      // undoing a deletion
      if (existingIndex === -1) {
        return [...prevBoodschappen, lastChange];
        // undoing a change
      } else {
        return prevBoodschappen.map((boodschap) =>
          boodschap.id === lastChange.id ? lastChange : boodschap
        );
      }
    });

    // Remove the last object from changeLog
    setChangeLog((prevChangeLog) =>
      prevChangeLog.slice(0, prevChangeLog.length - 1)
    );
  };

  const sort = () => {
    const itemsPending = boodschappen.filter((item) => !item.done);
    const itemsCompleted = boodschappen.filter((item) => item.done);

    itemsPending.sort(
      (item1, item2) =>
        new Date(item2.dateAdded).getTime() -
        new Date(item1.dateAdded).getTime()
    );
    itemsCompleted.sort(
      (item1, item2) =>
        new Date(item2.dateDone).getTime() - new Date(item1.dateDone).getTime()
    );

    const sortedBoodschappen = itemsPending.concat(itemsCompleted);
    setBoodschappen(sortedBoodschappen);
  };

  console.log("Change log: ", changeLog);
  return (
    <>
      <BoodschappenHeader onAdd={addBoodschap} undo={undo} sort={sort} />
      <BoodschappenLijst
        boodschappen={boodschappen}
        setBoodschappen={setBoodschappen}
        changeLog={changeLog}
        setChangeLog={setChangeLog}
      />
    </>
  );
};

export default BoodschappenPage;
