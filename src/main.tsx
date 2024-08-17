// main.tsx

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import router from "./routing/routes.tsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "./auth/userContext.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const queryClient = new QueryClient();

const MainApp = () => {
  // useEffect(() => {
  //   setupAxiosInterceptors(); // Set up Axios interceptors
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
