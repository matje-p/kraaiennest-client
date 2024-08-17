import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Boodschap } from "../../../../types/Types";
import { CACHE_KEY_BOODSCHAPPEN } from "../../../../constants";
import apiService from "../../../../services/apiService";


interface UndoBoodschapContext {
  previousBoodschaps: Boodschap[];
}

const useUnAddLatestBoodschap = (householdName: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void, UndoBoodschapContext>({
    mutationFn: apiService.unAddLatestBoodschap,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });
      const previousBoodschaps = queryClient.getQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName]) || [];
      
      queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], (boodschappen) => 
        boodschappen?.map(b => {
          const maxTimestamp = Math.max(...boodschappen.filter(b => !b.removed).map(b => new Date(b.dateAdded).getTime()));
          return new Date(b.dateAdded).getTime() === maxTimestamp 
            ? { ...b, removed: true } 
            : b;
        }) || []
      );

      return { previousBoodschaps };
    },
    onError: (error, _, context) => {
      console.error(error);
      if (context?.previousBoodschaps) {
        queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], context.previousBoodschaps);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });
    },
  });
};

export default useUnAddLatestBoodschap;
