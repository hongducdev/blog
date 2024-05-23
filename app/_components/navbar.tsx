import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import React from "react";
import Social from "./social";
import SearchCommand from "./search-command";

const Navbar = () => {
  return (
    <div className="sticky top-0 p-3 z-20 bg-background/10 backdrop-blur-md">
      <nav className="flex items-center justify-between max-w-7xl w-full mx-auto">
        <Logo />
        <div className="flex items-center space-x-5">
          <SearchCommand />
          <div className="shrink-0 bg-border w-[1px] h-7"></div>
          <Social />
          <div className="shrink-0 bg-border w-[1px] h-7"></div>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
