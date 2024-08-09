export const CACHE_KEY_BOODSCHAPPEN = ['boodschappen'];

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
      id: 1
    },
    barnfield: {
      fullname: "Sarah & Matthias",
      name: "Sarah & Matthias",
      id: 2 
    }
  };