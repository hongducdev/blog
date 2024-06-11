"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import moment from "moment";
import "moment/locale/vi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        title: "Trả lời thành công",
        description: "Bình luận của bạn đã được gửi",
      });
      setReplyContent("");
      setIsReplying(false);
      fetchComments(slug);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Đã có lỗi xảy ra khi gửi bình luận",
      });
    }
  };

  return (
    <div
      className={`flex flex-col gap-2`}
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
        <div className="flex flex-col w-full">
          <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-2xl w-full flex-1">
            <div className="flex items-center space-x-3">
              <p className="font-semibold">{comment.user?.name}</p>
              <span className="text-zinc-600">•</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      {moment(comment.createdAt).format(
                        "HH:mm:ss, [ngày] DD [tháng] MM [năm] YYYY"
                      )}
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p>{comment.content}</p>
          </div>
          {session && depth < 3 && (
            <div>
              {isReplying ? (
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Trả lời..."
                    className="flex-1"
                  />
                  <Button variant="ghost" onClick={handleReply}>
                    Trả lời
                  </Button>
                  <Button variant="ghost" onClick={() => setIsReplying(false)}>
                    Hủy
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setIsReplying(true)}
                  className="my-1 text-zinc-600 dark:text-zinc-400 text-sm"
                >
                  Trả lời
                </button>
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
