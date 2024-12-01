import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Boodschap, HouseholdData, NewBoodschap, OtherUserData, UserData } from "../types/Types";

export class APIClient {
    private axiosInstance: AxiosInstance;
    private getToken: () => Promise<string>;

    constructor(baseUrl: string, getToken: () => Promise<string>) {
        this.getToken = getToken;
        const baseURL = import.meta.env.VITE_API_URL + baseUrl;

        this.axiosInstance = axios.create({ baseURL });

        this.axiosInstance.interceptors.request.use(
            async (config) => {
                const apiKey = import.meta.env.VITE_API_KEY;
                if (apiKey) {
                    config.headers['x-api-key'] = apiKey;
                }

                try {
                    const token = await this.getToken();
                    config.headers.Authorization = `Bearer ${token}`;
                } catch (error) {
                    // Handle error silently
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
    }

    private async handleRequest<T>(
        requestFn: () => Promise<AxiosResponse<T>>
    ): Promise<T> {
        try {
            const response = await requestFn();
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async unAddLatestBoodschap() {
        return this.handleRequest(() => 
            this.axiosInstance.patch('boodschappen/unaddlatest')
        );
    }

    async postBoodschapToBackend(newBoodschap: NewBoodschap) {
        return this.handleRequest<Boodschap>(() => 
            this.axiosInstance.post('boodschappen/', newBoodschap)
        );
    }

    async markBoodschapAsRemoved(
        boodschapId: number, 
        userRemovedUuid: string, 
        userRemovedFirstname: string
    ) {
        return this.handleRequest(() =>
            this.axiosInstance.patch(`boodschappen/${boodschapId}/remove`, {
                userRemovedUuid,
                userRemovedFirstname,
            })
        );
    }

    async undoBoodschapInBackend(boodschap: Boodschap) {
        return this.handleRequest<Boodschap>(() =>
            this.axiosInstance.put(`boodschappen/${boodschap.boodschapId}`, boodschap)
        );
    }

    async toggleBoodschapDoneInBackend(
        boodschapId: number,
        done: boolean,
        userDoneUuid: string,
        userDoneFirstname: string
    ) {
        return this.handleRequest(() =>
            this.axiosInstance.patch(`boodschappen/${boodschapId}/toggledone`, {
                done,
                userDoneUuid,
                userDoneFirstname,
            })
        );
    }

    async editBoodschapTextInBackend(
        boodschapId: number,
        item: string,
        userChangedUuid: string,
        userChangedFirstname: string
    ) {
        return this.handleRequest(() =>
            this.axiosInstance.patch(`boodschappen/${boodschapId}/edit`, {
                item,
                userChangedUuid,
                userChangedFirstname,
            })
        );
    }

    async getHouseholdData(householdUuid: string): Promise<HouseholdData> {
        return this.handleRequest<HouseholdData>(() =>
            this.axiosInstance.get(`households/${householdUuid}`)
        );
    }
    
    async getUserData(): Promise<UserData | null> {
        try {
            return await this.handleRequest<UserData>(() =>
                this.axiosInstance.get('users/me')
            );
        } catch (error) {
            return null;
        }
    }

    async getOtherUserData(userUuid:string): Promise<OtherUserData | null> {
        try {
            return await this.handleRequest<OtherUserData>(() =>
                this.axiosInstance.get(`users/${userUuid}`)
            );
        } catch (error) {
            return null;
        }
    }

    async setDefaultHousehold(householdUuid: string) {
        return this.handleRequest(() =>
            this.axiosInstance.patch('users/me/default-household', {
                householdUuid
            })
        );
    }
}