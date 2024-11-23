// import { create } from "zustand";

// interface NavStore {
//     navLog: string[];
//     appendNavLog: (nav: string) => void;
//     removeLastNav: () => void;
// }

// const useNavStore = create<NavStore>((set) => ({
//     navLog: [],
//     appendNavLog: (nav: string) => set((state) => ({
//         navLog: [...state.navLog, nav]
//     })),
//     removeLastNav: () => set((state) => ({
//         navLog: state.navLog.slice(0, -1)
//     }))
// }));

// export default useNavStore;