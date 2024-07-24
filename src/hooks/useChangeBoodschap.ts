import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Boodschap } from '../types/Props';
import boodschapService from '../services/boodschapService';
import { CACHE_KEY_BOODSCHAPPEN } from '../constants';

interface UpdateBoodschapTextContext {
    previousBoodschappen: Boodschap[];
}

const useChangeBoodschap = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { id: string; item: string, userLastChange: string }, UpdateBoodschapTextContext>({
        mutationFn: ({ id, item, userLastChange }) => boodschapService.changeText(id, item, userLastChange),

        onMutate: async ({ id, item, userLastChange }) => {
            await queryClient.cancelQueries({ queryKey: CACHE_KEY_BOODSCHAPPEN });

            const previousBoodschappen = queryClient.getQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN) ?? [];

            queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, old =>
                old?.map(boodschap =>
                    boodschap.id === id
                        ? { ...boodschap, item, userLastChange  }
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
