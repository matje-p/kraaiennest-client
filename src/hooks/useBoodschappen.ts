import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_BOODSCHAPPEN } from "../constants";
import boodschapService from "../services/boodschapService";
import { Boodschap } from "../types/Props";
import sortBoodschappen from "../utils/sortBoodschappen";

const useBoodschappen = (householdName: string) => {
    return useQuery<Boodschap[], Error>({
      queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName],
      queryFn: () => boodschapService.get(householdName),
      staleTime: 10 * 1000,
      select: (data) => sortBoodschappen(data) || [],
    });
  };

export default useBoodschappen;