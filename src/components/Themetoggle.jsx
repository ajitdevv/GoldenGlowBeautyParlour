import { MoonIcon, SunIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Themetoggle = () => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setTheme(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setTheme(!theme);
      }}
      aria-label="Toggle theme"
      className="relative size-9 rounded-xl bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary/15 hover:border-primary/40 transition cursor-pointer"
    >
      <SunIcon
        size={16}
        className={`absolute transition-all duration-500 ${
          theme ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <MoonIcon
        size={16}
        className={`absolute transition-all duration-500 ${
          theme ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
    </button>
  );
};

export default Themetoggle;
