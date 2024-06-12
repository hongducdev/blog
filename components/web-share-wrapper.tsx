import React from "react";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface WebShareWrapperProps {
  title: string;
  text: string;
  url: string;
}

const WebShareWrapper = ({ title, text, url }: WebShareWrapperProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.error("Error sharing content", error);
        toast({
          title: "Lỗi chia sẻ",
          description: "Không thể chia sẻ nội dung",
        });
      }
    } else {
      toast({
        title: "Không hỗ trợ",
        description: "Trình duyệt của bạn không hỗ trợ API chia sẻ web",
      });
    }
  };

  return (
    <DropdownMenuItem onClick={handleShare}>
      Chia sẻ bài viết qua...
    </DropdownMenuItem>
  );
};

export default WebShareWrapper;
