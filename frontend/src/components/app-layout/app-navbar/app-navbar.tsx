import { Link } from "react-router-dom";

import { useMe } from "~/api/users";
import { ProfileDropdown } from "./profile-dropdown";

export const AppNavbar = () => {
  const { data } = useMe();

  return (
    <nav className="sticky left-0 right-0 top-0 z-20 flex h-20 w-full flex-row items-center justify-between bg-[#333333] px-12 py-2 shadow-[4px_4px_10px_0px_rgba(0,0,0,0.10)]">
      <Link to="/" className="text-xl text-white">
        Home
      </Link>
      <div className="flex w-full justify-end">
        <ProfileDropdown userInitial={data?.email?.[0] || ""} />
      </div>
    </nav>
  );
};
