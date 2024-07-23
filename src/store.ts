import { Boodschap } from "./types/Props";
import { create } from "zustand";

interface ChangeStore {
    changeLog: Boodschap[];
    appendChangeLog: (boodschap: Boodschap) => void;
}

const useChangeStore = create<ChangeStore>((set) => ({
    changeLog: [],
    appendChangeLog: (boodschap: Boodschap) => set((state) => ({changeLog: [...state.changeLog, boodschap]
    }))
}));

export default useChangeStore;