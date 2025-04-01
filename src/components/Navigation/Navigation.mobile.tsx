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
    path: "/app",
    icon: Home,
    label: "Início",
    activeColor: "bg-purple-100 dark:bg-purple-900/30"
  },
  {
    path: "/app/amigos",
    icon: UserPlus,
    label: "Amigos",
    activeColor: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    path: "/app/grupos",
    icon: Users,
    label: "Grupos",
    activeColor: "bg-green-100 dark:bg-green-900/30"
  },
  {
    path: "/app/divisao",
    icon: Calculator,
    label: "Divisão",
    activeColor: "bg-amber-100 dark:bg-amber-900/30"
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

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 pb-safe">
        <div className="flex justify-between items-center px-4 py-3 gap-3">
          {/* Primary Navigation */}
          <div className="flex flex-1 justify-between">
            {navItems.map(({ path, icon: Icon, label, activeColor }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/app"}
                className="relative flex-1 flex justify-center"
                aria-current={path === window.location.pathname ? "page" : undefined}
              >
                {({ isActive }) => (
                  <motion.div
                    className="flex flex-col items-center"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <motion.div
                      className={`p-3 rounded-full relative ${isActive ? activeColor : ''}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Icon
                        className={`w-6 h-6 ${isActive ?
                          'text-purple-600 dark:text-purple-400' :
                          'text-gray-500 dark:text-gray-400'}`}
                      />

                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 w-3 h-3 bg-purple-500 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: 'spring', 
                            stiffness: 500,
                            damping: 20
                          }}
                        />
                      )}
                    </motion.div>

                    <AnimatePresence>
                      <motion.span
                        className={`text-xs mt-1 ${isActive ?
                          'font-bold text-purple-600 dark:text-purple-400' :
                          'font-medium text-gray-500 dark:text-gray-400'}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {label}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>

          {/* Settings Separator */}
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-600 mx-1" />

          {/* Settings Menu Trigger */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative p-2 rounded-full bg-purple-50/50 dark:bg-gray-800"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            aria-label="Menu de configurações"
          >
            <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-white dark:border-gray-900"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Floating Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/10 dark:bg-white/5 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              className="fixed bottom-24 right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-2 space-y-2 z-50 min-w-[180px]"
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
                className="flex items-center gap-3 w-full p-3 rounded-xl active:bg-gray-100 dark:active:bg-gray-700"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative p-2 rounded-full bg-purple-100/50 dark:bg-gray-700">
                  <Sliders className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm font-medium dark:text-white">Configurações</span>
              </motion.button>

              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-3 w-full p-3 rounded-xl active:bg-gray-100 dark:active:bg-gray-700"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative p-2 rounded-full bg-purple-100/50 dark:bg-gray-700">
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
                className="flex items-center gap-3 w-full p-3 rounded-xl active:bg-gray-100 dark:active:bg-gray-700"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative p-2 rounded-full bg-red-100/50 dark:bg-red-900/20">
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