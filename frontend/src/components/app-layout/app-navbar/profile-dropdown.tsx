import { Fragment, useCallback, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "firebase/auth";

import { AuthStatus, useAuth } from "~/contexts";
import { firebaseAuth } from "~/lib/firebase";
import { SignInDialog } from "./dialogs";

type ProfileDropdownProps = {
  userInitial: string;
};

export const ProfileDropdown = (props: ProfileDropdownProps) => {
  const { status, setStatus } = useAuth();

  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);

  const handleSignInClick = useCallback(() => {
    setIsSignInDialogOpen(true);
  }, []);

  const handleSignOutClick = useCallback(async () => {
    await signOut(firebaseAuth);
    setStatus(AuthStatus.SIGNED_OUT);
  }, [setStatus]);

  return (
    <>
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#D9D9D9] text-center text-sm">
            <p className="text-lg font-semibold">
              {props.userInitial.toUpperCase()}
            </p>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md border-none bg-white py-1 shadow-lg ">
            {status === AuthStatus.SIGNED_IN && (
              <Menu.Item>
                <button
                  className="block cursor-pointer px-4 py-2 text-lg"
                  onClick={handleSignOutClick}
                >
                  Sign Out
                </button>
              </Menu.Item>
            )}
            {status === AuthStatus.SIGNED_OUT && (
              <Menu.Item>
                <button
                  className="block cursor-pointer px-4 py-2 text-lg"
                  onClick={handleSignInClick}
                >
                  Sign In
                </button>
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
      <SignInDialog
        isOpen={isSignInDialogOpen}
        onClose={() => setIsSignInDialogOpen(false)}
      />
    </>
  );
};
