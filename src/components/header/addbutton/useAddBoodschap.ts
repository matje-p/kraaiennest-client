import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_BOODSCHAPPEN } from "../../../constants";
import apiService from "../../../services/apiService";
import { Boodschap, NewBoodschap } from "../../../types/Types";

interface AddBoodschapContext {
    previousBoodschaps: Boodschap[];
}

const useAddBoodschap = (householdName: string) => {
    const queryClient = useQueryClient();

    return useMutation<NewBoodschap, Error, NewBoodschap, AddBoodschapContext>({
        mutationFn: (newBoodschap) => apiService.postBoodschapToBackend(newBoodschap),
        onMutate: async (newBoodschap: NewBoodschap) => {
            const previousBoodschaps = queryClient.getQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName]) || [];
            queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], (boodschappen = []) => [
                {
                    ...newBoodschap,
                    boodschapId: 0,
                    householdId: 0, // Provide default values
                    userIdAdded: 0,
                    userDone: "",
                    userIdDone: 0,
                    dateDone: "",
                    done: false,
                    userChanged: "",
                    userChangedId: 0,
                    changed: false,
                    dateChanged: "",
                    userRemoved: "",
                    userRemovedId: 0,
                    dateRemoved: "",
                    removed: false,
                },
                ...boodschappen,
            ]);
            return { previousBoodschaps };
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName] });
        },
        onError: (error, _, context) => {
            console.error(error);
            if (context) {
                queryClient.setQueryData<Boodschap[]>([CACHE_KEY_BOODSCHAPPEN, householdName], context.previousBoodschaps);
            }
        },
    });
};

export default useAddBoodschap;
