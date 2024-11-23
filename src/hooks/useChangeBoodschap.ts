import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Boodschap } from '../types/Types';
import { createApiService } from '../services/apiService';
import { useAuth0 } from "@auth0/auth0-react";

interface UpdateBoodschapTextContext {
    previousUserData: any;
}

const useChangeBoodschap = () => {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();
    const apiService = createApiService(getAccessTokenSilently);

    return useMutation<void, Error, { boodschapId: number; item: string, userChangedUuid: string, userChangedFirstname: string }, UpdateBoodschapTextContext>({
        mutationFn: ({ boodschapId, item, userChangedUuid, userChangedFirstname }) => 
            apiService.editBoodschapTextInBackend(boodschapId, item, userChangedUuid, userChangedFirstname),
            
        onMutate: async ({ boodschapId, item, userChangedUuid, userChangedFirstname }) => {
            await queryClient.cancelQueries({ queryKey: ['userData'] });

            const previousUserData = queryClient.getQueryData(['userData']);

            queryClient.setQueryData(['userData'], (oldData: any) => {
                if (!oldData?.boodschapsData) return oldData;

                return {
                    ...oldData,
                    boodschapsData: oldData.boodschapsData.map((boodschap: Boodschap) =>
                        boodschap.boodschapId === boodschapId
                            ? { ...boodschap, item, userChangedUuid, userChangedFirstname }
                            : boodschap
                    )
                };
            });

            return { previousUserData };
        },

        onError: (err, _, context) => {
            console.log(err);
            if (context?.previousUserData) {
                queryClient.setQueryData(['userData'], context.previousUserData);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['userData'] });
        },
    });
};

export default useChangeBoodschap;