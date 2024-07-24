import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_BOODSCHAPPEN } from "../constants";
import boodschapService from "../services/boodschapService";
import { Boodschap } from "../types/Props";

interface UndoBoodschapContext {
  previousBoodschaps: Boodschap[];
}

const useUpsertBoodschap = () => {
  const queryClient = useQueryClient();

  return useMutation<Boodschap, Error, Boodschap, UndoBoodschapContext>({
    mutationFn: boodschapService.undo,
    onMutate: async (updatedBoodschap: Boodschap) => {
      await queryClient.cancelQueries({ queryKey: CACHE_KEY_BOODSCHAPPEN });
      const previousBoodschaps = queryClient.getQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN) || [];
      queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, (boodschappen) => {
        if (!boodschappen) return [updatedBoodschap];
        const index = boodschappen.findIndex(b => b.id === updatedBoodschap.id);
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
        queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, context.previousBoodschaps);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_BOODSCHAPPEN });
    },
  });
};

export default useUpsertBoodschap;
