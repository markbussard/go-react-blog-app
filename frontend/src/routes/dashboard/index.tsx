import { useQuery } from "@tanstack/react-query";
import { useSearchParams, type LoaderFunctionArgs } from "react-router-dom";

import { postsOptions } from "~/api/posts";
import { Head } from "~/components";
import { queryClient } from "~/lib";
import { PostItem } from "./post-item";

export const Dashboard = () => {
  const [searchParams] = useSearchParams();

  const offset = Number(searchParams.get("offset")) || 0;

  const { data: posts } = useQuery(postsOptions(offset));

  return (
    <>
      <Head title="Posts" />
      <div className="flex w-full items-center justify-center px-8 py-12">
        <div className="container max-w-5xl">
          {posts?.map((post) => {
            return <PostItem key={post.id} post={post} />;
          })}
        </div>
      </div>
    </>
  );
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const offset = Number(params?.offset) || 0;
  await queryClient.prefetchQuery(postsOptions(offset));
  return null;
};
