import React, { useEffect } from "react";
import { Auth0Provider, useAuth0, AppState } from "@auth0/auth0-react";

interface AuthStateLoggerProps {
  children: React.ReactNode;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface EnvConfig {
  domain: string | undefined;
  clientId: string | undefined;
  audience: string | undefined;
  redirectUri: string;
}

const AuthStateLogger: React.FC<AuthStateLoggerProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user, error } = useAuth0();

  useEffect(() => {
    console.group("Auth0 State");
    console.log("isAuthenticated:", isAuthenticated);
    console.log("isLoading:", isLoading);
    console.log("User:", user);
    console.log("Current URL:", window.location.href);
    console.groupEnd();

    if (error) {
      console.error("Auth0 Error:", {
        error,
        errorDescription: error.message,
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }, [isAuthenticated, isLoading, user, error]);

  return <>{children}</>;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Log environment configuration
  const envConfig: EnvConfig = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    redirectUri: window.location.origin,
  };

  console.log("Auth0 Configuration:", {
    domain: envConfig.domain ? "Set" : "Not Set",
    clientId: envConfig.clientId ? "Set" : "Not Set",
    audience: envConfig.audience ? "Set" : "Not Set",
    redirectUri: envConfig.redirectUri,
  });

  const onRedirectCallback = (appState: AppState | undefined) => {
    console.log("Redirect Callback:", {
      appState,
      returnTo: appState?.returnTo || window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  };

  if (!envConfig.domain || !envConfig.clientId) {
    console.error("Required Auth0 configuration missing");
    return null;
  }

  return (
    <Auth0Provider
      domain={envConfig.domain}
      clientId={envConfig.clientId}
      authorizationParams={{
        redirect_uri: envConfig.redirectUri,
        audience: envConfig.audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <AuthStateLogger>{children}</AuthStateLogger>
    </Auth0Provider>
  );
};

export default AuthProvider;
