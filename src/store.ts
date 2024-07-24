import { Boodschap } from "./types/Props";
import { create } from "zustand";

interface ChangeStore {
    changeLog: Boodschap[];
    appendChangeLog: (boodschap: Boodschap) => void;
    removeLastChange: () => void;
}

const useChangeStore = create<ChangeStore>((set) => ({
    changeLog: [],
    appendChangeLog: (boodschap: Boodschap) => set((state) => ({
        changeLog: [...state.changeLog, boodschap]
    })),
    removeLastChange: () => set((state) => ({
        changeLog: state.changeLog.slice(0, -1)
    }))
}));

export default useChangeStore;
