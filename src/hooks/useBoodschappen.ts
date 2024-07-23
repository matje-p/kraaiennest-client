import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_BOODSCHAPPEN } from "../constants";
import boodschapService from "../services/boodschapService";
import { Boodschap } from "../types/Props";
import sortBoodschappen from "../utils/sortBoodschappen";

const useBoodschappen = () => {
    return useQuery<Boodschap[], Error>({
        queryKey: CACHE_KEY_BOODSCHAPPEN,
        queryFn: boodschapService.getAll,
        staleTime: 10 * 1000,
        select: (data) => sortBoodschappen(data) || []
        
        // select: (data) => data || [],
        
    });
}

export default useBoodschappen;
