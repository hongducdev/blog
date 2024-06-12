"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full">
      <Button
        variant="outline"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center justify-center w-full lg:w-12 lg:h-12 space-x-2"
      >
        {theme === "dark" ? (
          <>
            <Sun className="h-[1.2rem] w-[1.2rem] transition-transform dark:rotate-0 dark:scale-100" />
            <span className="lg:hidden">Chế độ tối</span>
          </>
        ) : (
          <>
            <Moon className="h-[1.2rem] w-[1.2rem] transition-transform dark:rotate-0 dark:scale-100" />
            <span className="lg:hidden">Chế độ sáng</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;
