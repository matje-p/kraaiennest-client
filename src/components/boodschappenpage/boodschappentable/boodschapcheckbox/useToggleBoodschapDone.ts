import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Boodschap } from "../../../../types/Types";
import { createApiService } from "../../../../services/apiService";

interface ToggleBoodschapDoneContext {
   previousUserData: any;
}

interface ToggleBoodschapDoneVariables {
   boodschapId: number;
   done: boolean;
   userDoneUuid: string;
   userDoneFirstname: string;
}

const useToggleBoodschapDone = () => {
   const queryClient = useQueryClient();
   const { getAccessTokenSilently } = useAuth0();
   const apiService = createApiService(getAccessTokenSilently);
   
   return useMutation<void, Error, ToggleBoodschapDoneVariables, ToggleBoodschapDoneContext>({
       mutationFn: ({ boodschapId, done, userDoneUuid, userDoneFirstname }) => 
           apiService.toggleBoodschapDoneInBackend(boodschapId, done, userDoneUuid, userDoneFirstname),
       
       onMutate: async ({ boodschapId, done, userDoneUuid, userDoneFirstname }) => {
           await queryClient.cancelQueries({ queryKey: ['userData'] });

           const previousUserData = queryClient.getQueryData(['userData']);

           queryClient.setQueryData(['userData'], (oldData: any) => {
               if (!oldData?.boodschapsData) return oldData;

               return {
                   ...oldData,
                   boodschapsData: oldData.boodschapsData.map((boodschap: Boodschap) =>
                       boodschap.boodschapId === boodschapId
                           ? { 
                               ...boodschap, 
                               done: done, 
                               userDoneUuid: userDoneUuid, 
                               userDoneFirstname: userDoneFirstname,
                               dateDone: new Date().toISOString() 
                             }
                           : boodschap
                   )
               };
           });

           return { previousUserData };
       },
       
       onError: (err, _, context) => {
           console.error('Toggle boodschap done error:', err);
           if (context?.previousUserData) {
               queryClient.setQueryData(['userData'], context.previousUserData);
           }
       },
       
       onSettled: () => {
           queryClient.invalidateQueries({ queryKey: ['userData'] });
       },
   });
};

export default useToggleBoodschapDone;