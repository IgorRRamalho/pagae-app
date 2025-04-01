import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from "react-router-dom";
import { Moon, Sun, LogOut, Users, Home, UserPlus, Calculator, Settings, Sliders } from "lucide-react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import useDarkMode from '@hook/useDarkMode';

const navItems = [
  {
    path: "/app/amigos",
    icon: UserPlus,
    label: "Amigos",
  },
  {
    path: "/app/grupos",
    icon: Users,
    label: "Grupos",
  },
  {
    path: "/app",
    icon: Home,
    label: "Início",
  },
  {
    path: "/app/divisao",
    icon: Calculator,
    label: "Divisão",
  }
];

const menuVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.95 }
};

export default function NavigationMobile() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Fecha o menu ao navegar
  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 pb-safe">
        <div className="flex justify-center items-center px-2 py-2 gap-1">
          <div className="flex flex-1 justify-around items-center max-w-2xl">
            {navItems.map(({ path, icon: Icon, label }, index) => (
              <div key={path} className={`flex-1 ${index === 2 ? 'relative' : ''}`}>
                {index === 2 ? (
                  <div className="relative -top-6 flex justify-center">
                    <NavLink
                      to={path}
                      end={path === "/app"}
                      className="relative"
                      aria-current={path === window.location.pathname ? "page" : undefined}
                      onClick={handleNavigation} // Adicionado aqui
                    >
                      {({ isActive }) => (
                        <motion.div
                          className="flex flex-col items-center"
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <motion.div
                            className={`p-4 rounded-2xl relative ${
                              isActive 
                                ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30'
                                : 'bg-white/50 dark:bg-gray-800/50 shadow-md'
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                          </motion.div>
                          <motion.span
                            className={`text-xs font-medium mt-1 ${
                              isActive ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {label}
                          </motion.span>
                        </motion.div>
                      )}
                    </NavLink>
                  </div>
                ) : (
                  <NavLink
                    to={path}
                    end={path === "/app"}
                    className="relative flex justify-center"
                    aria-current={path === window.location.pathname ? "page" : undefined}
                    onClick={handleNavigation} // Adicionado aqui
                  >
                    {({ isActive }) => (
                      <motion.div
                        className="flex flex-col items-center"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <motion.div
                          className={`p-3 rounded-xl ${
                            isActive 
                              ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-md'
                              : 'bg-transparent'
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                            }`}
                          />
                        </motion.div>
                        <motion.span
                          className={`text-xs font-medium mt-1 ${
                            isActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {label}
                        </motion.span>
                      </motion.div>
                    )}
                  </NavLink>
                )}
              </div>
            ))}

            {/* Settings Button */}
            <div className="flex-1 flex justify-center">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col items-center"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                aria-label="Configurações"
              >
                <motion.div
                  className={`p-3 rounded-xl ${
                    isMenuOpen 
                      ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-md'
                      : 'bg-transparent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </motion.div>
                <span className="text-xs font-medium mt-1 text-gray-500 dark:text-gray-400">
                  Configurações
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 dark:bg-white/10 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              className="fixed bottom-24 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-2 space-y-2 z-50 min-w-[180px] border border-gray-100 dark:border-gray-700"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.button
                onClick={() => {
                  navigate("/app/configuracoes");
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-2 rounded-lg bg-purple-100/50 dark:bg-gray-700">
                  <Sliders className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm font-medium dark:text-white">Configurações</span>
              </motion.button>

              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-2 rounded-lg bg-purple-100/50 dark:bg-gray-700">
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-purple-600" />
                  )}
                </div>
                <span className="text-sm font-medium dark:text-white">Alternar Tema</span>
              </motion.button>

              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-2 rounded-lg bg-red-100/50 dark:bg-red-900/20">
                  <LogOut className="w-5 h-5 text-red-500 dark:text-red-400" />
                </div>
                <span className="text-sm font-medium dark:text-white">Sair da Conta</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}