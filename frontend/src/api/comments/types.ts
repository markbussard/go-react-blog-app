export type Comment = {
  id: string;
  userId: string;
  postId: string;
  authorName: string;
  body: string;
  likeCount: number;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateCommentDTO = {
  postSlug: string;
  body: string;
};
