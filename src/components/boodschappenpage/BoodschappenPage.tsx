import React, { useState, useEffect } from "react";
import BoodschappenHeader from "../boodschappenheader/BoodschappenHeader";
import BoodschappenLijst from "../boodschappenlijst/BoodschappenLijst";
import { BoodschapProps } from "../../types/Props";
import {
  fetchBoodschappenHistory,
  addBoodschapToBackend,
  undoBoodschappenInBackend,
} from "../../api"; // Import the API services

const BoodschappenPage: React.FC = () => {
  interface User {
    name: string;
  }

  const user: User = {
    name: "Matthias",
  };

  const [boodschappenHistory, updateBoodschappenHistory] = useState<
    BoodschapProps[][]
  >([]);

  useEffect(() => {
    const loadBoodschappenHistory = async () => {
      try {
        const initialBoodschappen = await fetchBoodschappenHistory();
        updateBoodschappenHistory([initialBoodschappen]);
        console.log("Initial boodschappen loaded:", initialBoodschappen);
      } catch (error) {
        console.error("Error fetching boodschappen history:", error);
      }
    };

    loadBoodschappenHistory();
  }, []);

  const updateBoodschappen = (newBoodschappen: BoodschapProps[]) => {
    updateBoodschappenHistory((prevHistory: BoodschapProps[][]) => {
      const newHistory = [...prevHistory, newBoodschappen];
      return newHistory.length > 5
        ? newHistory.slice(newHistory.length - 5)
        : newHistory;
    });
  };

  const addBoodschap = async () => {
    const newBoodschap = {
      item: "Voer boodschap in", // Customize as needed
      userAdded: user?.name, // Customize as needed
      userDone: "", // Customize as needed
      dateAdded: new Date(), // Assuming randDate() generates a date
      dateDone: new Date(), // Assuming randDate() generates a date
      done: false,
      id: Math.random().toString(36).substr(2, 9),
    };

    try {
      const addedBoodschap = await addBoodschapToBackend(newBoodschap);
      const newBoodschappen = [
        ...boodschappenHistory[boodschappenHistory.length - 1],
        addedBoodschap,
      ];
      updateBoodschappen(newBoodschappen);
    } catch (error) {
      console.error("Error adding boodschap:", error);
    }
  };

  const undo = () => {
    if (boodschappenHistory.length > 1) {
      const prevBoodschappenHistory = boodschappenHistory.slice(
        0,
        boodschappenHistory.length - 1
      );
      const prevBoodschappen =
        prevBoodschappenHistory[prevBoodschappenHistory.length - 1] || [];
      console.log("printing prev boodschappen");
      console.log(prevBoodschappen);
      console.log("done printing prev boodschappen");

      undoBoodschappenInBackend(prevBoodschappen);
      updateBoodschappenHistory(prevBoodschappenHistory);
    }
  };

  const sort = () => {
    const itemsPending = boodschappenHistory[
      boodschappenHistory.length - 1
    ].filter((item) => !item.done);
    const itemsCompleted = boodschappenHistory[
      boodschappenHistory.length - 1
    ].filter((item) => item.done);

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
    updateBoodschappen(sortedBoodschappen);
  };

  const boodschappen =
    boodschappenHistory[boodschappenHistory.length - 1] || [];

  return (
    <>
      <BoodschappenHeader onAdd={addBoodschap} undo={undo} sort={sort} />
      <BoodschappenLijst
        boodschappen={boodschappen}
        updateBoodschappen={updateBoodschappen}
      />
    </>
  );
};

export default BoodschappenPage;
