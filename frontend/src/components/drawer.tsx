"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { cn } from "~/utils";

export type DrawerProps = {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Drawer = (props: DrawerProps) => {
  const { children, className, isOpen, onClose } = props;
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        unmount={false}
        onClose={onClose}
        className="fixed inset-0 z-[60] overflow-y-auto "
      >
        <div className="flex h-screen w-3/4">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
          >
            <Dialog.Overlay className="fixed inset-0 z-40" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-200 transform"
            enterFrom="translate-x-full"
            enterTo="-translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <div
              className={cn(
                `fixed right-0 z-[60] flex h-screen
                  w-full max-w-sm flex-col justify-between overflow-hidden
                bg-white p-6 text-left align-middle shadow-xl`,
                className,
              )}
            >
              <div>{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
