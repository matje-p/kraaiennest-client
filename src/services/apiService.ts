import { APIClient } from "./apiClient";

export const createApiService = (getToken: () => Promise<string>) => {
    // Wrapper function to add logging and validation
    const getTokenWithLogging = async () => {

        
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