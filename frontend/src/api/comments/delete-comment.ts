import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "~/lib";
import { commentsByPostSlugOptions, type Comment } from ".";

type DeleteCommentArgs = {
  postSlug: string;
  commentId: string;
};

export const deleteComment = async (
  args: DeleteCommentArgs,
): Promise<boolean> => {
  return axios.delete(`/posts/${args.postSlug}/comments/${args.commentId}`);
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onMutate: async ({ postSlug, commentId }) => {
      await queryClient.cancelQueries(commentsByPostSlugOptions(postSlug));
      const previousPostComments = queryClient.getQueryData<Comment[]>(
        commentsByPostSlugOptions(postSlug).queryKey,
      );
      if (previousPostComments) {
        const updatedComments = previousPostComments.filter(
          (comment) => comment.id !== commentId,
        );
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
