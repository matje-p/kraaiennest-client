import { create } from "zustand";
import { Household } from "../../../../types/Types";


interface HouseholdStore {
  household: Household | null;  // Added null for initial state
  setHousehold: (household: Household) => void;
}

const useHouseholdStore = create<HouseholdStore>((set) => ({
  household: null,  // Changed initial state to null instead of dummy data
  setHousehold: (household: Household) => set({ household }),
}));

export default useHouseholdStore;