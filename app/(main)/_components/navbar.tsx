import ThemeToggle from "@/components/theme-toggle";
import React from "react";

const Navbar = () => {
  return (
    <div className="sticky top-0 w-full px-20 py-3 flex items-center justify-between">
      Navbar
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
