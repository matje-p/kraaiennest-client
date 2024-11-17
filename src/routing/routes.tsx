import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import BoodschappenPage from "../components/boodschappenpage/BoodschappenPage";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "../components/profilepage/ProfilePage";
import HouseholdPage from "../components/householdpage/HouseholdPage";

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
        path: "account",
        element: <ProfilePage />,
      },
      {
        path: "household/:householdId",
        element: <HouseholdPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
