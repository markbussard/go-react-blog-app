"use client";

import { useCallback } from "react";
import { type FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { z } from "zod";

import { Button, Dialog, TextInput } from "~/components";
import { AuthStatus, useAuth } from "~/contexts";
import { useZodForm } from "~/hooks";
import { firebaseAuth } from "~/lib";
import { cn } from "~/utils";

type SignInDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInValues = z.infer<typeof schema>;

export const SignInDialog = (props: SignInDialogProps) => {
  const { isOpen, onClose } = props;

  const { setStatus } = useAuth();

  const zodForm = useZodForm({
    schema,
  });

  const onSubmit = useCallback(
    async (data: SignInValues) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          firebaseAuth,
          data.email,
          data.password,
        );
        const user = userCredential.user;
        if (user) {
          setStatus(AuthStatus.SIGNED_IN);
        }
      } catch (e) {
        const firebaseError = e as FirebaseError;
        console.error(
          "error occurred during email and password sign in:",
          firebaseError.code,
          firebaseError.message,
        );
        console.error(e);
      }
    },
    [setStatus],
  );

  return (
    <Dialog show={isOpen} onClose={onClose} className="max-h-[700px] max-w-2xl">
      <p className="font-montserrat text-teal mb-4 text-center text-xl font-semibold">
        Sign In
      </p>
      <form
        className="flex w-full flex-col gap-8"
        onSubmit={zodForm.handleSubmit(onSubmit)}
      >
        <div>
          <TextInput
            id="email-input"
            className={cn(
              zodForm.formState.errors.email &&
                "ring-red-600 focus:ring-red-600",
            )}
            error={zodForm.formState.errors.email}
            defaultValue={zodForm.formState.defaultValues?.email || ""}
            {...zodForm.register("email")}
          />
        </div>
        <div>
          <TextInput
            id="password-input"
            type="password"
            className={cn(
              zodForm.formState.errors.password &&
                "ring-red-600 focus:ring-red-600",
            )}
            error={zodForm.formState.errors.password}
            defaultValue={zodForm.formState.defaultValues?.password || ""}
            {...zodForm.register("password")}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Button type="submit" disabled={zodForm.formState.isSubmitting}>
            Continue
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
