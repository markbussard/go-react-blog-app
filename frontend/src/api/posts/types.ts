export type Post = {
  id: string;
  author_id: string;
  title: string;
  body: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
