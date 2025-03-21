import { motion } from 'framer-motion';
import { Moon, Sun, LogOut, Smile } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Logo from "./Logo";
import useDarkMode from '@hook/useDarkMode';

const navLinks = [
  {
    path: "/app/configuracoes",
    label: "Configurações",
    icon: "⚙️"
  },
  {
    path: "/app/amigos",
    label: "Amigos",
    icon: "🤝"
  },
  {
    path: "/app",
    label: "Início",
    exact: true,
    icon: "✨"
  },
  {
    path: "/app/grupos",
    label: "Grupos",
    icon: "👥"
  },
  {
    path: "/app/divisao",
    label: "Divisão",
    icon: "🧮"
  }
];

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header
      className="relative sticky top-0 z-50 bg-gradient-to-r from-purple-50/90 to-blue-100/90 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-lg shadow-xl py-4 px-6 border-b-2 border-purple-300/30 dark:border-gray-700"
      role="banner"
    >
      <div className="flex justify-between items-center">
        {/* Lado esquerdo com o Logo */}
        <div className="flex-1 flex justify-start">
          <Logo aria-label="Logo do aplicativo" />
        </div>

        {/* Botões à direita */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-3 z-10">
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-purple-100 dark:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600 transition-colors relative
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label={`Alternar para tema ${isDarkMode ? 'claro' : 'escuro'}`}
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
                  <Sun className="absolute inset-0 text-amber-500" aria-hidden="true" />
                ) : (
                  <Moon className="absolute inset-0 text-purple-600" aria-hidden="true" />
                )}
              </motion.div>
            </motion.button>

            {isLoggedIn ? (
              <motion.button
                onClick={handleLogout}
                className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-300 relative
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                whileHover={{ scale: 1.1 }}
                aria-label="Sair da conta"
              >
                <LogOut className="w-6 h-6 text-white" aria-hidden="true" />
              </motion.button>
            ) : (
              <motion.div
                className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center shadow-lg
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
                whileHover={{ rotate: 15 }}
                role="button"
                tabIndex={0}
                aria-label="Ícone decorativo"
              >
                <Smile className="w-6 h-6 text-white" aria-hidden="true" />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Navegação centralizada */}
      <nav
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        aria-label="Navegação principal"
      >
        <div className="bg-purple-100/50 dark:bg-gray-800/80 rounded-full shadow-inner w-full">
          <ul className="flex gap-2 list-none justify-center">
            {navLinks.map((link) => (
              <li
                key={link.path}
                // Se o link for "Início", adiciona mx-auto para centralizá-lo na lista
                className={link.label === "Início" ? "mx-auto" : ""}
              >
                <NavLink
                  to={link.path}
                  end={link.exact}
                  className={({ isActive }) =>
                    `relative px-6 py-3 font-bold text-gray-800 dark:text-gray-200 
                    transition-all duration-300 flex items-center gap-2
                    ${isActive
                      ? 'text-white dark:text-purple-100'
                      : 'hover:text-purple-700 dark:hover:text-purple-300'}`
                  }
                  aria-current={link.exact ? "page" : undefined}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg"
                          layoutId="activePill"
                          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                          aria-hidden="true"
                        />
                      )}

                      <motion.span
                        className="relative z-10 flex items-center gap-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-2xl">{link.icon}</span>
                        <span className={`text-sm ${isActive ? 'font-extrabold' : 'font-semibold'}`}>
                          {link.label}
                          <span className="sr-only">{isActive ? " (página atual)" : ""}</span>
                        </span>
                      </motion.span>

                      {isActive && (
                        <motion.div
                          className="absolute -bottom-2 left-1/2 w-4 h-4 bg-purple-500 rounded-full transform -translate-x-1/2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.2 }}
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
