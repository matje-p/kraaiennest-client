import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { createApiService } from '../services/apiService';
import { OtherUserData } from '../types/Types';

const useProfilePageData = (userUuid:string) => {
    const { getAccessTokenSilently } = useAuth0();
    const apiService = createApiService(getAccessTokenSilently);

    return useQuery<OtherUserData | null, Error>({
        queryKey: ['profileData', userUuid],
        queryFn: () => apiService.getOtherUserData(userUuid),
        staleTime: 10 * 1000,
    });
};

export default useProfilePageData;