import React, { useState, useEffect, useCallback } from "react";
import BoodschappenHeader from "../boodschappenheader/BoodschappenHeader";
import BoodschapRow from "../boodschaprow/BoodschapRow";
import { useAuth0 } from "@auth0/auth0-react";
import { Boodschap } from "../../types/Props";
import {
  fetchBoodschappenHistory,
  addBoodschapToBackend,
  deleteBoodschapFromBackend,
} from "../../api";
import useBoodschappen from "../../hooks/useBoodschappen";

const BoodschappenPage: React.FC = () => {
  console.log("rendering BoodschappenPage");

  const { user } = useAuth0(); // Get user details
  const [changeLog, setChangeLog] = useState<Boodschap[]>([]);
  const [boodschappen, setBoodschappen] = useState<Boodschap[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const initialBoodschappen = await fetchBoodschappenHistory();
        console.log("Initial boodschappen loaded");
        setBoodschappen(initialBoodschappen);
      } catch (error) {
        console.error("Error fetching boodschappen history:", error);
      }
    })();
  }, []);

  const deleteBoodschap = useCallback(
    async (id: string) => {
      try {
        const deletedBoodschap = boodschappen.find(
          (boodschap) => boodschap.id === id
        );
        if (deletedBoodschap) {
          await deleteBoodschapFromBackend(id);
          setChangeLog((prevChangeLog) => [...prevChangeLog, deletedBoodschap]);
          setBoodschappen((prevBoodschappen) =>
            prevBoodschappen.filter((boodschap) => boodschap.id !== id)
          );
        }
      } catch (error) {
        console.error("Error deleting boodschap:", error);
      }
    },
    [boodschappen]
  );

  const undo = () => {
    console.log("Undoing changes");
    console.log("Changelog: ", changeLog);

    if (changeLog.length === 0) {
      console.log("No changes to undo");
      return;
    }

    const lastChange = changeLog[changeLog.length - 1];
    const existingIndex = boodschappen.findIndex(
      (boodschap) => boodschap.id === lastChange.id
    );

    // Undo deletion
    if (existingIndex === -1) {
      setBoodschappen([...boodschappen, lastChange]);
      addBoodschapToBackend(lastChange);
    } else {
      const newBoodschappen: Boodschap[] = boodschappen.map((boodschap) =>
        boodschap.id === lastChange.id ? lastChange : boodschap
      );
      setBoodschappen(newBoodschappen);
    }

    // Remove the last object from changeLog
    setChangeLog((prevChangeLog) =>
      prevChangeLog.slice(0, prevChangeLog.length - 1)
    );
  };

  const addBoodschap = async () => {
    console.log("Adding boodschap");
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

  const sort = () => {
    console.log("Sorting boodschappen");
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
      <div className="container">
        <table className={`table`}>
          <tbody>
            {boodschappen.map((boodschap) => (
              <BoodschapRow
                boodschap={boodschap}
                changeLog={changeLog}
                setChangeLog={setChangeLog}
                id={boodschap.id}
                key={boodschap.id}
                onDelete={deleteBoodschap} // Pass delete handler
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BoodschappenPage;
