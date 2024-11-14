import { APIClient } from "./apiClient";

export const createApiService = (getToken: () => Promise<string>) => {
    return new APIClient('/', getToken);
};

export default createApiService;