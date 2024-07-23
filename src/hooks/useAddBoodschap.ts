import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_BOODSCHAPPEN } from "../constants";
import boodschapService from "../services/boodschapService";
import { Boodschap } from "../types/Props";

interface AddBoodschapContext {
    previousBoodschaps: Boodschap[];
  }

const useAddBoodschap = () => {
    const queryClient = useQueryClient();
    return useMutation<Boodschap, Error, Boodschap, AddBoodschapContext>({
      mutationFn: boodschapService.post,
      onMutate: (newBoodschap: Boodschap) => {
        const previousBoodschaps = queryClient.getQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN) || [];
        queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, (boodschappen) => [
          newBoodschap,
          ...(boodschappen || []),
        ]);
        return { previousBoodschaps };
      },
      onSettled: () => {
        queryClient.invalidateQueries({queryKey: CACHE_KEY_BOODSCHAPPEN});
      },
      onError: (error, _, context) => {
        console.log(error)
        if (!context) return;
        queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, context.previousBoodschaps);
      },
    });
}
export default useAddBoodschap