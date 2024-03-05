"use client";

import { Fragment } from "react";
import { Dialog as HeadlessUIDialog, Transition } from "@headlessui/react";

import { cn } from "~/utils";

export type DialogProps = {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
  show: boolean;
};

export const Dialog = (props: DialogProps) => {
  const { className, show, children, onClose } = props;
  return (
    <Transition appear show={show} as={Fragment}>
      <HeadlessUIDialog
        className="relative z-[100] overflow-y-auto"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <HeadlessUIDialog.Overlay className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 min-h-screen">
          <div className="z-[100] flex max-h-[650px] min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessUIDialog.Panel
                className={cn(
                  "max-h-[700px] w-full max-w-4xl transform overflow-y-auto rounded-lg bg-white p-6 text-left align-middle shadow-[0px_1px_5px_1px_rgba(219,212,219,1)] transition-all",
                  className,
                )}
              >
                {children}
              </HeadlessUIDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessUIDialog>
    </Transition>
  );
};
