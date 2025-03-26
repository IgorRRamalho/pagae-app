import Logo from "@components/Logo";
import { User, LogIn, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function MobileHeader() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Carregar estado inicial do localStorage
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(savedMode);
        updateDarkModeClass(savedMode);
    }, []);

    // Atualizar classe no HTML e localStorage
    const updateDarkModeClass = (darkMode: boolean) => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    };

    const handleToggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        updateDarkModeClass(newMode);
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
                {/* Botão Dark Mode - Esquerda */}
                <button
                    onClick={handleToggleDarkMode}
                    className="p-3 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 shadow-sm hover:shadow-md transition-all"
                    aria-label={isDarkMode ? "Modo claro" : "Modo escuro"}
                >
                    {isDarkMode ? (
                        <Sun className="w-6 h-6 text-amber-400 dark:text-amber-300" />
                    ) : (
                        <Moon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    )}
                </button>
                <Logo />

                {/* Botão Conta - Direita */}
                <button
                    onClick={() => navigate(isLoggedIn ? '/app' : '/auth')}
                    className="p-3 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 shadow-sm hover:shadow-md transition-all"
                    aria-label={isLoggedIn ? "Minha conta" : "Fazer login"}
                >
                    {isLoggedIn ? (
                        <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    ) : (
                        <LogIn className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    )}
                </button>
            </div>
        </nav>
    );
}