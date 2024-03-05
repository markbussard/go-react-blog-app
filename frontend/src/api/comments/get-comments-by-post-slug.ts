import { queryOptions } from "@tanstack/react-query";

import { axios } from "~/lib";
import { type Comment } from "./types";

const getCommentsByPostSlug = async (postSlug: string): Promise<Comment[]> => {
  return axios.get(`/posts/${postSlug}/comments`);
};

export const commentsByPostSlugOptions = (postSlug: string) =>
  queryOptions({
    queryKey: ["comments", postSlug],
    queryFn: () => getCommentsByPostSlug(postSlug),
    enabled: !!postSlug,
  });
