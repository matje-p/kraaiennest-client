import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { Boodschap, NewBoodschap, UserData } from "../types/Types";

export class APIClient {
    private axiosInstance: AxiosInstance;
    private getToken: () => Promise<string>;

    constructor(baseUrl: string, getToken: () => Promise<string>) {
        this.getToken = getToken;
        const baseURL = import.meta.env.VITE_API_URL + baseUrl;
        
        // console.group('API Client Initialization');
        // console.log('Base URL:', baseURL);
        // console.log('Environment:', import.meta.env.PROD ? 'production' : 'development');
        // console.groupEnd();

        this.axiosInstance = axios.create({ baseURL });

        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            async (config) => {
                const apiKey = import.meta.env.VITE_API_KEY;
                if (apiKey) {
                    config.headers['x-api-key'] = apiKey;
                }

                try {
                    const token = await this.getToken();
                    config.headers.Authorization = `Bearer ${token}`;
                    
                    console.group('API Request');
                    console.log('URL:', `${config.baseURL}${config.url}`);
                    console.log('Method:', config.method?.toUpperCase());
                    console.log('Headers:', {
                        'x-api-key': 'Present',
                        Authorization: 'Bearer [...]'
                    });
                    if (config.data) {
                        console.log('Request Data:', config.data);
                    }
                    console.groupEnd();
                } catch (error) {
                    console.error('Token Error:', {
                        error,
                        timestamp: new Date().toISOString(),
                        environment: import.meta.env.PROD ? 'production' : 'development'
                    });
                }
                return config;
            },
            (error) => {
                console.error('Request Interceptor Error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                console.group('API Response');
                console.log('Status:', response.status);
                console.log('URL:', response.config.url);
                console.log('Data:', response.data);
                console.log('Timestamp:', new Date().toISOString());
                console.groupEnd();
                return response;
            },
            (error: AxiosError) => {
                console.group('API Error');
                console.error('Error Details:', {
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    url: error.config?.url,
                    method: error.config?.method?.toUpperCase(),
                    data: error.response?.data,
                    timestamp: new Date().toISOString(),
                    environment: import.meta.env.PROD ? 'production' : 'development'
                });
                console.groupEnd();
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
            console.error('Request Failed:', {
                error,
                timestamp: new Date().toISOString(),
                environment: import.meta.env.PROD ? 'production' : 'development'
            });
            throw error;
        }
    }

    // Boodschappen methods
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

    async getUserData(): Promise<UserData | null> {
        try {
            return await this.handleRequest<UserData>(() =>
                this.axiosInstance.get('users/me')
            );
        } catch (error) {
            console.error('getUserData Error:', {
                error,
                timestamp: new Date().toISOString(),
                environment: import.meta.env.PROD ? 'production' : 'development'
            });
            return null;
        }
    }
}