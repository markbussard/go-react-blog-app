import { ThumbsUp } from "lucide-react";

import { useCreatePostLike, useDeletePostLike } from "~/api/likes";

type PostLikeButtonProps = {
  slug: string;
  likeCount: number;
  isLiked: boolean;
};

export const PostLikeButton = (props: PostLikeButtonProps) => {
  const { slug, likeCount, isLiked } = props;

  const createPostLike = useCreatePostLike();
  const deletePostLike = useDeletePostLike();

  const handleLikeClick = () => {
    if (isLiked) {
      deletePostLike.mutate(slug);
    } else {
      createPostLike.mutate(slug);
    }
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <ThumbsUp
        className={`${isLiked ? "fill-gray-400 stroke-gray-500" : "fill-none"} cursor-pointer`}
        onClick={handleLikeClick}
      />
      <span
        className={`text-sm text-gray-400 ${isLiked ? "font-medium" : "font-normal"}`}
      >
        {likeCount}
      </span>
    </div>
  );
};
