export const CACHE_KEY_BOODSCHAPPEN = 'boodschappen';
export const CACHE_KEY_HOUSEHOLDS = 'households';
export const CACHE_KEY_USER = 'user';

interface Household {
    fullname: string;
    name: string;
    id: number;
  }
  
  interface Households {
    [key: string]: Household;
  }

export const households: Households = {
    masdeslucioles: {
      fullname: "Mas des Lucioles",
      name: "masdeslucioles",
      id: 0
    },
    barnfield: {
      fullname: "Sarah en Matthias",
      name: "barnfield",
      id: 1
    }
  };
