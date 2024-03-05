import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageCircle, X } from "lucide-react";

import { commentsByPostSlugOptions, createComment } from "~/api/comments";
import { postBySlugOptions } from "~/api/posts";
import { Button, Drawer, TextArea } from "~/components";
import { CommentView } from "./comment-view";

type CommentDrawerProps = {
  slug: string;
  commentCount: number;
};

export const CommentDrawer = (props: CommentDrawerProps) => {
  const { slug, commentCount } = props;

  const [showDrawer, setShowDrawer] = useState(false);
  const [response, setResponse] = useState("");

  const queryClient = useQueryClient();

  const { data: comments } = useQuery({
    ...commentsByPostSlugOptions(slug),
    enabled: !!(slug && showDrawer),
  });

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSettled: () => {
      setResponse("");
      queryClient.invalidateQueries({
        queryKey: commentsByPostSlugOptions(slug).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: postBySlugOptions(slug).queryKey,
      });
    },
  });

  const handleResponseSubmit = useCallback(() => {
    createCommentMutation.mutate({ postSlug: slug, body: response });
  }, [createCommentMutation, response, slug]);

  const toggleDrawer = useCallback(() => setShowDrawer((prev) => !prev), []);

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <MessageCircle className="cursor-pointer" onClick={toggleDrawer} />
        <span className="text-sm text-gray-400">{commentCount}</span>
      </div>
      <Drawer
        isOpen={showDrawer}
        onClose={toggleDrawer}
        className="max-w-lg overflow-y-auto"
      >
        <div id="filter-drawer" className="flex flex-col gap-4">
          <div className="mb-2 flex flex-row justify-between">
            <h5 className="text-teal text-lg font-medium">
              Responses ({commentCount})
            </h5>
            <X className="cursor-pointer" onClick={toggleDrawer} />
          </div>
          <TextArea
            placeholder="What are your thoughts?"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          <Button
            disabled={!response}
            size="small"
            className="w-auto self-end rounded-3xl"
            onClick={handleResponseSubmit}
          >
            Comment
          </Button>
          <div className="pb-4">
            <div className="mb-4 flex flex-col gap-4">
              {comments?.map((comment) => {
                return <CommentView key={comment.id} comment={comment} />;
              })}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
