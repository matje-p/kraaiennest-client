import axios from "axios";

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
    post = async (data: T) => {

        const res = await axiosInstance
            .post<T>(this.endpoint, data);
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
    

    changeText = async (id: string, item: string) => {
        const res = await axiosInstance.patch(`${this.endpoint}${id}/item`, {
            item: item,
        });
        return res.data;
    }
}

export default APIClient;