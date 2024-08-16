import { Boodschap, NewBoodschap } from "../../../types/Types";
import { create } from "zustand";

interface ChangeStore {
    changeLog: Boodschap[];
    appendChangeLog: (boodschap: NewBoodschap | Boodschap) => void;
    removeLastChange: () => void;
}

const useChangeStore = create<ChangeStore>((set) => ({
    changeLog: [],
    appendChangeLog: (boodschap: NewBoodschap | Boodschap) => set((state) => ({
        changeLog: [...state.changeLog, boodschap as Boodschap] // Ensure type compatibility
    })),
    removeLastChange: () => set((state) => ({
        changeLog: state.changeLog.slice(0, -1)
    }))
}));

export default useChangeStore;
