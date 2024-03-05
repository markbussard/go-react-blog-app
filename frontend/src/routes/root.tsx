import { Outlet, ScrollRestoration } from "react-router-dom";

import { AppLayout } from "~/components";

export const Root = () => {
  return (
    <AppLayout>
      <Outlet />
      <ScrollRestoration />
    </AppLayout>
  );
};
