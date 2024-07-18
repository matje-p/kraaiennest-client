onError: (err, id, context) => {
    if (context?.previousBoodschappen) {
        queryClient.setQueryData<Boodschap[]>(CACHE_KEY_BOODSCHAPPEN, context.previousBoodschappen);
    }
},