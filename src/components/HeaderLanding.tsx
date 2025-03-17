import { Moon, Sun, Wallet, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import useDarkMode from "../hook/useDarkMode";
import Logo from "./Logo";

export default function HeaderLanding() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 shadow-md py-6 px-8 flex justify-between items-center transition-colors duration-300">
      <div className="flex items-center gap-4">
        <Link to="/app" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
         <Logo/>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#9B5DE5] text-white hover:bg-[#7C4ACF] transition-colors duration-300">
          <LogIn className="w-6 h-6" />
          <span className="font-semibold">Login</span>
        </button>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-transform duration-300"
        >
          {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-800" />}
        </button>
      </div>
    </header>
  );
}
