import { Button } from "@ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ThemeButton = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      className="w-10 h-10 p-2 rounded-full"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Moon className="hidden dark:block" />
      <Sun className="dark:hidden" />
    </Button>
  );
};

export default ThemeButton;
