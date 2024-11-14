import axios, { AxiosInstance } from "axios";
import { Boodschap, NewBoodschap, UserData } from "../types/Types";

export class APIClient {
    private axiosInstance: AxiosInstance;
    private getToken: () => Promise<string>;

    constructor(baseUrl: string, getToken: () => Promise<string>) {
        this.getToken = getToken;
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_URL + baseUrl,
        });

        // Add API key to all requests
        this.axiosInstance.interceptors.request.use(async (config) => {
            // Add API key
            const apiKey = import.meta.env.VITE_API_KEY;
            if (apiKey) {
                config.headers['x-api-key'] = apiKey;
            }

            // Add auth token
            try {
                const token = await this.getToken();
                config.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                console.error('Error getting auth token:', error);
            }

            return config;
        });
    }

    // Boodschappen methods
    async unAddLatestBoodschap() {
        const res = await this.axiosInstance.patch('boodschappen/unaddlatest');
        return res.data;
    }

    async postBoodschapToBackend(newBoodschap: NewBoodschap) {
        const res = await this.axiosInstance.post<Boodschap>('boodschappen/', newBoodschap);
        return res.data;
    }

    async markBoodschapAsRemoved(boodschapId: number, userRemovedUuid: string, userRemovedFirstname: string) {
        const res = await this.axiosInstance.patch(`boodschappen/${boodschapId}/remove`, {
            userRemovedUuid,
            userRemovedFirstname,
        });
        return res.data;
    }

    async undoBoodschapInBackend(boodschap: Boodschap) {
        const res = await this.axiosInstance.put<Boodschap>(`boodschappen/${boodschap.boodschapId}`, boodschap);
        return res.data;
    }

    async toggleBoodschapDoneInBackend(boodschapId: number, done: boolean, userDoneUuid: string, userDoneFirstname: string) {
        const res = await this.axiosInstance.patch(`boodschappen/${boodschapId}/toggledone`, {
            done,
            userDoneUuid,
            userDoneFirstname,
        });
        return res.data;
    }

    async editBoodschapTextInBackend(boodschapId: number, item: string, userChangedUuid: string, userChangedFirstname: string) {
        const res = await this.axiosInstance.patch(`boodschappen/${boodschapId}/edit`, {
            item,
            userChangedUuid,
            userChangedFirstname,
        });
        return res.data;
    }

    // User methods
    async getUserData(): Promise<UserData | null> {
        try {
            const res = await this.axiosInstance.get<UserData>('users/me');
            return res.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }
    
}