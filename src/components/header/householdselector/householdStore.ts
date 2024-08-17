import { create } from "zustand";
import { Household } from "../../../types/Types";

interface HouseholdStore {
  household: Household;
  setHousehold: (household: Household) => void;
}

const useHouseholdStore = create<HouseholdStore>((set) => ({
  household: {
    householdId: 0,
    householdName: "loading",
    householdFullName: "Loading",
  },
  setHousehold: (household: Household) => set({ household }),
}));

export default useHouseholdStore;
