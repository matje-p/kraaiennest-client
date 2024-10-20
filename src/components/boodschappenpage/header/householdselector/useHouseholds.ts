import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Household } from "../../../../types/Types";
import { CACHE_KEY_HOUSEHOLDS } from "../../../../constants";
import apiService from "../../../../services/apiService";


const useHouseholds = (emailAddress: string): UseQueryResult<Household[] | null, Error> => {
  return useQuery<Household[] | null, Error>({
    queryKey: [CACHE_KEY_HOUSEHOLDS, emailAddress],
    queryFn: () => apiService.getUserHouseholds(emailAddress),
    staleTime: 10 * 1000, // Adjust as needed
    enabled: !!emailAddress, // Only run the query if emailAddress is truthy
  });
};

export default useHouseholds;