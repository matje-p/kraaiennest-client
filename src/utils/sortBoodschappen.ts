import { Boodschap } from "../types/Props";

const sort = (boodschappen: Boodschap[]): Boodschap[] => {
    return boodschappen.sort((a: Boodschap, b: Boodschap) => {
      if (!a.done && !b.done) {
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      } else if (a.done && b.done) {
        return new Date(b.dateDone).getTime() - new Date(a.dateDone).getTime();
      } else {
        return a.done ? 1 : -1;
      }
    });
  };

  export default sort;  