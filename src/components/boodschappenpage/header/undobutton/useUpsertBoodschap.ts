import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Boodschap } from "../../../../types/Types";
import { CACHE_KEY_BOODSCHAPPEN } from "../../../../constants";
import apiService from "../../../../services/apiService";


interface UndoBoodschapContext {
  previousBoodschaps: Boodschap[];
}

const useUpsertBoodschap = (householdName:string) => {
  const queryClient = useQueryClient();

  return useMutation<Boodschap, Error, Boodschap, UndoBoodschapContext>({
    mutationFn: apiService.undoBoodschapInBackend,
    onMutate: async (updatedBoodschap: Boodschap) => {
      await queryClient.cancelQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });
      const previousBoodschaps = queryClient.getQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName]) || [];
      queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], (boodschappen) => {
        if (!boodschappen) return [updatedBoodschap];
        const index = boodschappen.findIndex(b => b.boodschapId === updatedBoodschap.boodschapId);
        if (index !== -1) {
          const newBoodschappen = [...boodschappen];
          newBoodschappen[index] = updatedBoodschap;
          return newBoodschappen;
        } else {
          return [updatedBoodschap, ...boodschappen];
        }
      });

      return { previousBoodschaps };
    },
    onError: (error, _, context) => {
      console.error(error);
      if (context) {
        queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], context.previousBoodschaps);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });
    },
  });
};

export default useUpsertBoodschap;
