import { type RouteObject } from "react-router-dom";

import { Root } from "./root";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        loader: () => {
          console.log("loader called");
          return null;
        },
        async lazy() {
          const { Dashboard } = await import("./dashboard");
          return { Component: Dashboard };
        },
      },
    ],
  },
];
