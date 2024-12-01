import { useMutation } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { createApiService } from "../services/apiService";

interface UpdateDefaultHouseholdVariables {
    householdUuid: string;
}

const useUpdateDefaultHousehold = () => {
    const { getAccessTokenSilently } = useAuth0();
    const apiService = createApiService(getAccessTokenSilently);
    
    return useMutation<void, Error, UpdateDefaultHouseholdVariables>({
        mutationFn: ({ householdUuid }) => 
            apiService.setDefaultHousehold(householdUuid),
            
        onError: (err) => {
            console.error('Update default household error:', err);
        }
    });
};

export default useUpdateDefaultHousehold;