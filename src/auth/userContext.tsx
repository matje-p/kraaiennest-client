import React, { createContext, useContext, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useUserData from "./useUserData";
import { User } from "../types/Types";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user: auth0User, isLoading: authLoading } = useAuth0();

  // Handle the case where user is loading or not authenticated yet
  const emailAddress = auth0User?.email || "";

  const {
    data: user,
    isLoading: userLoading,
    error,
  } = useUserData(emailAddress);

  const isLoading = authLoading || userLoading;

  return (
    <UserContext.Provider value={{ user: user ?? null, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
