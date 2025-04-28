"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
   
    setMounted(true);
  }, []);

  if (!mounted) {
    //return null;  //prevent hydration mismatch
    // 👇 This placeholder reserves space to prevent layout shift
    return <div className="w-9 h-9" />;
  }
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className=
      {`${theme==='dark'? 'hover:bg-gray-800' :'hover:bg-gray-100'} p-2 rounded-lg transition-colors`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-gray-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
