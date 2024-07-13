import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    try {
      window.location.replace(appState?.returnTo || window.location.pathname);
      console.log(
        "Redirecting to:",
        appState?.returnTo || window.location.pathname
      );
    } catch (error) {
      console.error("Error during redirect callback:", error);
    }
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
