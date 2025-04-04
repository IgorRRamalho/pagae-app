import { motion } from 'framer-motion';
import { Moon, Sun, LogIn, User, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import useDarkMode from '@hook/useDarkMode';
import Logo from '@components/Logo';
import { navLinks, useNavLanding } from './useNavLanding';


export default function NavLandingDesktop() {
    const [isDarkMode, setIsDarkMode] = useDarkMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, handleNavigation, handleAuth, isHomePage, navLinks } = useNavLanding();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <header className={`fixed top-0 left-0 z-50 flex flex-wrap items-center justify-between w-full px-4 py-3 sm:py-4 sm:px-6 ${
            isHomePage ? 'border-b-2 shadow-xl bg-gradient-to-r from-purple-50/90 to-blue-100/90 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-lg border-purple-300/30 dark:border-gray-700' : ''
        }`}>
            {/* Logo e Botão Menu Mobile */}
            <div className="flex items-center justify-between w-full md:w-auto">
                <Logo />

                {/* Botão Menu Mobile */}
                {isHomePage && (
                    <motion.button
                        className="p-2 transition-colors rounded-lg md:hidden hover:bg-purple-100 dark:hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Abrir menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-purple-800 dark:text-purple-300" />
                        ) : (
                            <Menu className="w-6 h-6 text-purple-800 dark:text-purple-300" />
                        )}
                    </motion.button>
                )}
            </div>

            {/* Navegação Desktop */}
            {isHomePage && (
                <nav className="justify-center flex-1 hidden mx-4 md:flex">
                    <div className="p-2 rounded-full shadow-xl bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900 backdrop-blur-md">
                        <div className="flex gap-2 lg:gap-4">
                            {navLinks.map((link) => (
                                <motion.button
                                    key={link.id}
                                    onClick={() => handleNavigation(link.id)}
                                    className="relative flex items-center gap-2 px-4 py-2 font-bold text-gray-900 transition-all lg:px-6 lg:py-3 dark:text-gray-100 group"
                                    whileHover={{ y: -2 }}
                                    aria-label={`Ir para ${link.label.split(' ')[1]}`}
                                >
                                    <span className="text-sm font-semibold tracking-wide transition-colors lg:text-md group-hover:text-purple-800 dark:group-hover:text-purple-300">
                                        {link.label}
                                    </span>

                                    <motion.div
                                        className="absolute inset-0 transition-opacity rounded-full opacity-0 group-hover:opacity-100"
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
                    </div>
                </nav>
            )}

            {/* Menu Mobile */}
            {isHomePage && isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="w-full mt-4 md:hidden"
                >
                    <div className="p-2 space-y-2 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.id}
                                onClick={() => handleNavigation(link.id)}
                                className="flex items-center w-full gap-2 px-4 py-3 text-sm text-left text-gray-900 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 dark:text-gray-100"
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>{link.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Controles Direitos */}
            <div className="flex items-center justify-end w-full gap-2 mt-4 sm:gap-3 md:w-auto md:mt-0">
                {/* Botão Login/Acesso */}
                <motion.button
                    onClick={handleAuth}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors duration-300 bg-purple-700 rounded-full shadow-lg md:px-5 md:py-2 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500"
                    whileHover={{ scale: 1.05 }}
                    aria-label={isLoggedIn ? "Acessar conta" : "Fazer login"}
                >
                    {isLoggedIn ? (
                        <>
                            <User className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="hidden sm:inline">Acessar</span>
                        </>
                    ) : (
                        <>
                            <LogIn className="w-4 h-4 md:w-5" />
                            <span className="hidden sm:inline">Entrar</span>
                        </>
                    )}
                </motion.button>

                {/* Botão Logout (se logado) */}
                {isLoggedIn && (
                    <motion.button
                        onClick={handleLogout}
                        className="p-2 text-red-700 bg-red-100 rounded-full hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800/50"
                        whileHover={{ scale: 1.1 }}
                        aria-label="Sair da conta"
                    >
                        <LogOut className="w-5 h-5" />
                    </motion.button>
                )}

                {/* Botão Tema Escuro */}
                <motion.button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 text-purple-700 bg-purple-100 rounded-full hover:bg-purple-200 dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-gray-600"
                    whileHover={{ scale: 1.1 }}
                    aria-label={`Alternar para modo ${isDarkMode ? 'claro' : 'escuro'}`}
                >
                    <motion.div
                        className="relative w-5 h-5"
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
        </header>
    );
}