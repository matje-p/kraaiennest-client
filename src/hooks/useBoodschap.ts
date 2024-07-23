import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_BOODSCHAPPEN } from "../constants";
import boodschapService from "../services/boodschapService";
import { Boodschap } from "../types/Props";

const useBoodschap = (id: string) => {
    return useQuery<Boodschap, Error>({
        queryKey: [CACHE_KEY_BOODSCHAPPEN, id],
        queryFn: async () => {
            const data = await boodschapService.getOne(id);
            if (!data) {
                throw new Error("Boodschap not found");
            }
            return data;
        },
        staleTime: 10 * 1000, // 10 seconds
    });
}

export default useBoodschap;
