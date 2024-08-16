import { useQuery } from '@tanstack/react-query';
import apiService from '../services/apiService';
import { User } from '../types/Types';
import { CACHE_KEY_USER } from '../constants';


const useUserData = (emailAddress: string) => {
  return useQuery<User | null, Error>({
    queryKey: [CACHE_KEY_USER, emailAddress],
    queryFn: () => apiService.getUserData(emailAddress),
    staleTime: 10 * 1000, // Adjust as needed
  });
};

export default useUserData;
