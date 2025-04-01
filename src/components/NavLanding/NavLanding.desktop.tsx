import { motion } from 'framer-motion';
import { Moon, Sun, LogIn, User, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import useDarkMode from '@hook/useDarkMode';
import Logo from '@components/Logo';

const navLinks = [
    { id: 'hero', label: '🏠 Início' },
    { id: 'vantagens', label: '✨ Vantagens' },
    { id: 'depoimentos', label: '💬 Depoimentos' }
];

export default function NavLandingDesktop() {
    const [isDarkMode, setIsDarkMode] = useDarkMode();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);


    const handleScrollTo = (id) => {
        setIsMenuOpen(false);
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
        <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-50/90 to-blue-100/90 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-lg shadow-xl py-3 px-4 sm:py-4 sm:px-6 flex flex-wrap items-center justify-between border-b-2 border-purple-300/30 dark:border-gray-700">
            {/* Logo e Botão Menu Mobile */}
            <div className="flex items-center justify-between w-full md:w-auto">
                <Logo />

                {/* Botão Menu Mobile */}
                <motion.button
                    className="p-2 md:hidden rounded-lg hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors"
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
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex flex-1 justify-center mx-4">
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900 p-2 rounded-full shadow-xl backdrop-blur-md">
                    <div className="flex gap-2 lg:gap-4">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.id}
                                onClick={() => handleScrollTo(link.id)}
                                className="relative px-4 py-2 lg:px-6 lg:py-3 font-bold text-gray-900 dark:text-gray-100 transition-all 
                            flex items-center gap-2 group"
                                whileHover={{ y: -2 }}
                                aria-label={`Ir para ${link.label.split(' ')[1]}`}
                            >
                                <span className="text-sm lg:text-md font-semibold tracking-wide transition-colors group-hover:text-purple-800 dark:group-hover:text-purple-300">
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
                </div>
            </nav>

            {/* Menu Mobile */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="w-full md:hidden mt-4"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 space-y-2">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.id}
                                onClick={() => handleScrollTo(link.id)}
                                className="w-full px-4 py-3 text-left rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 
                          text-gray-900 dark:text-gray-100 flex items-center gap-2 text-sm"
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>{link.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Controles Direitos */}
            <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-4 md:mt-0 justify-end">
                {/* Botão Login/Acesso */}
                <motion.button
                    onClick={handleAuth}
                    className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2 rounded-full bg-purple-700 text-white 
                    hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 transition-colors 
                    duration-300 shadow-lg text-sm"
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
                        className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 
                      dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800/50"
                        whileHover={{ scale: 1.1 }}
                        aria-label="Sair da conta"
                    >
                        <LogOut className="w-5 h-5" />
                    </motion.button>
                )}

                {/* Botão Tema Escuro */}
                <motion.button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 
                    dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-gray-600"
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