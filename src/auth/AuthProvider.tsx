// auth/AuthProvider.tsx
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("Rendering AuthProvider");
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE, // Remove the curly braces
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
