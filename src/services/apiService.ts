import { APIClient } from "./apiClient";

export const createApiService = (getToken: () => Promise<string>) => {
    const getTokenWithLogging = async () => {
        try {
            const token = await getToken();
            return token;
        } catch (error) {
            throw error;
        }
    };

    const validateApiConfig = () => {
        const requiredEnvVars = {
            VITE_API_URL: import.meta.env.VITE_API_URL,
            VITE_AUTH0_AUDIENCE: import.meta.env.VITE_AUTH0_AUDIENCE,
            VITE_API_KEY: import.meta.env.VITE_API_KEY
        };

        const missingVars = Object.entries(requiredEnvVars)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        try {
            new URL(import.meta.env.VITE_API_URL);
        } catch (error) {
            return false;
        }

        return missingVars.length === 0;
    };

    if (!validateApiConfig()) {
        throw new Error('API configuration validation failed');
    }

    const apiClient = new APIClient('/', getTokenWithLogging);

    window.addEventListener('unhandledrejection', (event) => {
        if (event.reason?.isAxiosError) {
            console.error('Unhandled API Error:', event.reason);
        }
    });

    return apiClient;
};

export type ApiService = ReturnType<typeof createApiService>;

export default createApiService;