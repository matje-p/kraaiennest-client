export interface NewBoodschap {
  householdUuid: string;  // Changed from household to householdUuid
  userAddedUuid: string;  // Changed from userAdded to userAddedUuid
  userAddedFirstname: string;
}


export interface Boodschap extends NewBoodschap {
  boodschapUuid: string;
  boodschapId: number;
  done: boolean;
  changed: boolean;
  item: string;
  removed: boolean;
  
  // Date fields
  dateDone: string | null;
  dateChanged: string | null;
  dateRemoved: string | null;
  dateAdded: string;
  
  // UUID fields
  userDoneUuid: string | null;      // Changed from userDone
  userChangedUuid: string | null;   // Changed from userChanged
  userRemovedUuid: string | null;   // Changed from userRemoved

  // Firstname fields
  userDoneFirstname: string | null;
  userChangedFirstname: string | null;
  userRemovedFirstname: string | null;
}


export interface Household {
  name: string;
  // householdName: string;
  // householdId: number;
  householdUuid: string;
}

export interface User {
  emailAddress?: string;
  sub?:string;
  userUuid: string;
  firstName: string;
  lastName?: string; // Adding lastName as optional
  households?: string[];
  defaultHousehold?: string;
}

export interface OtherUserData {
  userUuid: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  // sub: string;
  households: string[]; // Array of household UUIDs
  defaultHousehold: string;
  householdData: Household[];
  // boodschapsData: Boodschap[];
}


export interface UserData extends OtherUserData {
  boodschapsData: Boodschap[];
  // defaultHousehold: string;
  sub: string;
}

type HouseholdMember = {
  firstName: string;
  lastName: string;
  userUuid: string;
}

export interface HouseholdData {
  householdUuid: string;
  householdFullName: string;
  householdMembers: HouseholdMember[];
}