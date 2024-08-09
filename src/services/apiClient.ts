import axios from "axios";
import { Boodschap } from "../types/Props";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

class APIClient<T> {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    // getHouseholdsFromBackend = async () => {
    //     const res = await axiosInstance.get<T[]>(`households/${this.endpoint}`);
    //     return res.data;
    // }

    getBoodschappenFromBackend = async (household: string) => {
        console.log("Base URL: ", import.meta.env.VITE_API_URL) 
        console.log("endpoint: ", this.endpoint)
        const res = await axiosInstance.get<T[]>(`boodschappen/${this.endpoint}${household}`);
        return res.data;
    }

    undoBoodschapInBackend = async (boodschap : Boodschap) => {
        const res = await axiosInstance
        .put(`boodschappen/${this.endpoint}${boodschap.id}`, boodschap);
        return res.data
    }

    postBoodschapToBackend = async (boodschap: Boodschap) => {
        const res = await axiosInstance
            .post<T>(`boodschappen/${this.endpoint}`, boodschap);
        return res.data;
    }

    deleteBoodschapFromBackend = async (id: string) => {
        const res = await axiosInstance
            .delete(`boodschappen/${this.endpoint}${id}`);
        return res.data;
    }

    toggleBoodschapDoneInBackend = async (id: string, done: boolean, userDone: string) => {
        const res = await axiosInstance.patch(`boodschappen/${this.endpoint}${id}/done`, {
            done: done,
            userDone: userDone
        });
        return res.data;
    }

    changeText = async (id: string, item: string,  userLastChange: string) => {
        const res = await axiosInstance.patch(`boodschappen/${this.endpoint}${id}`, {
            item: item,
            userLastChange: userLastChange
        });
        return res.data;
    }
}

export default APIClient;