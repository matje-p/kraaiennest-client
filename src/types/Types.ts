export interface NewBoodschap {
  item: string;
  householdName: string;
  userAdded: string;
  dateAdded: string;
  removed: boolean;
  uuid: string;
}

// Extend the base interface for Boodschap
export interface Boodschap extends NewBoodschap {
  boodschapId: number;
  householdId: number;
  userIdAdded: number;
  userDone: string;
  userIdDone: number;
  dateDone: string;
  done: boolean;
  userChanged: string;
  userChangedId: number;
  changed: boolean;
  dateChanged: string;
  userRemoved: string;
  userRemovedId: number;
  dateRemoved: string;
}

export interface Household {
  householdFullName: string;
  householdName: string;
  householdId: number;
}

export interface User {
  emailAddress: string;
  firstName: string;
  households: string[];
  defaultHousehold?: string;
}