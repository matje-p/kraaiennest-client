// import { useQuery, UseQueryResult } from "@tanstack/react-query";
// import { Household } from "../../../../types/Types";
// import { CACHE_KEY_HOUSEHOLDS } from "../../../../constants";
// import apiService from "../../../../services/apiService";


// const useHouseholds = (userId: string): UseQueryResult<Household[] | null, Error> => {
//   return useQuery<Household[] | null, Error>({
//     queryKey: [CACHE_KEY_HOUSEHOLDS, userId],
//     queryFn: () => apiService.getUserHouseholds(userId),
//     staleTime: 10 * 1000, // Adjust as needed
//     enabled: !!userId, // Only run the query if userId is truthy
//   });
// };

// export default useHouseholds;