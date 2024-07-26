import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_BOODSCHAPPEN } from "../constants";
import boodschapService from "../services/boodschapService";
import { Boodschap } from "../types/Props";

interface AddBoodschapContext {
    previousBoodschaps: Boodschap[];
}

const useAddBoodschap = (householdName: string) => {
    const queryClient = useQueryClient();

    return useMutation<Boodschap, Error, Boodschap, AddBoodschapContext>({
        mutationFn: boodschapService.post,
        onMutate: async (newBoodschap: Boodschap) => {
            // Save previous data and update the cache optimistically
            const previousBoodschaps = queryClient.getQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName]) || [];
            queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], (boodschappen) => [
                newBoodschap,
                ...(boodschappen || []),
            ]);
            return { previousBoodschaps };
        },
        onSettled: () => {
            // Invalidate the cache to fetch fresh data
            queryClient.invalidateQueries({queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName]});
        },
        onError: (error, _, context) => {
            console.error(error);
            if (!context) return;
            // Roll back to previous data if the mutation fails
            queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], context.previousBoodschaps);
        },
    });
};

export default useAddBoodschap;
