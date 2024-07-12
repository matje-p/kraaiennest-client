// src/routes/routes.tsx
import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import BoodschappenPage from "../components/boodschappenpage/BoodschappenPage";

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return <>{element}</>;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute element={<BoodschappenPage />} />,
  },
];

const router = createBrowserRouter(routes);

export default router;
