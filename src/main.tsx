// main.tsx
import React from "react";

import ReactDOM from "react-dom/client";
import router from "./routing/routes.tsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
