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

const useUpsertBoodschap = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();
  
  // Create API client instance
  const apiClient = new APIClient(
    "", // Base URL is handled in the client through env variable
    getAccessTokenSilently
  );

  return useMutation<Boodschap, Error, Boodschap, UndoBoodschapContext>({
    mutationFn: (boodschap: Boodschap) => apiClient.undoBoodschapInBackend(boodschap),
    
    onMutate: async (updatedBoodschap: Boodschap) => {
      await queryClient.cancelQueries({ queryKey: ['userData'] });
      const previousUserData = queryClient.getQueryData<UserData>(['userData']);

      queryClient.setQueryData<UserData | undefined>(['userData'], (oldData) => {
        if (!oldData?.boodschapsData) return oldData;

        const boodschappen = oldData.boodschapsData;
        const index = boodschappen.findIndex(b => b.boodschapId === updatedBoodschap.boodschapId);

        let updatedBoodschappen: Boodschap[];
        if (index !== -1) {
          // Update existing boodschap
          updatedBoodschappen = boodschappen.map((b, i) => 
            i === index ? updatedBoodschap : b
          );
        } else {
          // Add new boodschap at the beginning
          updatedBoodschappen = [updatedBoodschap, ...boodschappen];
        }

        return {
          ...oldData,
          boodschapsData: updatedBoodschappen
        };
      });

      return { previousUserData };
    },

    onError: (error, _, context) => {
      console.error('Upsert boodschap error:', error);
      if (context?.previousUserData) {
        queryClient.setQueryData<UserData>(['userData'], context.previousUserData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });
};

export default useUpsertBoodschap;