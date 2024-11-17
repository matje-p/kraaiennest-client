import { APIClient } from "./apiClient";

export const createApiService = (getToken: () => Promise<string>) => {
    const getTokenWithLogging = async () => {
        const environment = import.meta.env.PROD ? 'production' : 'development';
        
        console.group('Token Request');
        console.log('Configuration:', {
            environment,
            apiUrl: import.meta.env.VITE_API_URL,
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            timestamp: new Date().toISOString()
        });

        try {
            const token = await getToken();
            console.log('Token Details:', {
                length: token?.length,
                prefix: token?.substring(0, 10) + '...',
                timestamp: new Date().toISOString()
            });

            // Basic JWT validation
            if (token) {
                const [header, payload] = token.split('.');
                if (header && payload) {
                    const decodedPayload = JSON.parse(atob(payload));
                    console.log('Token Validation:', {
                        expires: new Date(decodedPayload.exp * 1000).toISOString(),
                        audience: decodedPayload.aud,
                        issuer: decodedPayload.iss
                    });
                }
            }

            console.groupEnd();
            return token;
        } catch (error) {
            console.group('Token Error');
            console.error('Error Details:', {
                error,
                environment,
                timestamp: new Date().toISOString(),
                apiUrl: import.meta.env.VITE_API_URL,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE
            });
            console.groupEnd();
            throw error;
        }
    };

    const validateApiConfig = () => {
        const requiredEnvVars = {
            VITE_API_URL: import.meta.env.VITE_API_URL,
            VITE_AUTH0_AUDIENCE: import.meta.env.VITE_AUTH0_AUDIENCE,
            VITE_API_KEY: import.meta.env.VITE_API_KEY
        };

        console.group('API Configuration Validation');
        const missingVars = Object.entries(requiredEnvVars)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingVars.length > 0) {
            console.error('Missing Environment Variables:', missingVars);
        } else {
            console.log('All required environment variables are present');
        }

        // Validate API URL format
        try {
            new URL(import.meta.env.VITE_API_URL);
            console.log('API URL format is valid');
        } catch (error) {
            console.error('Invalid API URL format:', import.meta.env.VITE_API_URL);
        }

        console.log('Environment:', import.meta.env.PROD ? 'production' : 'development');
        console.groupEnd();

        return missingVars.length === 0;
    };

    // Validate configuration before creating client
    if (!validateApiConfig()) {
        console.error('API configuration validation failed');
        // You might want to handle this case differently
    }

    const apiClient = new APIClient('/', getTokenWithLogging);

    // Add global error handler
    window.addEventListener('unhandledrejection', (event) => {
        if (event.reason?.isAxiosError) {
            console.group('Unhandled API Error');
            console.error('Error Details:', {
                status: event.reason.response?.status,
                statusText: event.reason.response?.statusText,
                data: event.reason.response?.data,
                url: event.reason.config?.url,
                method: event.reason.config?.method,
                timestamp: new Date().toISOString(),
                environment: import.meta.env.PROD ? 'production' : 'development'
            });
            console.groupEnd();
        }
    });

    return apiClient;
};

// Type for the API client to ensure proper usage
export type ApiService = ReturnType<typeof createApiService>;

export default createApiService;