"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarUserProps {
  size: "small" | "large";
}

const AvatarUser = ({ size = "small" }: AvatarUserProps) => {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <Avatar className={size === "small" ? "h-10 w-10" : "h-16 w-16"}>
      <AvatarImage
        src={session.user?.image || "https://github.com/shadcn.png"}
      />
      <AvatarFallback>{session.user?.name?.charAt(0) || "?"}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarUser;
