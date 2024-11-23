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
    const envMode = import.meta.env.PROD ? "production" : "development";

    if (error) {
      console.error("Auth0 Error:", {
        error,
        errorDescription: error.message,
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
        environment: envMode,
        location: {
          href: window.location.href,
          origin: window.location.origin,
          pathname: window.location.pathname,
        },
      });
    }
  }, [isAuthenticated, isLoading, user, error]);

  return <>{children}</>;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const envConfig: EnvConfig = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    redirectUri: window.location.origin,
  };

  // Enhanced configuration logging
  useEffect(() => {
    const envMode = import.meta.env.PROD ? "production" : "development";

    // Validate configuration
    const validationIssues = [];
    if (!envConfig.domain) validationIssues.push("Missing domain");
    if (!envConfig.clientId) validationIssues.push("Missing clientId");
    if (!envConfig.audience) validationIssues.push("Missing audience");
    if (validationIssues.length > 0) {
      console.error("Auth0 Configuration Issues:", {
        issues: validationIssues,
        environment: envMode,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  const onRedirectCallback = (appState: AppState | undefined) => {
    // Check for errors in URL
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    const errorDescription = urlParams.get("error_description");
    const state = urlParams.get("state");

    if (error) {
      console.error("Auth0 Redirect Error:", {
        error,
        errorDescription,
        state,
        timestamp: new Date().toISOString(),
        environment: import.meta.env.PROD ? "production" : "development",
        config: {
          domain: envConfig.domain,
          audience: envConfig.audience,
          redirectUri: envConfig.redirectUri,
        },
      });
    }

    // Handle the redirect
    const targetUrl = appState?.returnTo || window.location.pathname;
    window.history.replaceState({}, "", targetUrl);
  };

  if (!envConfig.domain || !envConfig.clientId) {
    console.error("Required Auth0 configuration missing", {
      domain: !!envConfig.domain,
      clientId: !!envConfig.clientId,
      audience: !!envConfig.audience,
      timestamp: new Date().toISOString(),
      environment: import.meta.env.PROD ? "production" : "development",
    });
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
      cacheLocation="localstorage" // Added for better token persistence
    >
      <AuthStateLogger>{children}</AuthStateLogger>
    </Auth0Provider>
  );
};

export default AuthProvider;
