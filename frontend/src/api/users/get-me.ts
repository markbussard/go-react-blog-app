import { useQuery } from "@tanstack/react-query";

import { AuthStatus, useAuth } from "~/contexts";
import { axios } from "~/lib";
import { type User } from "./types";

const getMe = async (): Promise<User> => {
  return axios.get("/users/me");
};

export const getMeQuery = () => ({
  queryKey: ["me"],
  queryFn: getMe,
});

export const useMe = () => {
  const { status } = useAuth();

  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: status === AuthStatus.SIGNED_IN,
  });
};
