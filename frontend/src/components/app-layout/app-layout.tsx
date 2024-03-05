import { AppNavbar } from "./app-navbar";

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = (props: AppLayoutProps) => {
  return (
    <>
      <AppNavbar />
      <div className="min-h-[calc(100vh-70px)]">{props.children}</div>
    </>
  );
};
