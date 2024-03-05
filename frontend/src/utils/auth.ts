import { type LoaderFunction, type LoaderFunctionArgs } from "react-router-dom";

import { firebaseAuth } from "~/lib";

export const withAuth = async (
  loaderFn: LoaderFunction,
  args: LoaderFunctionArgs,
) => {
  await firebaseAuth.authStateReady();
  return loaderFn(args);
};
