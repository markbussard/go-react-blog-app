import { type RouteObject } from "react-router-dom";

import { withAuth } from "~/utils";
import { Root } from "./root";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        async loader(args) {
          const { loader } = await import("./dashboard");
          return loader(args);
        },
        async lazy() {
          const { Dashboard } = await import("./dashboard");
          return { Component: Dashboard };
        },
      },
      {
        path: "posts/:slug",
        async loader(args) {
          const { loader } = await import("./posts/[slug]");
          return withAuth(loader, args);
        },
        async lazy() {
          const { PostDetails } = await import("./posts/[slug]");
          return { Component: PostDetails };
        },
      },
    ],
  },
];
