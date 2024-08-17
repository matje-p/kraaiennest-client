import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_BOODSCHAPPEN } from "../../constants";
import apiService from "../../services/apiService";
import { Boodschap } from "../../types/Types";
import sortBoodschappen from "./sortBoodschappen";

const useBoodschappen = (householdName: string) => {
    return useQuery<Boodschap[], Error>({
      queryKey: [CACHE_KEY_BOODSCHAPPEN, householdName],
      queryFn: () => apiService.getBoodschappenFromBackend(householdName),
      staleTime: 10 * 1000,
      select: (data) => sortBoodschappen(data) || [],
    });
  };

export default useBoodschappen;