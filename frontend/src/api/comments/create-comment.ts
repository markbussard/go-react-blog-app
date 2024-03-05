import { useMutation } from "@tanstack/react-query";

import { axios } from "~/lib";
import { type CreateCommentDTO } from ".";

export const createComment = async (
  data: CreateCommentDTO,
): Promise<boolean> => {
  return axios.post(`/posts/${data.postSlug}/comments`, { body: data.body });
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: createComment,
  });
};
