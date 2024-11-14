import { APIClient } from "./apiClient";
import { useAuth0 } from "@auth0/auth0-react";

export const createApiService = (getToken: () => Promise<string>) => {
    return new APIClient('/', getToken);
};

export default createApiService;