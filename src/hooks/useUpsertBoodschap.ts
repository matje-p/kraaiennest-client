import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_BOODSCHAPPEN } from "../constants";
import boodschapService from "../services/boodschapService";
import { Boodschap } from "../types/Props";

interface UndoBoodschapContext {
  previousBoodschaps: Boodschap[];
}

const useUpsertBoodschap = (householdName:string) => {
  const queryClient = useQueryClient();

  return useMutation<Boodschap, Error, Boodschap, UndoBoodschapContext>({
    mutationFn: boodschapService.undo,
    onMutate: async (updatedBoodschap: Boodschap) => {
      await queryClient.cancelQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });
      const previousBoodschaps = queryClient.getQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName]) || [];
      queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], (boodschappen) => {
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
        queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], context.previousBoodschaps);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });
    },
  });
};

export default useUpsertBoodschap;
