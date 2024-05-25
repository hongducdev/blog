"use client";
import { Ellipsis, Eye, Heart, Link2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface SidebarPageDetailProps {
  views: number;
  favorites: number;
  title: string;
  slug: string;
}

const SidebarPageDetail = ({ views, title, slug }: SidebarPageDetailProps) => {
  let link = `${process.env.BASE_URL}/blog/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard.",
    });
  };

  const handleShare = (platform: string) => {
    let shareUrl = "";
    const encodedLink = encodeURIComponent(slug);
    const encodedTitle = encodeURIComponent(title);

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedLink}&text=${encodedTitle}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedLink}&title=${encodedTitle}`;
        break;
      case "reddit":
        shareUrl = `https://www.reddit.com/submit?url=${encodedLink}&title=${encodedTitle}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <div className="flex flex-col items-center gap-2">
        <Eye />
        <span>{views}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={handleCopyLink}
            className="flex items-center space-x-10"
          >
            <span>Copy link</span>
            <Link2 className="w-4 h-4" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("twitter")}>
            Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("facebook")}>
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("linkedin")}>
            LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("reddit")}>
            Reddit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SidebarPageDetail;
