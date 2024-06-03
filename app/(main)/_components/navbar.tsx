"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Logo from "@/components/logo";
import Social from "./social";
import SearchCommand from "./search-command";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ThemeToggle from "@/components/theme-toggle";
import UserLogged from "./user-logged";

const Navbar = () => {
  const { status } = useSession();

  return (
    <div className="sticky top-0 p-3 z-20 bg-background/10 backdrop-blur-md">
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
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="lg:hidden">
              <Menu />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hello!</DialogTitle>
              <DialogDescription>
                Welcome to blog.hongducdev.com.
              </DialogDescription>
            </DialogHeader>
            <SearchCommand />
            <div className="text-center mx-auto">
              <ThemeToggle />
            </div>
          </DialogContent>
        </Dialog>
      </nav>
    </div>
  );
};

export default Navbar;
