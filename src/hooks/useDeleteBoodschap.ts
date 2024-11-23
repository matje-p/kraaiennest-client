import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createApiService } from '../services/apiService';
import { Boodschap } from '../types/Types';

interface DeleteBoodschapContext {
    previousUserData: any;
}

interface DeleteBoodschapVariables {
    boodschapId: number;
    userRemovedUuid: string;
    userRemovedFirstname: string;
}

const useDeleteBoodschap = () => {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();
    const apiService = createApiService(getAccessTokenSilently);

    return useMutation<void, Error, DeleteBoodschapVariables, DeleteBoodschapContext>({
        mutationFn: ({ boodschapId, userRemovedUuid, userRemovedFirstname }) => 
            apiService.markBoodschapAsRemoved(boodschapId, userRemovedUuid, userRemovedFirstname),

        onMutate: async ({ boodschapId }) => {
            await queryClient.cancelQueries({ queryKey: ['userData'] });

            const previousUserData = queryClient.getQueryData(['userData']);

            queryClient.setQueryData(['userData'], (oldData: any) => {
                if (!oldData?.boodschapsData) return oldData;

                return {
                    ...oldData,
                    boodschapsData: oldData.boodschapsData.filter(
                        (boodschap: Boodschap) => boodschap.boodschapId !== boodschapId
                    )
                };
            });

            return { previousUserData };
        },

        onError: (error, _, context) => {
            console.error('Delete boodschap error:', error);
            if (context?.previousUserData) {
                queryClient.setQueryData(['userData'], context.previousUserData);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['userData'] });
        },
    });
};

export default useDeleteBoodschap;