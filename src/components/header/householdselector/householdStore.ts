import { create } from "zustand";
import { Household } from "../../../types/Types";


interface householdStore {
  household: Household;
  setHousehold: (household: Household) => void;
}

const usehouseholdStore = create<householdStore>((set) => ({
  household: {
    householdId: 0,
    householdName: "loading",
    householdFullName: "Loading",

  },
  setHousehold: (household: Household) => set({ household }),
}));

export default usehouseholdStore;
