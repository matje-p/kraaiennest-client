import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Boodschap } from "../types/Props";
import boodschapService from "../services/boodschapService";
import { CACHE_KEY_BOODSCHAPPEN } from "../constants";

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
      onSuccess: (savedBoodschap, newBoodschap) => {
        queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, (boodschappen) =>
          boodschappen?.map((todo) => (todo === newBoodschap ? savedBoodschap : todo))
        );
      },
      onError: (error, newBoodschap, context) => {
        if (!context) return;
        queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, context.previousBoodschaps);
      },
    });
}
export default useAddBoodschap