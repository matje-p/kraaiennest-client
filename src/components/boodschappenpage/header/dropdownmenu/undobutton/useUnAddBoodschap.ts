import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Boodschap } from "../../../../../types/Types";
import { APIClient } from "../../../../../services/apiClient";

interface UserData {
  boodschapsData: Boodschap[];
}

interface UndoBoodschapContext {
  previousUserData: UserData | undefined;
}

const useUnAddLatestBoodschap = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();
  
  // Create API client instance
  const apiClient = new APIClient(
    "", // Base URL is handled in the client through env variable
    getAccessTokenSilently
  );

  return useMutation<void, Error, void, UndoBoodschapContext>({
    mutationFn: () => apiClient.unAddLatestBoodschap(),
    
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['userData'] });
      const previousUserData = queryClient.getQueryData<UserData>(['userData']);

      queryClient.setQueryData<UserData | undefined>(['userData'], (oldData) => {
        if (!oldData?.boodschapsData) return oldData;

        const boodschappen = oldData.boodschapsData;
        const nonRemovedBoodschappen = boodschappen.filter(b => !b.removed);
        
        if (nonRemovedBoodschappen.length === 0) return oldData;

        const maxTimestamp = Math.max(
          ...nonRemovedBoodschappen.map(b => new Date(b.dateAdded).getTime())
        );

        return {
          ...oldData,
          boodschapsData: boodschappen.map(b => 
            new Date(b.dateAdded).getTime() === maxTimestamp
              ? { ...b, removed: true }
              : b
          )
        };
      });

      return { previousUserData };
    },

    onError: (error, _, context) => {
      console.error('Undo add latest boodschap error:', error);
      if (context?.previousUserData) {
        queryClient.setQueryData<UserData>(['userData'], context.previousUserData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });
};

export default useUnAddLatestBoodschap;