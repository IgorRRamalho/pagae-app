import { motion } from 'framer-motion';
import { Moon, Sun, LogIn, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../hook/useDarkMode';
import Logo from './Logo';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const navLinks = [
  { id: 'hero', label: '🏠 Início' },
  { id: 'vantagens', label: '✨ Vantagens' },
  { id: 'depoimentos', label: '💬 Depoimentos' }
];

export default function HeaderLanding() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleAuth = () => {
    navigate(isLoggedIn ? '/app' : '/auth');
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-50/90 to-blue-100/90 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-lg shadow-xl py-4 px-6 flex items-center justify-between border-b-2 border-purple-300/30 dark:border-gray-700">
      <div className="flex-1 flex justify-start">
        <Logo />
      </div>

      <div className="flex-1 flex justify-center">
        <nav className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900 p-2 rounded-full shadow-xl backdrop-blur-md">
          <div className="flex gap-4">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="relative px-6 py-3 font-bold text-gray-900 dark:text-gray-100 transition-all 
                           duration-300 flex items-center gap-2 group"
                whileHover={{ y: -2 }}
                aria-label={`Ir para ${link.label.split(' ')[1]}`}
              >
                <span className="text-md font-semibold tracking-wide transition-colors group-hover:text-purple-800 dark:group-hover:text-purple-300">
                  {link.label}
                </span>

                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0.8 }}
                  whileHover={{
                    scale: 1,
                    background: 'radial-gradient(75% 75% at 50% 50%, rgba(124,58,237,0.15) 0%, rgba(0,0,0,0) 100%)'
                  }}
                  transition={{ type: 'spring', stiffness: 200 }}
                />

                <motion.div
                  className="absolute left-0 bottom-0 h-[3px] w-full origin-left bg-purple-700 dark:bg-purple-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{
                    scaleX: 1,
                    transition: { type: 'spring', bounce: 0.25, duration: 0.5 }
                  }}
                  style={{ transformOrigin: 'left center' }}
                />
              </motion.button>
            ))}
          </div>
        </nav>
      </div>

      <div className="flex-1 flex justify-end">
        <div className="flex items-center gap-3 z-10">
          <motion.button
            onClick={handleAuth}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-purple-700 text-white 
                      hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 transition-colors 
                      duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            aria-label={isLoggedIn ? "Acessar conta" : "Fazer login"}
          >
            {isLoggedIn ? (
              <>
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Acessar</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span className="text-sm font-medium">Entrar</span>
              </>
            )}
          </motion.button>

          {isLoggedIn && (
            <motion.button
              onClick={handleLogout}
              className="p-2.5 rounded-full bg-red-100 text-red-700 hover:bg-red-200 
                        dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800/50"
              whileHover={{ scale: 1.1 }}
              title="Sair"
              aria-label="Sair da conta"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          )}

          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 
                      dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.1 }}
            aria-label={`Alternar para modo ${isDarkMode ? 'claro' : 'escuro'}`}
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
                <Sun className="absolute inset-0 text-amber-500" />
              ) : (
                <Moon className="absolute inset-0 text-purple-700" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </header>
  );
}