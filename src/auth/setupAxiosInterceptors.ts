import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const setupAxiosInterceptors = () => {
    const { getAccessTokenSilently } = useAuth0();

    axiosInstance.interceptors.request.use(async (config) => {
        try {
            const token = await getAccessTokenSilently();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error getting the access token", error);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
};
