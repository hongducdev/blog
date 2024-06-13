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
    <div className="relative w-full lg:w-fit">
      <Button
        variant="outline"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center justify-center w-fit space-x-2"
      >
        {theme === "dark" ? (
          <>
            <Sun className="h-4 w-4 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="lg:hidden">Chế độ sáng</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="lg:hidden">Chế độ tối</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;
