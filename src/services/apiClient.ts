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

    getBoodschappenFromBackend = async (household: string) => {
        const API_URL = `boodschappen${this.endpoint}${household}`
        console.log("Get api URL: ", API_URL)
        const res = await axiosInstance.get<T[]>(API_URL);
        return res.data;
    }

    undoBoodschapInBackend = async (boodschap : Boodschap) => {
        const res = await axiosInstance
        .put(`boodschappen${this.endpoint}${boodschap.id}`, boodschap);
        return res.data
    }

    postBoodschapToBackend = async (boodschap: Boodschap) => {
        const res = await axiosInstance
            .post<T>(`boodschappen${this.endpoint}`, boodschap);
        return res.data;
    }

    deleteBoodschapFromBackend = async (id: string) => {
        const res = await axiosInstance
            .delete(`boodschappen${this.endpoint}${id}`);
        return res.data;
    }

    toggleBoodschapDoneInBackend = async (id: string, done: boolean, userDone: string) => {
        const res = await axiosInstance.patch(`boodschappen${this.endpoint}${id}/done`, {
            done: done,
            userDone: userDone
        });
        return res.data;
    }

    changeText = async (id: string, item: string,  userLastChange: string) => {
        const res = await axiosInstance.patch(`boodschappen${this.endpoint}${id}`, {
            item: item,
            userLastChange: userLastChange
        });
        return res.data;
    }
}

export default APIClient;