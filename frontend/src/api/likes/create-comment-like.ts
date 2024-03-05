import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "~/lib";
import { commentsByPostSlugOptions, type Comment } from "../comments";

type CreateCommentLikeArgs = {
  commentId: string;
  postSlug: string;
};

export const createCommentLike = async (
  args: CreateCommentLikeArgs,
): Promise<boolean> => {
  return axios.post(`/posts/${args.postSlug}/comments/${args.commentId}/likes`);
};

export const useCreateCommentLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCommentLike,
    onMutate: async ({ commentId, postSlug }) => {
      await queryClient.cancelQueries(commentsByPostSlugOptions(postSlug));
      const previousPostComments = queryClient.getQueryData<Comment[]>(
        commentsByPostSlugOptions(postSlug).queryKey,
      );
      if (previousPostComments) {
        const updatedComments = previousPostComments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, likeCount: comment.likeCount + 1 };
          }
          return comment;
        });
        queryClient.setQueryData(
          commentsByPostSlugOptions(postSlug).queryKey,
          updatedComments,
        );
      }
      return { postSlug, commentId, previousPostComments };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousPostComments) {
        queryClient.setQueryData(
          commentsByPostSlugOptions(context.postSlug).queryKey,
          context.previousPostComments,
        );
      }
    },
    onSettled: (_data, _err, _varibles, context) => {
      if (context?.postSlug) {
        queryClient.invalidateQueries({
          queryKey: commentsByPostSlugOptions(context.postSlug).queryKey,
        });
      }
    },
  });
};
