// useAddBoodschap.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Boodschap, NewBoodschap } from "../../../../types/Types";
import { createApiService } from "../../../../services/apiService";
import { useAuth0 } from "@auth0/auth0-react";

interface AddBoodschapContext {
    previousUserData: any;
}

const useAddBoodschap = () => { // Removed parameter since we'll get householdUuid from the NewBoodschap
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();
    const apiService = createApiService(getAccessTokenSilently);

    return useMutation<NewBoodschap, Error, NewBoodschap, AddBoodschapContext>({
        mutationFn: (newBoodschap) => apiService.postBoodschapToBackend(newBoodschap),
        onMutate: async (newBoodschap: NewBoodschap) => {
            const previousUserData = queryClient.getQueryData(['userData']);

            queryClient.setQueryData(['userData'], (oldData: any) => {
                if (!oldData?.boodschapsData) return oldData;

                const newBoodschapData = {
                    ...newBoodschap,
                    item: "",
                    boodschapId: 0,
                    boodschapUuid: '', // Will be set by server
                    done: false,
                    changed: false,
                    dateDone: null,
                    dateChanged: null,
                    dateRemoved: null,
                    userDoneUuid: null,
                    userChangedUuid: null,
                    userRemovedUuid: null,
                    userDoneFirstname: null,
                    userChangedFirstname: null,
                    userRemovedFirstname: null,
                    dateAdded: new Date().toISOString(),
                    removed: false,
                };

                return {
                    ...oldData,
                    boodschapsData: [newBoodschapData, ...oldData.boodschapsData]
                };
            });

            return { previousUserData };
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['userData'] });
        },
        onError: (error, _, context) => {
            console.error(error);
            if (context) {
                queryClient.setQueryData(['userData'], context.previousUserData);
            }
        },
    });
};

export default useAddBoodschap;