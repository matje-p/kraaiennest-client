import { createBrowserRouter, RouteObject } from "react-router-dom";
import BoodschappenPageOverall from "../components/boodschappenpageoverall/BoodschappenPageOverall";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <BoodschappenPageOverall />,
  },
];

const router = createBrowserRouter(routes);

export default router;
