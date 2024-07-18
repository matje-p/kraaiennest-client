import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Boodschap } from '../types/Props';
import boodschapService from '../services/boodschapService';
import { CACHE_KEY_BOODSCHAPPEN } from '../constants';

interface DeleteBoodschapContext {
    previousBoodschappen: Boodschap[];
}

const useDeleteBoodschap = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string, DeleteBoodschapContext>({
        mutationFn: boodschapService.delete,
        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: CACHE_KEY_BOODSCHAPPEN });

            const previousBoodschappen = queryClient.getQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN) || [];

            queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, (boodschappen) =>
                (boodschappen || []).filter((boodschap) => boodschap.id !== id)
            );

            return { previousBoodschappen };
        },
        onError: (error, _, context) => {
            if (!context) return;
            queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, context.previousBoodschappen);
            console.log(error)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: CACHE_KEY_BOODSCHAPPEN });
        },
    });
};

export default useDeleteBoodschap;
