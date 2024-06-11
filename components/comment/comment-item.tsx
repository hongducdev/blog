"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  emailUser: string;
  user: {
    name: string;
    image: string;
  };
  parentId?: string;
  replies: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  postId: string;
  slug: string;
  fetchComments: (slug: string) => Promise<void>;
  depth: number;
}

const CommentItem = ({
  comment,
  postId,
  slug,
  fetchComments,
  depth,
}: CommentItemProps) => {
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = async () => {
    if (!replyContent) return;
    try {
      await axios.post("/api/comment", {
        postId,
        content: replyContent,
        parentId: comment.id,
        emailUser: session?.user?.email,
      });
      toast({
        title: "Reply posted",
        description: "Your reply has been successfully posted.",
      });
      setReplyContent("");
      setIsReplying(false);
      fetchComments(slug);
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Failed to post reply",
      });
    }
  };

  return (
    <div
      className={`flex flex-col my-4`}
      style={{ marginLeft: `${depth * 10}px` }}
    >
      <div className="flex items-start gap-2">
        <Avatar>
          <AvatarImage
            src={comment.user?.image || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>
            {comment.user?.name?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-md w-full">
          <p className="font-semibold">{comment.user?.name}</p>
          <p>{comment.content}</p>
          {session && depth < 3 && (
            <div className="mt-2">
              {isReplying ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1"
                  />
                  <Button variant="ghost" onClick={handleReply}>
                    Reply
                  </Button>
                  <Button variant="ghost" onClick={() => setIsReplying(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" onClick={() => setIsReplying(true)}>
                  Reply
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={`ml-4`}>
        {depth < 3 && comment.replies.length > 0 && (
          <div className="mt-2">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                postId={postId}
                slug={slug}
                fetchComments={fetchComments}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
