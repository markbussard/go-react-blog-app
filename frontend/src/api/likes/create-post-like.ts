import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "~/lib";
import { postBySlugOptions, type GetPostBySlugResponse } from "../posts";

const createPostLike = async (postSlug: string): Promise<boolean> => {
  return axios.post(`/posts/${postSlug}/likes`);
};

export const useCreatePostLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPostLike,
    onMutate: async (postSlug) => {
      await queryClient.cancelQueries(postBySlugOptions(postSlug));
      const previousPost = queryClient.getQueryData<GetPostBySlugResponse>(
        postBySlugOptions(postSlug).queryKey,
      );

      if (previousPost) {
        queryClient.setQueryData(postBySlugOptions(postSlug).queryKey, {
          ...previousPost,
          likeCount: previousPost.likeCount + 1,
        });
      }

      return { postSlug, previousPost };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          postBySlugOptions(context.postSlug).queryKey,
          context.previousPost,
        );
      }
    },
    onSettled: (_data, _err, _varibles, context) => {
      if (context?.postSlug) {
        queryClient.invalidateQueries({
          queryKey: postBySlugOptions(context.postSlug).queryKey,
        });
      }
    },
  });
};
