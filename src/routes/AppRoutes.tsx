import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Assessments } from "../pages/Assessments";
import { Login } from "../pages/Login";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/assessments",
    element: <Assessments />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={appRouter} />;
}
