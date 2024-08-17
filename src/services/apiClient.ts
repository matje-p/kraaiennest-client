import axios from "axios";
import { Boodschap, Household, NewBoodschap, User } from "../types/Types";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

class APIClient {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    unAddLatestBoodschap = async () => {
        const res = await axiosInstance.patch(`${this.endpoint}boodschappen/unaddlatest`);
        return res.data;
    }

    getBoodschappenFromBackend = async (household: string) => {
        const res = await axiosInstance.get<Boodschap[]>(`${this.endpoint}boodschappen/${household}`);
        return res.data;
    }

    postBoodschapToBackend = async (newBoodschap: NewBoodschap) => {
        const res = await axiosInstance.post<Boodschap>(`${this.endpoint}boodschappen/`, newBoodschap);
        return res.data;
    }

    markBoodschapAsRemoved = async (boodschapId: number, userRemoved: string) => {
        const res = await axiosInstance.patch(`${this.endpoint}boodschappen/${boodschapId}/remove`, {
            userRemoved: userRemoved,
        });
        return res.data;
    }

    undoBoodschapInBackend = async (boodschap: Boodschap) => {
        const res = await axiosInstance.put<Boodschap>(`${this.endpoint}boodschappen/${boodschap.boodschapId}`, boodschap);
        return res.data;
    }

    toggleBoodschapDoneInBackend = async (boodschapId: number, done: boolean, userDone: string) => {
        const res = await axiosInstance.patch(`${this.endpoint}boodschappen/${boodschapId}/toggledone`, {
            done: done,
            userDone: userDone
        });
        return res.data;
    }

    editBoodschapTextInBackend = async (boodschapId: number, item: string, userChanged: string) => {
        const res = await axiosInstance.patch(`${this.endpoint}boodschappen/${boodschapId}/edit`, {
            item: item,
            userChanged: userChanged
        });
        return res.data;
    }

    getUserData = async (emailAddress: string): Promise<User | null> => {
        try {
            const res = await axiosInstance.get<User>(`${this.endpoint}users/email`, {
                params: { emailAddress },
            });
            return res.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }

    getUserHouseholds = async (emailAddress: string): Promise<Household[] | null> => {
        try {
            const res = await axiosInstance.get<Household[]>(`${this.endpoint}households/data`, {
                params: { emailAddress },
            });
            return res.data;
        } catch (error) {
            console.error('Error fetching user households:', error);
            return null;
        }
    }
}

export default APIClient;
