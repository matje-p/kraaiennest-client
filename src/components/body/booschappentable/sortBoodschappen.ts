import { Boodschap } from "../../../types/Types";

const sort = (boodschappen: Boodschap[]): Boodschap[] => {
  if (!Array.isArray(boodschappen)) {
      throw new Error("Expected an array, but got something else.");
  }

  return boodschappen.sort((a: Boodschap, b: Boodschap) => {
      if (!a.done && !b.done) {
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      } else if (a.done && b.done) {
          return new Date(b.dateDone).getTime() - new Date(a.dateDone).getTime();
      } else {
          return a.done ? 1 : -1;
      }
  });
};

export default sort;
