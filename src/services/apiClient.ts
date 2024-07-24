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
    getAll = async () => {
        const res = await axiosInstance
            .get<T[]>(this.endpoint);
        return res.data;
    }

    undo = async (boodschap : Boodschap) => {
        const res = await axiosInstance
        .put(`${this.endpoint}${boodschap.id}`, boodschap);
        return res.data
    }

    post = async (boodschap: Boodschap) => {

        const res = await axiosInstance
            .post<T>(this.endpoint, boodschap);
        return res.data;
    }

    delete = async (id: string) => {
        const res = await axiosInstance
            .delete(`${this.endpoint}${id}`);
        return res.data;
    }

    toggleDone = async (id: string, done: boolean, userDone: string) => {
        const res = await axiosInstance.patch(`${this.endpoint}${id}/done`, {
            done: done,
            userDone: userDone
        });
        return res.data;
    }
    

    changeText = async (id: string, item: string,  userLastChange: string) => {
        const res = await axiosInstance.patch(`${this.endpoint}${id}`, {
            item: item,
            userLastChange: userLastChange
        });
        return res.data;
    }
}

export default APIClient;