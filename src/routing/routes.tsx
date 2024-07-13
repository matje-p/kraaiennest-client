// routing/routes.tsx
import { createBrowserRouter, RouteObject } from "react-router-dom";
import BoodschappenPageOverall from "../components/boodschappenpageoverall/BoodschappenPageOverall";
import ProtectedRoute from "../components/protectedroute/ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <BoodschappenPageOverall />
      </ProtectedRoute>
    ),
  },
];

const router = createBrowserRouter(routes);

export default router;
