import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_BOODSCHAPPEN } from "../constants";
import boodschapService from "../services/boodschapService";
import { Boodschap } from "../types/Props";

const useBoodschappen = () => {
    return useQuery<Boodschap[], Error>({
        queryKey: CACHE_KEY_BOODSCHAPPEN,
        queryFn: boodschapService.getAll,
        staleTime: 10 * 1000, // 10 seconds
        });
}

export default useBoodschappen