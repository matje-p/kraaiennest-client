import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Boodschap } from '../types/Props';
import boodschapService from '../services/boodschapService';
import { CACHE_KEY_BOODSCHAPPEN } from '../constants';

interface UpdateBoodschapTextContext {
    previousBoodschappen: Boodschap[];
}

const useChangeBoodschap = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { id: string; text: string }, UpdateBoodschapTextContext>({
        mutationFn: ({ id, text }) => boodschapService.changeText(id, text),

        onMutate: async ({ id, text }) => {
            await queryClient.cancelQueries({ queryKey: CACHE_KEY_BOODSCHAPPEN });

            const previousBoodschappen = queryClient.getQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN) ?? [];

            queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, old =>
                old?.map(boodschap =>
                    boodschap.id === id
                        ? { ...boodschap, text }
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

export default useChangeBoodschap;
