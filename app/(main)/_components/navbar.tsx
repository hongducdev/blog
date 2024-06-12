"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Logo from "@/components/logo";
import Social from "./social";
import SearchCommand from "./search-command";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Menu } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import UserLogged from "./user-logged";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AvatarUser from "@/components/avatar-user";

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="sticky top-0 p-3 z-50 bg-background/10 backdrop-blur-md">
      <nav className="flex items-center justify-between max-w-7xl w-full mx-auto">
        <Logo />
        <div className="hidden lg:flex items-center space-x-5">
          <SearchCommand />
          <div className="shrink-0 bg-border w-[1px] h-7"></div>
          <Social />
          <div className="shrink-0 bg-border w-[1px] h-7"></div>
          <ThemeToggle />
          <div className="shrink-0 bg-border w-[1px] h-7"></div>
          <div>
            {status === "authenticated" ? (
              <UserLogged />
            ) : (
              <Button>
                <Link href="/login">Đăng nhập</Link>
              </Button>
            )}
          </div>
        </div>
        <div className="block lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader>
                {session && status === "authenticated" ? (
                  <div className="flex items-center gap-2">
                    <AvatarUser size="large" />
                    <div className="text-left">
                      <div className="flex flex-col px-2 py-1.5 ">
                        <span className="text-sm font-medium">
                          {session.user?.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {session.user?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <SheetTitle>Chào mừng bạn</SheetTitle>
                )}
              </SheetHeader>
              <SearchCommand />
              <ThemeToggle />
              <div className="mt-auto">
                {status === "authenticated" ? (
                  <Button onClick={() => signOut()} className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </Button>
                ) : (
                  <Button className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    <Link href="/login">Đăng nhập</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
