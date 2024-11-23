import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { HouseholdData} from '../types/Types';
import { createApiService } from '../services/apiService';

const useHouseholdData = (householdUuid: string) => {
    const { getAccessTokenSilently } = useAuth0();
    const apiService = createApiService(getAccessTokenSilently);

    return useQuery<HouseholdData, Error, HouseholdData | null>({
        queryKey: ['householdData', householdUuid],
        queryFn: () => apiService.getHouseholdData(householdUuid),
        staleTime: 30 * 1000,
        enabled: !!householdUuid,
    });
};


export default useHouseholdData;