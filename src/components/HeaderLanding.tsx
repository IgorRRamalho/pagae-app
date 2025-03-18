import { Moon, Sun, LogIn, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useDarkMode from "../hook/useDarkMode";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function HeaderLanding() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Verificar estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      navigate("/app");
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 shadow-md py-6 px-8 flex justify-between items-center transition-colors duration-300">
      <div className="flex items-center gap-4">
        <Link to="/app" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={handleAuthButtonClick}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#9B5DE5] text-white hover:bg-[#7C4ACF] transition-colors duration-300"
        >
          {isLoggedIn ? (
            <>
              <User className="w-6 h-6" />
              <span className="font-semibold">Acessar</span>
            </>
          ) : (
            <>
              <LogIn className="w-6 h-6" />
              <span className="font-semibold">Login</span>
            </>
          )}
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