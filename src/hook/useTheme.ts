import { useEffect, useState } from "react";

// hooks/useTheme.js
export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.style.setProperty(
        "--swiper-theme-color",
        "#a78bfa"
      );
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.style.setProperty(
        "--swiper-theme-color",
        "#7c3aed"
      );
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return { isDarkMode: isDark, toggleTheme: () => setIsDark(!isDark) };
};
