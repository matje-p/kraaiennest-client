import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Boodschap } from "../types/Props";
import boodschapService from "../services/boodschapService";
import { CACHE_KEY_BOODSCHAPPEN } from "../constants";

interface ToggleBoodschapDoneContext {
    previousBoodschappen: Boodschap[];
}

const useToggleBoodschapDone = () => {
    const queryClient = useQueryClient();
    
    return useMutation<void, Error, { id: string; done: boolean; userDone: string }, ToggleBoodschapDoneContext>({
        mutationFn: ({ id, done, userDone }) => boodschapService.toggleDone(id, done, userDone),
        
        onMutate: async ({ id, done, userDone }) => {
            // await queryClient.cancelQueries({ queryKey: CACHE_KEY_BOODSCHAPPEN });

            const previousBoodschappen = queryClient.getQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN) ?? [];

            queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, old => 
                old?.map(boodschap =>
                    boodschap.id === id
                        ? { ...boodschap, done: done, userDone: userDone, dateDone: new Date() }
                        : boodschap
                ) ?? []
            );
            return { previousBoodschappen };
        },
        
        onError: (err, _, context) => {
            console.log(err);
            if (context?.previousBoodschappen) {
                queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, context.previousBoodschappen);
            }
        },
        
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: CACHE_KEY_BOODSCHAPPEN });
        },
    });
};

export default useToggleBoodschapDone;
