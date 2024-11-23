// components/ProtectedRoute.tsx
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import Spinner from "../components/sharedcomponents/Spinner";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: location.pathname },
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, location.pathname]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return null; // While redirecting, render nothing
  }

  return <>{children}</>;
};

export default ProtectedRoute;
