// auth/auth-provider.tsx
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const onRedirectCallback = (appState: any) => {
    window.location.replace(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
