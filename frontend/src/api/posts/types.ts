export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum PostTag {
  SCIENCE = "SCIENCE",
  TECHNOLOGY = "TECHNOLOGY",
  PROGRAMMING = "PROGRAMMING",
}

export type Post = {
  id: string;
  slug: string;
  authorEmail: string;
  title: string;
  subtitle: string;
  body: string;
  status: PostStatus;
  tags: PostTag[] | null;
  likeCount: number;
  isLiked?: boolean;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
};

export type GetPostsResponse = Pick<
  Post,
  | "id"
  | "slug"
  | "authorEmail"
  | "title"
  | "subtitle"
  | "tags"
  | "createdAt"
  | "updatedAt"
>[];

export type GetPostBySlugResponse = Pick<
  Post,
  | "id"
  | "slug"
  | "authorEmail"
  | "title"
  | "subtitle"
  | "body"
  | "tags"
  | "likeCount"
  | "isLiked"
  | "commentCount"
  | "createdAt"
  | "updatedAt"
>;
