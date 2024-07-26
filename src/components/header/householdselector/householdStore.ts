import { create } from "zustand";

interface household {
  id: number;
  name: string;
  fullname: string;
  // Add more properties as needed
}

interface householdStore {
  household: household;
  sethousehold: (household: household) => void;
}

const usehouseholdStore = create<householdStore>((set) => ({
  household: {
    id: 0,
    name: "masdeslucioles",
    fullname: "Mas des Lucioles",
    // Add more default values for other properties if needed
  },
  sethousehold: (household: household) => set({ household }),
}));

export default usehouseholdStore;
