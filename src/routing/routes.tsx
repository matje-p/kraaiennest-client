import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import BoodschappenPage from "../components/boodschappenpage/BoodschappenPage";
import HouseholdPage from "../components/householdpage/HouseholdPage";
import UserPage from "../components/profilepage/UserPage";
import ProtectedRoute from "./ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <BoodschappenPage />,
      },
      {
        path: "user/:userUuid",
        element: <UserPage />,
      },
      {
        path: "household/:householdUuid",
        element: <HouseholdPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
