import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../../../types/Types';
import { createApiService } from '../../../services/apiService';

const useHouseholdMembers = (householdUuid: string) => {
    const { getAccessTokenSilently } = useAuth0();
    const apiService = createApiService(getAccessTokenSilently);

    return useQuery<User[], Error>({
        queryKey: ['householdMembers', householdUuid],
        queryFn: () => apiService.getHouseholdUsers(householdUuid),
        staleTime: 30 * 1000, // Cache for 30 seconds
        enabled: !!householdUuid, // Only run query if householdUuid is provided
    });
};

export default useHouseholdMembers;