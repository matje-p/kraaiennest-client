import { createBrowserRouter, RouteObject } from "react-router-dom";
import BoodschappenPage from "../components/boodschappenpage/BoodschappenPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <BoodschappenPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
