import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Boodschap } from '../types/Props';
import boodschapService from '../services/boodschapService';
import { CACHE_KEY_BOODSCHAPPEN } from '../constants';

interface DeleteBoodschapContext {
    previousBoodschappen: Boodschap[];
}

const useDeleteBoodschap = (householdName:string) => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string, DeleteBoodschapContext>({
        mutationFn: boodschapService.delete,
        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });

            const previousBoodschappen = queryClient.getQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName]) || [];

            queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], (boodschappen) =>
                (boodschappen || []).filter((boodschap) => boodschap.id !== id)
            );

            return { previousBoodschappen };
        },
        onError: (error, _, context) => {
            if (!context) return;
            queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], context.previousBoodschappen);
            console.log(error)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });
        },
    });
};

export default useDeleteBoodschap;
