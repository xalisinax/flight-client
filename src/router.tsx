import { createBrowserRouter } from "react-router";
import App from "./App";
import { Anonymous, Identified } from "@/layout";
import { Callback, Flights, Home, Login, Logout, Reservations } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        element: <Identified />,
        children: [
          { index: true, element: <Home /> },
          { path: "/flights", element: <Flights /> },
          { path: "/reservations", element: <Reservations /> },
        ],
      },
      {
        element: <Anonymous />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/logout", element: <Logout /> },
          { path: "/callback", element: <Callback /> },
        ],
      },
    ],
  },
]);

export { router };
