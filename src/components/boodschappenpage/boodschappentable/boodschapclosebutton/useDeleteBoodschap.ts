import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Boodschap } from '../../../../types/Types';
import apiService from '../../../../services/apiService';
import { CACHE_KEY_BOODSCHAPPEN } from '../../../../constants';


interface DeleteBoodschapContext {
    previousBoodschappen: Boodschap[];
}

interface DeleteBoodschapVariables {
    boodschapId: number;
    userRemoved: string;
}

const useDeleteBoodschap = (householdName: string) => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, DeleteBoodschapVariables, DeleteBoodschapContext>({
        mutationFn: ({ boodschapId, userRemoved }) => apiService.markBoodschapAsRemoved(boodschapId, userRemoved),
        onMutate: async ({ boodschapId }) => {
            await queryClient.cancelQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });
            const previousBoodschappen = queryClient.getQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName]) || [];

            queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], (boodschappen) =>
                (boodschappen || []).filter((boodschap) => boodschap.boodschapId !== boodschapId)
            );

            return { previousBoodschappen };
        },
        onError: (error, _, context) => {
            if (!context) return;
            queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], context.previousBoodschappen);
            console.log(error);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });
        },
    });
};

export default useDeleteBoodschap;


