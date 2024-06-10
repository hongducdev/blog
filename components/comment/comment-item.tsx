import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
interface CommentItemProps {
  comment: {
    content: string;
    createdAt: string;
    emailUser: string;
    user: {
      name: string;
      image: string;
    };
  };
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage
          src={comment.user?.image || "https://github.com/shadcn.png"}
        />
        <AvatarFallback>{comment.user?.name?.charAt(0) || "?"}</AvatarFallback>
      </Avatar>
      <div className="">
        <p className="font-semibold">{comment.user?.name}</p>
        <p className="">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
