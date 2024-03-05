import { Link } from "react-router-dom";

import { type GetPostsResponse } from "~/api/posts";
import { Chip } from "~/components";
import { capitalizeWord, formatDate } from "~/utils";

type PostItemProps = {
  post: GetPostsResponse[0];
};

export const PostItem = (props: PostItemProps) => {
  const { post } = props;

  return (
    <Link to={`/posts/${post.slug}`}>
      <article className="w-full border-b-[1px] border-b-gray-300">
        <div className="flex w-full flex-nowrap items-center">
          <span className="text-sm font-medium">{post.authorEmail}</span>
          <span>.</span>
        </div>
        <h2 className="max-[500px] pb-2 font-bold">{post.title}</h2>
        <p className="text-lg font-medium text-gray-500">{post.subtitle}</p>
        <span className="text-sm text-gray-600">
          {post.updatedAt !== post.createdAt
            ? `Updated ${formatDate(post.updatedAt)}`
            : formatDate(post.createdAt)}
        </span>
        <div className="flex flex-row justify-between py-6">
          <div className="flex flex-row gap-2">
            {post.tags?.map((tag) => {
              return <Chip key={tag}>{capitalizeWord(tag)}</Chip>;
            })}
          </div>
        </div>
      </article>
    </Link>
  );
};
