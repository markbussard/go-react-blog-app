import { ThumbsUp } from "lucide-react";
import { useParams } from "react-router-dom";

import { type Comment } from "~/api/comments";
import { useCreateCommentLike, useDeleteCommentLike } from "~/api/likes";
import { formatDate } from "~/utils";

type CommentViewProps = {
  comment: Comment;
};

export const CommentView = (props: CommentViewProps) => {
  const { comment } = props;
  const { slug } = useParams() as { slug: string };

  const createPostLike = useCreateCommentLike();
  const deletePostLike = useDeleteCommentLike();

  const handleLikeClick = () => {
    if (comment.isLiked) {
      deletePostLike.mutate({ postSlug: slug, commentId: comment.id });
    } else {
      createPostLike.mutate({ postSlug: slug, commentId: comment.id });
    }
  };

  return (
    <div className="flex flex-col border-b-[1px] border-b-gray-200 pb-4 pt-6">
      <div className="flex flex-row gap-2">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#D9D9D9] text-center text-sm">
          <p className="text-sm font-medium">
            {comment.authorName?.[0]?.toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm">{comment.authorName}</p>
          <p className="text-sm font-medium text-gray-400">
            {formatDate(comment.createdAt)}
          </p>
        </div>
      </div>
      <p className="ml-0.5 pb-1 pt-2 text-sm">{comment.body}</p>
      <div className="mt-3">
        <div className="flex flex-row items-center gap-2">
          <ThumbsUp
            size={16}
            className={`${comment.isLiked ? "fill-gray-400 stroke-gray-500" : "fill-none"} ml-2 cursor-pointer`}
            onClick={handleLikeClick}
          />
          <span
            className={`text-sm text-gray-400 ${comment.isLiked ? "font-medium" : "font-normal"}`}
          >
            {comment.likeCount}
          </span>
        </div>
      </div>
    </div>
  );
};
