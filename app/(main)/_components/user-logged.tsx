"use client";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserLogged = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={session.user?.image || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>
            {session.user?.name?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          Tài khoản
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col px-2 py-1.5 ">
          <span className="text-sm font-medium">{session.user?.name}</span>
          <span className="text-xs text-muted-foreground">
            {session.user?.email}
          </span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button onClick={() => signOut()} className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            <span>
              Đăng xuất
            </span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserLogged;
