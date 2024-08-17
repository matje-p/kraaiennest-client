import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Boodschap } from "../../../../types/Types";
import apiService from "../../../../services/apiService";
import { CACHE_KEY_BOODSCHAPPEN } from "../../../../constants";


interface ToggleBoodschapDoneContext {
    previousBoodschappen: Boodschap[];
}

const useToggleBoodschapDone = (householdName:string) => {
    const queryClient = useQueryClient();
    
    return useMutation<void, Error, { boodschapId: number; done: boolean; userDone: string }, ToggleBoodschapDoneContext>({
        mutationFn: ({ boodschapId, done, userDone }) => apiService.toggleBoodschapDoneInBackend(boodschapId, done, userDone),
        
        onMutate: async ({ boodschapId, done, userDone }) => {

            const previousBoodschappen = queryClient.getQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName]) ?? [];

            queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], old => 
                old?.map(boodschap =>
                    boodschap.boodschapId === boodschapId
                        ? { ...boodschap, done: done, userDone: userDone, dateDone: new Date().toISOString() }
                        : boodschap
                ) ?? []
            );
            return { previousBoodschappen };
        },
        
        onError: (err, _, context) => {
            console.log(err);
            if (context?.previousBoodschappen) {
                queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], context.previousBoodschappen);
            }
        },
        
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });
        },
    });
};

export default useToggleBoodschapDone;
