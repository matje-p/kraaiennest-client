import { APIClient } from "./apiClient";

export const createApiService = (getToken: () => Promise<string>) => {
    // Wrapper function to add logging and validation
    const getTokenWithLogging = async () => {
        console.log('=== Token Request Started ===');
        console.log('Environment:', process.env.NODE_ENV);
        console.log('API URL:', import.meta.env.VITE_API_URL);
        console.log('Auth0 Audience:', import.meta.env.VITE_AUTH0_AUDIENCE);
        
        try {
            const token = await getToken();
            console.log('Token received successfully');
            console.log('Token length:', token?.length);
            return token;
        } catch (error) {
            console.error('Error in getToken:', error);
            throw error;
        }
    };

    return new APIClient('/', getTokenWithLogging);
};

// Type for the API client to ensure proper usage
export type ApiService = ReturnType<typeof createApiService>;

export default createApiService;