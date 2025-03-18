import { motion } from 'framer-motion';
import { Moon, Smile, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import useDarkMode from "../hook/useDarkMode";
import Logo from "./Logo";

const navLinks = [
  { path: "/app/configuracoes", label: "⚙️ Configurações", icon: "⚙️" },
  { path: "/app", label: "🏠 Início", exact: true, icon: "✨" },
  { path: "/app/divisao", label: "💸 Divisão", icon: "🧮" }
];

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-50/90 to-blue-100/90 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-lg shadow-xl py-4 px-6 flex items-center justify-between border-b-2 border-purple-300/30 dark:border-gray-700">
      {/* Layout de 3 colunas para centralização perfeita */}
      <div className="flex-1 flex justify-start">
        <Link 
          to="/" 
          className="hover:animate-float transition-transform duration-300 z-10"
        >
          <Logo/>
        </Link>
      </div>

      {/* Navegação centralizada com cálculo preciso */}
      <div className="flex-1 flex justify-center">
        <nav className="bg-purple-100/50 dark:bg-gray-800/80 p-2 rounded-full shadow-inner">
          <div className="flex gap-2">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path}
                to={link.path}
                end={link.exact}
                className={({ isActive }) => 
                  `relative px-6 py-3 font-bold text-gray-800 dark:text-gray-200 
                  transition-all duration-300 flex items-center gap-2
                  ${isActive ? 
                    'text-white dark:text-purple-100' : 
                    'hover:text-purple-700 dark:hover:text-purple-300'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg"
                        layoutId="activePill"
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                      />
                    )}
                    
                    <motion.span 
                      className="relative z-10 flex items-center gap-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-2xl">{link.icon}</span>
                      <span className={`text-sm ${isActive ? 'font-extrabold' : 'font-semibold'}`}>
                        {link.label.split(' ')[1]}
                      </span>
                    </motion.span>
                    
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-2 left-1/2 w-4 h-4 bg-purple-500 rounded-full transform -translate-x-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/* Botões à direita */}
      <div className="flex-1 flex justify-end">
        <div className="flex items-center gap-3 z-10">
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-purple-100 dark:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600 transition-colors relative"
            aria-label="Alternar tema"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="relative w-6 h-6"
              animate={isDarkMode ? "day" : "night"}
              variants={{
                night: { rotate: 360 },
                day: { rotate: 0 }
              }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              {isDarkMode ? (
                <Sun className="absolute inset-0 text-amber-400" />
              ) : (
                <Moon className="absolute inset-0 text-purple-600" />
              )}
            </motion.div>
          </motion.button>
          
          <motion.div 
            className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 15 }}
          >
            <Smile className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </div>
    </header>
  );
}