import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Import global styles first (which includes Bootstrap SCSS)
import "./global.scss";
// Then Bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css";
// Remove this line since Bootstrap is already imported in global.scss
// import "bootstrap/dist/css/bootstrap.min.css";
// Keep Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider.tsx";
import styles from "./index.module.scss";
import router from "./routing/routes.tsx";

const queryClient = new QueryClient();

const MainApp = () => {
  console.log("Rendering MainApp");
  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
