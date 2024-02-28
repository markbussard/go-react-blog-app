import { useQuery } from "@tanstack/react-query";

import { axios } from "~/lib";
import { User } from "./types";

const getMe = async (): Promise<User> => {
  return axios.get("/users/me");
};

export const getMeQuery = () => ({
  queryKey: ["me"],
  queryFn: getMe,
});

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
