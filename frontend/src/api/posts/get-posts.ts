import { queryOptions } from "@tanstack/react-query";

import { axios } from "~/lib";
import { type GetPostsResponse } from "./types";

const getPosts = async (offset: number): Promise<GetPostsResponse> => {
  return axios.get(`/posts?offset=${offset}`);
};

export const postsOptions = (offset: number) =>
  queryOptions({
    queryKey: ["posts", offset],
    queryFn: () => getPosts(offset),
  });
