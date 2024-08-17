import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Boodschap } from '../../../../types/Types';
import apiService from '../../../../services/apiService';
import { CACHE_KEY_BOODSCHAPPEN } from '../../../../constants';


interface UpdateBoodschapTextContext {
    previousBoodschappen: Boodschap[];
}

const useChangeBoodschap = (householdName:string) => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { boodschapId: number; item: string, userChanged: string }, UpdateBoodschapTextContext>({
        mutationFn: ({ boodschapId, item, userChanged }) => apiService.editBoodschapTextInBackend(boodschapId, item, userChanged),
        onMutate: async ({ boodschapId, item, userChanged }) => {
            await queryClient.cancelQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });

            const previousBoodschappen = queryClient.getQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName]) ?? [];

            queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], old =>
                old?.map(boodschap =>
                    boodschap.boodschapId === boodschapId
                        ? { ...boodschap, item, userChanged  }
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

export default useChangeBoodschap;
