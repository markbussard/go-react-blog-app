import { queryOptions } from "@tanstack/react-query";

import { axios } from "~/lib";
import { type GetPostBySlugResponse } from "./types";

const getPostBySlug = async (slug: string): Promise<GetPostBySlugResponse> => {
  return axios.get(`/posts/${slug}`);
};

export const postBySlugOptions = (slug: string) =>
  queryOptions({
    queryKey: ["posts", slug],
    queryFn: () => getPostBySlug(slug),
  });
