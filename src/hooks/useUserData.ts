import { useQuery } from '@tanstack/react-query';
import { createApiService } from '../services/apiService';
import { UserData } from '../types/Types';
import { useAuth0 } from '@auth0/auth0-react';

const useUserData = () => {
    const { getAccessTokenSilently } = useAuth0();
    const apiService = createApiService(getAccessTokenSilently);

    return useQuery<UserData | null, Error>({
        queryKey: ['userData'],
        queryFn: () => apiService.getUserData(),
        staleTime: 10 * 1000,
    });
};

export default useUserData;