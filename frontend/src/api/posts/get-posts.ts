import { useQuery } from "@tanstack/react-query";

import { axios } from "~/lib";
import { Post } from "./types";

const getPosts = async (): Promise<Post[]> => {
  return axios.get("/posts");
};

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
};
