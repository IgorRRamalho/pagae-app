import { Moon, Sun, Wallet, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import useDarkMode from "../hook/useDarkMode";


export default function Header() {
  const [isDarkMode, setIsDarkMode] = useDarkMode(); // Use o hook para obter o estado do tema

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        {/* Logo que redireciona para /app */}
        <Link to={"/app"}>
          <div className="flex items-center gap-2">
            <Wallet className="w-8 h-8 text-[#9B5DE5]" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#9B5DE5] to-[#6ECCAF] bg-clip-text text-transparent">
              PagAê!
            </h1>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Botão de Login */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#9B5DE5] text-white hover:bg-[#7C4ACF] transition-colors">
          <LogIn className="w-5 h-5" />
          <span>Login</span>
        </button>

        {/* Botão de alternância entre modos de tema */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)} // Altera o estado do tema
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
