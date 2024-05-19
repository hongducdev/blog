"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative">
      <AnimatedTooltip
        items={[
          {
            id: 1,
            name: "Toggle theme",
          },
        ]}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          )}
        </Button>
      </AnimatedTooltip>
    </div>
  );
};

export default ThemeToggle;
