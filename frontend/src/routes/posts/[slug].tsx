import { useQuery } from "@tanstack/react-query";
import { useParams, type LoaderFunctionArgs } from "react-router-dom";

import { postBySlugOptions } from "~/api/posts";
import { Head } from "~/components";
import { queryClient } from "~/lib";
import { formatDate } from "~/utils";
import { CommentDrawer, PostLikeButton } from "./components";

export const PostDetails = () => {
  const params = useParams();

  const { slug } = params as { slug: string };

  const { data: post } = useQuery(postBySlugOptions(slug));

  if (!post) {
    return <div>Not Found</div>;
  }

  return (
    <>
      <Head title={post.title} description={post.subtitle} />
      <div className="flex w-full items-center justify-center px-8 py-12">
        <div className="container min-h-[calc(100vh_-_96px)] max-w-2xl">
          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
          <div className="flex flex-col">
            <div className="flex w-full flex-row gap-2">
              <span>{post.authorEmail}</span>
              {/* <FollowButton
                isFollowing={!!data.post.isFollowingAuthor}
                authorId={data.post.author.id}
                postId={postId}
              /> */}
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {formatDate(
                  post.createdAt !== post.updatedAt
                    ? post.updatedAt
                    : post.createdAt,
                )}
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-row gap-8 border-y-[1px] border-y-gray-300 py-2">
            <PostLikeButton
              slug={slug}
              likeCount={post.likeCount || 0}
              isLiked={!!post.isLiked}
            />
            <CommentDrawer slug={slug} commentCount={post.commentCount} />
          </div>
          <div
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
      </div>
    </>
  );
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params as { slug: string };
  await queryClient.prefetchQuery(postBySlugOptions(slug));
  return null;
};
